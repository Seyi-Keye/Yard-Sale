import React, { Component } from 'react';
import Card from '@/components/partials/Card'
import '@/scss/components/main.scss'

class Main extends Component {
  render() {
    return (
      <div className="main-dashboard">
        <div className="products">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    )
  }
}

export default Main;
