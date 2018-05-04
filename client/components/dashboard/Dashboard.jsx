import React, { Component } from 'react';
import Header from '@/components/partials/Header';
import SideBar from '@/components/partials/SideBar';
import '@/scss/pages/dashboard.scss';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const Comp = this.props.Comp
    return (
      <div className="dashboard-container">
        <div className="sidebar-div">
          <SideBar />
        </div>
        <div className="main-div">
          <Header />
          <div className="main-container">
            <Comp />
          </div>
        </div>
      </div>
    )
  }
}
