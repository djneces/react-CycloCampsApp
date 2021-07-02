import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`Button Button--${props.size || 'default'} ${
          props.inverse ? 'Button--inverse' : ''
        } ${props.danger ? 'Button--danger' : ''} ${props.className}`}
        href={props.href}
        data-data={props.data}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`Button Button--${props.size || 'default'} ${
          props.inverse ? 'Button--inverse' : ''
        } ${props.danger ? 'Button--danger' : ''} ${props.className}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`Button Button--${props.size || 'default'} ${
        props.inverse ? 'Button--inverse' : ''
      } ${props.danger ? 'Button--danger' : ''} ${props.className}`}
      type={props.type}
      data-data={props.data}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
