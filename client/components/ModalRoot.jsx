import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import { hideModal } from '../actions/notification';

import AlertModal from './notification/modals/AlertModal.jsx';

const MODAL_TYPES = {
  'alert-modal': AlertModal
};

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
});

const mapStateToProps = state => ({
  ...state.notification
});

ReactModal.setAppElement('#app');

class ModalRoot extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (!this.props.type || !MODAL_TYPES[this.props.type]) {
      return null
    }
    const SpecifiedModal = MODAL_TYPES[this.props.type]
    return (
      <div>
        <ReactModal
          isOpen={this.props.notificationProps.open}
          onRequestClose={this.props.hideModal}
          contentLabel="App Modal"
          ariaHideApp={false}
          className="modal fade show"
        >
          <div className="modal-dialog modal-dialog-centered">
            <SpecifiedModal
              closeModal={this.props.hideModal}
              {...this.props.notificationProps}
            /></div>
        </ReactModal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
