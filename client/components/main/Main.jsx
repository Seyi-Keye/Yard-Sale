import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showProducts } from '@/actions/products';
import Card from '@/components/partials/Card'
import '@/scss/components/main.scss'

class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.showProducts()
  }

  products() {
    const products = this.props.products.map((product) => (
      <Card
        key={product.id}
        img={product.imageUrl}
        condition={product.condition}
        name={product.name}
        quantity={product.quantity}
        price={product.price}
      />
    ));
    return products;
  }
  render() {
    return (
      <div className="main-dashboard">
        <div className="products">
          {this.products()}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps, { showProducts })(Main);

