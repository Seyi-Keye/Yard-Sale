import React, { Component } from 'react';
import '@/scss/components/header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="app-header">
        <div className="search">
          <input type="text" />
        </div>
      </div>
    )
  }
}
