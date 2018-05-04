import React from 'react';

const WarningFlash = ({ message, hideFlashMessage }) => {
  return (
    <div className="app-error alert alert-warning alert-dismissible rounded-0 animated fadeInUp" role="alert">
      <strong>Crap! &#9785;</strong> {message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={hideFlashMessage}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
};

export default WarningFlash;
