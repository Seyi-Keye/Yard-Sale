import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

// Actions
import { authSuccess, setCurrentUser } from '../actions/auth'
import { showModal, showFlashMessage } from '../actions/notification'

import '../scss/pages/login.scss';
import logo from '../images/logo.png';

const GOOGLE_CLIENT_ID = '657521713134-rkvnf4nf94bju5tqovrtlee8qek02ib2.apps.googleusercontent.com';
const CLIENT_SECRET = 'wwbn_Zrzfi2INKNDHOuYc98N';

const mapDispatchToProps = dispatch => ({
  authSuccess: (currentUser, token, history) => dispatch(authSuccess(currentUser, token, history)),
  setCurrentUser: (response) => dispatch(setCurrentUser(response)),
  showModal: (modalProps, modalType) => dispatch(showModal({ modalProps, modalType })),
  showFlashMessage: (flashMessageProps, flashMessageType) => dispatch(showFlashMessage({ flashMessageProps, flashMessageType }))
})

const mapStateToProps = state => ({
  ...state
})

class Login extends Component {
  constructor() {
    super();
  }
  
  onSuccess = (response) => {
    this.props.authSuccess(response.profileObj, response.accessToken, this.props.history);
  }

  onFailure = (response) => {
    let errorMessage;

    if (response.error) {
      errorMessage = 'SignIn interrupted by user';
    } else if (response.accountDomain !== response.expectedDomain) {
      errorMessage = 'Please Sign In with your Andela email.';
    } else {
      errorMessage = "An error occurred during SignIn."
    }

    this.props.showFlashMessage({
      open: true,
      title: "Auth error",
      message: errorMessage
    }, 'warning-flash')
  }

  render() {
    return (
      <main className="app">
        <div className="login container-fluid">
          <div className="row">
            <section className="login-bg col-sm-12 col-md-7 p-0">
              <div className="overlay-black-7 h-100 w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="logo-container">
                  <img src={logo} />
                </div>
                <div className="login-intro d-flex flex-column align-items-center justify-content-center">
                  <h3 className="mb-4">BuyIt</h3>
                  <h6>Andela Yard Sale At Its Best...</h6>
                </div>
              </div>
            </section>
            <section className="login-button-container col-sm-12 col-md-5 p-0 d-flex align-items-center">
              <span className="mr-5">
                <i className="fa fa-caret-right fa-3x"></i>
              </span>
              <div className="w-75 d-flex flex-column align-items-center justify-content-center">
                <div className="w-75">
                  <h3 className="mb-4">Welcome to Andela's Yard Sale Centre. Please signin with your Andela email</h3>
                </div>
                <GoogleLogin
                  hostedDomain="andela.com"
                  clientId={GOOGLE_CLIENT_ID}
                  onSuccess={this.onSuccess}
                  onFailure={this.onFailure}
                  className="p-0 d-flex btn btn-lg btn-block btn-shadow">
                  <span className="p-2">
                    <i className="fa fa-google"></i>
                  </span>
                  <span className="p-2">
                    Sign in with Google
                </span>
                </GoogleLogin>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
