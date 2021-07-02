import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

import CampgroundsListItem from './CampgroundsListItem';
import Button from '../FormElements/Button';
import * as campgroundActions from '../../store/actions/campgrounds';

import './CampgroundsList.scss';

const LIMIT = 10;
const PAGINATION_NUMBER = 5;

const CampgroundsList = ({
  campgrounds,
  allCampgrounds,
  fetchAllCampgrounds,
  history,
}) => {
  useEffect(() => {
    fetchAllCampgrounds(LIMIT, 1);
  }, [fetchAllCampgrounds]);

  const numberPages = allCampgrounds / LIMIT;
  // Use of react-usestateref to get the actual correct state
  const [startingPage, setStartingPage, refStartingPage] = useState(1);
  const [clickedPage, setClickedPage] = useState(startingPage);

  const fetchPage = (e) => {
    fetchAllCampgrounds(LIMIT, +e.target.dataset.data);
  };

  const handleClickLeft = () => {
    setStartingPage((prevStartingPage) =>
      prevStartingPage > PAGINATION_NUMBER
        ? prevStartingPage - PAGINATION_NUMBER
        : prevStartingPage
    );
    fetchAllCampgrounds(LIMIT, refStartingPage.current);
    setClickedPage(refStartingPage.current);
  };

  const handleClickRight = () => {
    setStartingPage(
      startingPage + (PAGINATION_NUMBER - 1) < numberPages
        ? startingPage + PAGINATION_NUMBER
        : startingPage
    );
    fetchAllCampgrounds(LIMIT, refStartingPage.current);
    setClickedPage(refStartingPage.current);
  };

  const renderPagination = () => {
    // Generate only max PAGINATION_NUMBER pagination links
    return Array.from(
      {
        length: `${
          numberPages > PAGINATION_NUMBER ? PAGINATION_NUMBER : numberPages
        }`,
      },
      (v, i) => i + startingPage
    ).map((page) => {
      return (
        page <= numberPages && (
          <Button
            inverse
            key={page}
            className={`CampgroundsList__pagination-page ${
              page === clickedPage ? 'active' : ''
            }`}
            data={page}
            onClick={(e) => {
              setClickedPage(+e.target.dataset.data);
              fetchPage(e);
            }}
          >
            {page}
          </Button>
        )
      );
    });
  };

  const renderList = () => {
    return campgrounds.map((campground) => {
      const {
        title,
        images,
        ratingsAverage,
        ratingsQuantity,
        location,
        price,
        id,
      } = campground;
      const key = uuidv4();
      return (
        <CampgroundsListItem
          key={key}
          title={title}
          images={images}
          ratingsAverage={ratingsAverage}
          location={location}
          price={price}
          ratingsQuantity={ratingsQuantity}
          id={id}
          history={history}
        />
      );
    });
  };

  return (
    <div className='CampgroundsList'>
      {campgrounds.length > 0 ? (
        <>
          {renderList()}
          <div className='CampgroundsList__pagination'>
            <Button onClick={handleClickLeft} disabled={startingPage < 2}>
              <i className='fas fa-chevron-left'></i>
            </Button>

            {renderPagination()}
            <Button
              onClick={handleClickRight}
              disabled={!(startingPage + (PAGINATION_NUMBER - 1) < numberPages)}
            >
              <i className='fas fa-chevron-right'></i>
            </Button>
          </div>
        </>
      ) : (
        <div className='CampgroundsList__error'>
          Data not loaded, please refresh the page
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ campgrounds }) => ({
  campgrounds: campgrounds.campgrounds,
  allCampgrounds: campgrounds.allCampgrounds,
});

export default withRouter(
  connect(mapStateToProps, campgroundActions)(CampgroundsList)
);
