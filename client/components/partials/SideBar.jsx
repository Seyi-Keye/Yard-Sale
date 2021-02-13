import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormGroup from '@/components/partials/FormGroup'
import '@/scss/components/sidebar.scss';
import logoFull from '@/images/logo-full.png'

export default class Sidebar extends Component {
  onChange = (e) => {
    console.log(e.target.value)
  }
  render() {
    const options = [
      { label: 'Good', value: 'good' },
      { label: 'Fair', value: 'fair' },
      { label: 'Bad', value: 'bad' }
    ]
    return (
      <div className="sidebar">
        <div className="logo">
          <Link to="/">
            <img src={logoFull} /></Link>
        </div>
        <div className="menu">
          <ul>
            <li><a href="#">Left Overs</a></li>
          </ul>
        </div>
        <div className="filters">
          <h2>Filters</h2>
          <FormGroup
            type="dropdown"
            name="condition"
            label="condition"
            placeholder="Select Condition"
            callback={this.onChange}
            options={options}
          />
          <FormGroup
            type="dropdown"
            name="condition"
            label="Category"
            placeholder="Select Condition"
            callback={this.onChange}
            options={options}
          />
        </div>
      </div>
    )
  }
}
