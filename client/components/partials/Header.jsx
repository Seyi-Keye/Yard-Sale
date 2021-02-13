import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import '@/scss/components/header.scss';

import { logout } from '@/actions/auth'

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  logout: (history) => dispatch(logout(history))
})

class Header extends Component {
  componentDidMount() {
    console.log('header props: ', this.props)
  }
  logout = (event) => {
    this.props.logout(this.props.history)
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div className="app-header">
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="header-nav d-flex">
          <div className="header-nav--item notification">
            <i className="fa fa-bell fa-2x"></i>
          </div>
          <Link to="/raffle" className="header-nav--item notification">
            <i className="fa fa-recycle fa-2x"></i>
          </Link>
          <div className="header-nav--item cart d-flex">
            <i className="fa fa-shopping-cart fa-2x"></i>
            <span className="cart-text d-flex align-items-center justify-content-center">
              <small>2</small>
            </span>
          </div>
          <div className="header-nav--item user d-flex">
            <div className="user-name mr-3 d-flex align-items-center justify-content-center">
              <span>{currentUser.givenName}</span>
            </div>
            <div className="user-image">
              <img src={`${currentUser.imageUrl}`} />
            </div>
          </div>
          <div className="header-nav--item">
            <button type="button" className="btn btn-link" onClick={this.logout}>Logout</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
