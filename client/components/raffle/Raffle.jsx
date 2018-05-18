import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIoClient from 'socket.io-client';

import '@/scss/pages/raffle.scss';

import AdminView from './AdminView.jsx';

import { startRaffle } from '../../actions/raffle';

const mapDispatchToProps = dispatch => ({
  startRaffle: () => dispatch(startRaffle())
})

class Raffle extends Component {
  constructor(props) {
    super(props)
    this.socket = socketIoClient('/')
  }

  componentDidMount() {
    console.log('raffle props: ', this.props);
  }

  startRaffle = (event) => {
    this.props.startRaffle()
  }

  render() {
    return (
      <div className="raffle">
        <AdminView />
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Raffle);
