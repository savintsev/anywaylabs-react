import React from 'react';
import { ErrorAlertProps } from '../../type';

export const ErrorAlert: React.FunctionComponent<ErrorAlertProps> = ({ message }) => (
  <div className="alert alert-danger" role="alert">
    <h4 className="alert-heading">Fail</h4>

    <p>Failed to load tasks. Try to <a href="/" className="alert-link">reload</a>.</p>

    {Boolean(message) &&
      <>
        <hr />
        <p className="mb-0">
          <small>{message}</small>
        </p>
      </>
    }
  </div>
);

export default ErrorAlert;
