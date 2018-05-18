import React, { Component } from 'react'
import ProductImage from '@/images/chai.jpg'
import '@/scss/components/cards.scss'

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  getColor(type) {
    const colors = ['rgb(14, 126, 18, 0.7)', 'rgba(11, 36, 251, 0.7)', 'rgba(252, 13, 28, 0.7)']
    switch (type) {
      case 'good':
        return colors[0];
      case 'fair':
        return colors[1];
      case 'bad':
        return colors[2];
      default:
        return ''
    }
  }
  render() {
    const format = amount => parseInt(amount, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    return (
      <div className="custom-card">
        <div className="card">
          <div className="img">
            <img src={this.props.img} alt={this.props.name} />
          </div>
          <div className="card-body">
            <div className="title">
              <h3>{this.props.name}</h3>
            </div>
            <div className="split">
              <div className="info">
                <p className="condition"
                  style={{ color: this.getColor(this.props.condition.toLowerCase()) }}
                >
                  <span><i className="fa fa-star" aria-hidden="true"></i> {this.props.condition}</span>
                </p>
                <p><span className="number">{this.props.quantity}</span>Qty.</p>
              </div>
              <div className="price">
                <span>₦{format(this.props.price)}</span>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    )
  }
}
