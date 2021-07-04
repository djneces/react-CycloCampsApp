import React, { useState, useCallback } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import accountDetailsImg from '../../assets/images/accountDetails-img.jpg';
import Image from '../UIElements/Image';
import Modal from '../UIElements/Modal';
import Button from '../FormElements/Button';
import SpinnerLoader from '../UIElements/SpinnerLoader';
import AccountDetailsForm from './AccountDetailsForm';
import * as formActions from '../../store/actions/form';
import * as userActions from '../../store/actions/user';
import * as authActions from '../../store/actions/auth';

import './AccountDetails.scss';

const AccountDetails = ({
  currentUser,
  validateForm,
  fetchFormData,
  updateCurrentUser,
  deleteUser,
  userIsLoading,
  signOutUser,
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleToggleModal = (type) => {
    if (type === 'delete') setOpenDeleteModal((prevState) => !prevState);
    if (type === 'edit') setOpenEditModal((prevState) => !prevState);
  };

  const handleAccountUpdateSubmit = (newUsername, newEmail) => {
    updateCurrentUser(newUsername, newEmail);
  };

  const inputReviewHandler = useCallback(
    (id, reviewFormIsValid) => {
      validateForm(id, reviewFormIsValid, 'account');
    },
    [validateForm]
  );

  const handleDeleteAccount = () => {
    deleteUser();
    handleToggleModal('delete');
    signOutUser();
  };

  const renderAccountDetails = () => {
    if (currentUser) {
      const { username, email, registeredAt } = currentUser;
      return (
        <>
          {/* Delete Modal  */}
          <Modal
            show={openDeleteModal}
            onCancel={() => handleToggleModal('delete')}
            header='Are you sure to delete your account?'
          >
            <div className='AccountDetails__deleteModal'>
              <Button onClick={() => handleDeleteAccount()}>Yes</Button>
              <Button inverse onClick={() => handleToggleModal('delete')}>
                No
              </Button>
            </div>
          </Modal>
          {/* Edit Modal  */}
          <Modal
            show={openEditModal}
            onCancel={() => handleToggleModal('edit')}
            header='Update your details'
          >
            <AccountDetailsForm
              handleAccountUpdateSubmit={(newUsername, newEmail) =>
                handleAccountUpdateSubmit(newUsername, newEmail)
              }
              inputReviewHandler={inputReviewHandler}
              handleToggleModal={() => handleToggleModal('edit')}
            />
          </Modal>
          <div>
            <div className='AccountDetails__header'>
              <h3>Your details</h3>
            </div>
            <div className='AccountDetails__body'>
              <div>
                <span>Username:</span>
                <br></br>
                {username}
              </div>
              <div>
                <span>Email:</span>
                <br></br>
                {email}
              </div>
              <div>
                <span>Registered:</span>
                <br></br>
                {moment(registeredAt).format('MMMM-Do-YY, h:mm A')}
              </div>
            </div>
            <div className='AccountDetails__footer'>
              <div>
                <Button
                  onClick={() => {
                    handleToggleModal('edit');
                    fetchFormData({ username, email }, 'account');
                  }}
                >
                  Edit your details
                </Button>
                <div className='AccountDetails__footer-spinner'>
                  {userIsLoading && <SpinnerLoader />}
                </div>
              </div>
              <div>
                <Button
                  inverse
                  onClick={() => {
                    handleToggleModal('delete');
                  }}
                >
                  Delete your account
                </Button>
              </div>
            </div>
          </div>
          <Image image={accountDetailsImg} alt='Account-details' />
        </>
      );
    } else {
      return (
        <div className='AccountDetails__body--notLoaded'>
          <span>
            Account details not loaded, please try to refresh the page
          </span>
        </div>
      );
    }
  };

  return <div className='AccountDetails'>{renderAccountDetails()}</div>;
};

const mapStateToProps = ({ auth, user }) => ({
  currentUser: auth.currentUser?.user,
  userIsLoading: user.isLoading,
});

export default connect(mapStateToProps, {
  ...formActions,
  ...userActions,
  ...authActions,
})(AccountDetails);
