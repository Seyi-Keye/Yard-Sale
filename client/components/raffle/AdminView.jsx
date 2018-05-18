import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from '@/images/logo.png'

import { getYardSales, addYardSale } from '@/actions/yardSale';

const mapDispatchToProps = dispatch => ({
  getYardSales: () => dispatch(getYardSales()),
  addYardSale: (yardSale) => dispatch(addYardSale(yardSale))
})

const mapStateToProps = state => ({
  ...state.yardSale
})

class AdminView extends Component {

  componentDidMount() {
    this.props.getYardSales();
  }

  addYardSale = (event) => {
    this.props.addYardSale({
      title: 'new yardsale',
      startdate: new Date(),
      saleDate: new Date(),
      note: null,
      location: "Lagos",
      rating: "good",
      imgURL: null,
    })
  }

  render() {
    if (!this.props.yardSales) {
      return (
        <div>Loading</div>
      )
    }
    return (
      <div className="w-100 h-100 admin-view">
        <div className="raffle-items">
          {
            this.props.yardSales.map((yardSale) => {
              return (
                <div key={yardSale.id} className="raffle-item  won">
                  <div className="raffle-item--img">
                    <img src={logo} />
                  </div>
                  <div className="raffle-item--details d-flex flex-column">
                    <span>{yardSale.title}</span>
                    <small>{yardSale.saleDate}</small>
                    <small>{yardSale.location}</small>
                  </div>
                  <div className="raffle-item--action d-flex align-items-center justify-content-center">
                    <button type="button" className="btn btn-light">
                      <span>
                        <i className="fa fa-play fa-2x"></i>
                      </span>
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
        <button
          type="button"
          className="btn yardsale btn-outline-info"
          onClick={this.addYardSale}
        >Add</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
