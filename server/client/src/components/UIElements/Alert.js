import React from 'react';
import { connect } from 'react-redux';
import * as alertActions from '../../store/actions/alert';

import './Alert.scss';

const Alert = ({ notifications, position, removeAlert }) => {
  const generateIcon = (type) => {
    switch (type) {
      case 'INFO':
        return <i className='fas fa-info-circle'></i>;
      case 'WARNING':
        return <i className='fas fa-exclamation-triangle'></i>;
      case 'DANGER':
        return <i className='fas fa-exclamation-circle'></i>;
      case 'SUCCESS':
        return <i className='fas fa-check'></i>;
      default:
        return;
    }
  };
  const generateBackgroundColor = (type) => {
    switch (type) {
      case 'INFO':
        return '#6F6862';
      case 'WARNING':
        return '#F3513C';
      case 'DANGER':
        return '#830000';
      case 'SUCCESS':
        return '#2B363E';
      default:
        return;
    }
  };

  return (
    <div className={`Alert ${position}`}>
      {notifications && (
        <>
          {notifications.map((notification, i) => {
            return (
              <div
                key={notification.id}
                style={{
                  backgroundColor: generateBackgroundColor(notification.type),
                }}
                className={`Alert__notification Alert__notification-toast ${position}`}
              >
                <i
                  className='fas fa-times Alert__notification-closeBtn'
                  onClick={() => removeAlert(notification.id)}
                ></i>
                <div className='Alert__notification-image'>
                  {generateIcon(notification.type)}
                </div>
                <div>
                  <p className='Alert__notification-title'>
                    {notification.title}
                  </p>
                  <p className='Alert__notification-message'>
                    {notification.message}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ alert }) => ({
  notifications: alert,
});

export default connect(mapStateToProps, alertActions)(Alert);
