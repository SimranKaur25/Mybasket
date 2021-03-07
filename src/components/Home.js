import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./Header";
import Products from "./Products";
import QuickView from "./QuickView";
import "../scss/style.scss";
import { withRouter } from 'react-router';
import * as constantURL from '../Configuration/Constants';
import * as errorConstantURL from '../Configuration/ErrorConstants';
import Loading from '../loader'

class Home extends Component {
  constructor() {
    super();

   var cartArray = localStorage.getItem("cartArray");
   console.log("cartArray&&&&&&&&&&&&&&&&&",JSON.parse(cartArray));
    this.state = {
      products: JSON.parse(localStorage.getItem("selectedSubcategory")),
      cart:   cartArray? JSON.parse(localStorage.getItem("cartArray")) : [] ,
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false,
      mobileNumber:localStorage.getItem("mobileNumber"),
      name:localStorage.getItem("name"),
      address:localStorage.getItem("address"),
      enableLoader: false
    };
    this.addToCartApi = this.addToCartApi.bind(this);
    this.checkOutApi = this.checkOutApi.bind(this);
    this.deleteFromCartApi = this.deleteFromCartApi.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
//  Fetch Initial Set of Products from external API
  getProducts() {
    // let url =
    //   "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
    // // axios.get(url).then(response => {
    // //   this.setState({
    //     products: response.data
    //   });
 //   });

      this.setState({
      products: JSON.parse(localStorage.getItem("selectedSubcategory"))
    });

    console.log("selectedSubcategory",this.state.selectedSubcategory);
  }
  componentDidMount() {
    this.getProducts();
  }

  goToOrderStatusPage = () => {
    console.log("inside goToOrderStatusPage")
    this.props.history.push({
        pathname: '/MyBasket/OrderStatus'
    })
}

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }
  // Add to Cart

  addToCartApi(selectedProducts) {


    console.log("inside addToCartApi method");

        this.setState({ enableLoader: true });
        var url = constantURL.MYBASKET_COMBINED_IP + constantURL.ADD_TO_CART;

        const body = {
            mobileNumber:this.state.mobileNumber                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ,
            categoryId:selectedProducts.id,
            quantity:selectedProducts.quantity,
            price:selectedProducts.price
        }

        const headers={}
        axios.post(url, body, { headers })
            .then(response => response.data)
            .then((data) => {
                this.setState({ enableLoader: false });
                if(data.code == errorConstantURL.SUCCESS_CODE)
                {

                  console.log("added to cart");
                    // localStorage.setItem("name", data.data.name);
                    // localStorage.setItem("mobileNumber", data.data.mobileNumber);


                //  this.goToPasswordPage();


                }
                else if(data.code == errorConstantURL.NO_DATA_FOUND)
                {

                 //   this.setState({ showPopupNew:true,heading: "Sorry", msg :"Couldn't find a account associated with this phone number. Go to registraton page?"});
             
                }
                else {
                  //  this.state.toggleShowError(data.msg);
                }

       


               
            }).catch(error => {
                this.setState({ enableLoader: false })
              //   this.toggleShowError("Something went wrong")

                });
        
    
}


deleteFromCartApi(categoryId) {


  console.log("inside deleteFromCartApi method");

      this.setState({ enableLoader: true });
      var url = constantURL.MYBASKET_COMBINED_IP + constantURL.DELETE_FROM_CART;

      const body = {
          mobileNumber:this.state.mobileNumber                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ,
          categoryId:categoryId
      }

      const headers={}
      axios.post(url, body, { headers })
          .then(response => response.data)
          .then((data) => {
              this.setState({ enableLoader: false });
              if(data.code == errorConstantURL.SUCCESS_CODE)
              {

                console.log("deleted from cart");
                  // localStorage.setItem("name", data.data.name);
                  // localStorage.setItem("mobileNumber", data.data.mobileNumber);


              //  this.goToPasswordPage();


              }
              else if(data.code == errorConstantURL.NO_DATA_FOUND)
              {

               //   this.setState({ showPopupNew:true,heading: "Sorry", msg :"Couldn't find a account associated with this phone number. Go to registraton page?"});
           
              }
              else {
                //  this.state.toggleShowError(data.msg);
              }

     


             
          }).catch(error => {
              this.setState({ enableLoader: false })
            //   this.toggleShowError("Something went wrong")

              });
      
  
}
debugger;
checkOutApi() {


  console.log("inside checkOut method");

      this.setState({ enableLoader: true });
      var url = constantURL.MYBASKET_COMBINED_IP + constantURL.CHECKOUT;

      const body = {
          mobileNumber:this.state.mobileNumber                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ,
          }

      const headers={}
      axios.post(url, body, { headers })
          .then(response => response.data)
          .then((data) => {
              this.setState({ enableLoader: false });
              console.log("data",data.code);
              if(data.code == errorConstantURL.SUCCESS_CODE)
              {

                console.log("hiiiiiiiiiiiiiiiiiiii")
                localStorage.setItem("orderDetails",JSON.stringify(data.data));
                localStorage.removeItem("cartArray");
                console.log("added to cart success",this.state.cart);
                this.setState({ cart: [] },this.goToOrderStatusPage());

          


                
                //this.goToOrderStatusPage();
                  // localStorage.setItem("name", data.data.name);
                  // localStorage.setItem("mobileNumber", data.data.mobileNumber);


              //  this.goToPasswordPage();


              }
              else if(data.code == errorConstantURL.NO_DATA_FOUND)
              {

               //   this.setState({ showPopupNew:true,heading: "Sorry", msg :"Couldn't find a account associated with this phone number. Go to registraton page?"});
           
              }
              else {
                //  this.state.toggleShowError(data.msg);
              }

     


             
          }).catch(error => {
              this.setState({ enableLoader: false })
            //   this.toggleShowError("Something went wrong")

              });
      
  
}

  handleAddToCart(selectedProducts) {


   

    let cartItem = this.state.cart;


    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
        selectedProducts.quantity=cartItem[index].quantity;
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    console.log("*****************cartItem**************",cartItem);
    localStorage.setItem("cartArray",JSON.stringify(cartItem));
    this.addToCartApi(selectedProducts);
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });

    console.log("*****************cartItem**************",cart);
    localStorage.setItem("cartArray",JSON.stringify(cart));
    this.deleteFromCartApi(id);


    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }
  goBack = () => {
    this.props.history.goBack();
}
  render() {
    return (
      <div className="container">
              {this.state.enableLoader ? <Loading /> : null}
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
          userName={this.state.name}
          address={this.state.address}
          checkOutApi={this.checkOutApi}
          goBack={this.goBack}
        />
        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        />
        
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}
export default withRouter(Home)

