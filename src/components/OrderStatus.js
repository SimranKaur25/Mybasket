import React from 'react';
import '../styles/style.scss';
import logo from '../images/galbasket.png'
import tick from '../images/tick.svg';
import { FRONTEND_NAME } from '../Configuration/Constants';
import { withRouter } from 'react-router';
import * as constantURL from '../Configuration/Constants';
import * as errorConstantURL from '../Configuration/ErrorConstants';
import Basket from '../images/galbasket.png'

class OrderStatus extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            orderDetails:JSON.parse(localStorage.getItem("orderDetails"))
        }
    }

    handleClick=()=>{
        // localStorage.removeItem("cartArray");
        this.props.history.push({
            pathname: FRONTEND_NAME + "/categories",
        });
    }
 
    render() {
           return (         
            <div className="containerO bgg">
              <div className="headerO">
                  <img
                      src={Basket}
              alt="Veggy Brand Logo"
            />
                </div>
                <div className="contentO">
                    <img src={tick} className="tick-imgO"></img>
                    <p className="success-msgO">Hey , {this.state.orderDetails.name}</p>
                    <p className="success-msgO">Your order with order id - {this.state.orderDetails.orderId} has been placed successfully !</p>
                    <p className="delivery-msgO">Order will be delivered by {this.state.orderDetails.deliveryDate}</p>
                    <br></br>
                    <p className="success-msgO">Receipt </p>
                    <br></br>
                    <p className="success-msgO">Name : {this.state.orderDetails.name}</p>
                    <p className="success-msgO">Mobile No : {this.state.orderDetails.mobileNumber}</p>
                    <p className="success-msgO">Total Amount : {this.state.orderDetails.totalAmount}</p>
                    <p className="success-msgO">Address : {this.state.orderDetails.address}</p>
                  
                    
                    <p className="anotherO">
                        <span>Order Another?</span> 
                        <span onClick={()=>this.handleClick()}>Click Here</span>
                    </p>
                </div>
            </div>
        )

    }
}

export default withRouter(OrderStatus);










