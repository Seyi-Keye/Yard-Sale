import React, { Component } from 'react';
import { connect } from 'react-redux';

import { hideFlashMessage } from '../actions/notification';

import WarningFlash from './notification/flashMessages/WarningFlash.jsx';

const FLASH_TYPES = {
  'warning-flash': WarningFlash
};

const mapDispatchToProps = dispatch => ({
  hideFlashMessage: () => dispatch(hideFlashMessage())
});

const mapStateToProps = state => ({
  ...state.notification
});

class FlashMessageRoot extends Component {
  clearErrors = () => {
    this.props.clearErrors()
  }

  render() {
    if (!this.props.type) {
      return null;
    }
    const SpecifiedFlashMessage = FLASH_TYPES[this.props.type]
    return (
      <SpecifiedFlashMessage
        hideFlashMessage={this.props.hideFlashMessage}
        {...this.props.notificationProps}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessageRoot);
