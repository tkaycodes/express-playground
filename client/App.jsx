import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products: [],
			cartContent: {}
		}
		this.addToCart.bind(this);
	}

	addToCart(id) {
		axios.get(`/api/add-to-cart/${id}`)
		.then(({ data }) => {this.setState({cartContent: data.cart})});
	}

	componentWillMount() {
		axios.get('/api/products')
		.then(({ data }) => this.setState({ products: data.products }));
	}

	render() {

		const {products} = this.state;
		return (
			<div className="custom-container">
				<div className="row">


					{
						products.map(product => (

								<div className="col-sm-6 col-lg-3 py-2">
									<div className="card h-100">
										<img className="card-img-top" src={product.imagePath}/>
											<div className="card-body">
												<h5 className="card-title">{ product.title }</h5>
												<span className="badge badge-warning">Quantity: 5</span>
												<p class="card-text">{ product.description }</p>
											</div>
											<div className="card-footer">
												<small class="text-muted">${ product.price }</small>
												<a onClick={ () => {this.addToCart(product._id)} } className="btn btn-success">Add to cart</a>
											</div>
									</div>
								</div>

						))
					}

				</div>
			</div>
		)
	}

}

export default App;


