import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./Header";
import Products from "./Products";
import QuickView from "./QuickView";
import "../scss/style.scss";
import '../styles/style.scss';
import Loading from '../loader'
import { withRouter } from 'react-router';
import Back from '../images/backNew.svg'
import Basket from '../images/galbasket.png'


class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: JSON.parse(localStorage.getItem("Categories")),
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false
    };

  }

  renderSubCategories = () => {
    console.log("inside renderSubCategories", this.state.categories);

    return this.state.categories.map((event, index) => {

      return (

        <div key={index} className="cat-div" onClick={() => {
          console.log("subcategories", event.subCategories);
          localStorage.setItem("selectedSubcategory", JSON.stringify(event.subCategories))
          this.props.history.push({
            pathname: '/MyBasket/Home',
            //  search: '?query=abc',
            // state: { categories: this.state.categories }
          })
        }}>
          <img src={event.imageUrl} ></img>
          <p>{event.categoryName}</p>
          <p style={{ color: 'black' }}>{event.description} !</p>
        </div>
      )
    });
  }
  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (

      <div className="container-leaderboard bgg">

        {this.state.enableLoader ?
          <Loading />
          : null
        }

        <div className="header-leaderboard" >
          <img src={Back} alt="" className="float-lft" onClick={this.goBack.bind(this)}></img>
          <div className="brand">
            <img
              className="logo"
              src={Basket}
              alt="Veggy Brand Logo"
            />
          </div>
          <span className="float-lft-text" >Hi {localStorage.getItem("name")} !</span><br></br>
          <span className="float-lft-text" >Welcome to My Basket</span>
        </div>


        <div className="content-l" style={{ marginTop: '33px', paddingLeft: '16px', marginBottom: '68px' }}>
          {this.renderSubCategories()}
        </div>

      </div>
    );
  }
}
export default withRouter(Categories)

