import React, { Component } from 'react'
import ProductImage from '@/images/chai.jpg'
import '@/scss/components/cards.scss'

export default class Card extends Component {
  render() {
    const colors = ['rgb(14, 126, 18, 0.7)', 'rgba(11, 36, 251, 0.7)', 'rgba(252, 13, 28, 0.7)']
    return (
      <div className="custom-card">
        <div className="card">
          <div className="img">
            <img src={ProductImage} alt="image 1" />
          </div>
          <div className="card-body">
            <div className="title">
              <h3>Leather Chair</h3>
            </div>
            <div className="split">
              <div className="info">
                <p className="condition" style={{ color: colors[1] }}><span><i className="fa fa-star" aria-hidden="true"></i> Fair</span></p>
                <p><span className="number">20</span> piece available</p>
              </div>
              <div className="price">
                <span>₦20,000</span>
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
