import React from 'react';
import '../styles/style.scss';
import { withRouter } from 'react-router';
import Back from '../images/backNew.svg'
import Reset from '../images/reset.svg'
import * as constantURL from '../Configuration/Constants';
import * as errorConstantURL from '../Configuration/ErrorConstants';
import axios from 'axios';
import Popup from './popup'
import Loading from '../loader'
import Basket from '../images/galbasket.png'
import Cookies from 'universal-cookie';
class Password extends React.Component {


    goToHomePage = () => {
        console.log("inside go to home page")
        localStorage.removeItem("cartArray");
        this.props.history.push({
            pathname: '/MyBasket/Categories',
          //  search: '?query=abc',
            state: { categories: this.state.categories }
        })
    }
   

  



    constructor(props) {
        super(props);
        this.state = {
            disable:true,
            activeTxt:false,
            encrptMsisdn: '',
            password: '',
            hideTitle:true,
            hideShow:false,
            inputTypePassword:true,
            msisdn: localStorage.getItem("mobileNumber"),
            name:localStorage.getItem("name"),
            errorMsg: '',
            showError: false,
            errorText:'',
            showPopup: false,
            enableLoader: false,
            categories:[],
            msg: '',
            msgType: 'S',
            alertMessage: '',
            heading: ''
        }
        this.handleInputPassword = this.handleInputPassword.bind(this);
        this.hideShow = this.hideShow.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
  
        this.attempt =0;
    }
    componentWillMount() {

    }
   
     handleInputPassword(event) 
     {
         //console.log("val: "+event.target.value.length)
         this.setState({activeTxt:true,hideTitle:false});
         
         if (event.target.value.length >= 4) {
             this.setState({password:event.target.value,disable:false});
         }
         else if (event.target.value.length == 0) {
            this.setState({activeTxt:false,hideTitle:true});
         }
         else{
             this.setState({disable:true });
         }
    }
  
    hideShow()
    {
        this.setState({hideShow:!this.state.hideShow,inputTypePassword:!this.state.inputTypePassword});

    }
    pwdValidation()
    {
        return true;
    }
    
    submitPassword(event) {
     
		if (this.pwdValidation()) {
            this.setState({ enableLoader: true });
			var url = constantURL.MYBASKET_COMBINED_IP + constantURL.VALIDATE_USER
			const headers = {
				
			};
						
			var body = {
				mobileNumber: this.state.msisdn,
                password: this.state.password,
            }
            console.log("url: "+url);
            console.log("headers"+JSON.stringify(headers))
            console.log("body: "+JSON.stringify(body));
			axios.post(url,body ,{headers})
				.then(response => response.data)
				.then((data) => {
                    this.setState({ enableLoader: false });
					if (data && data.code == errorConstantURL.SUCCESS_CODE) {
                        
                     
                        localStorage.setItem("Address",data.data.address);

                        localStorage.setItem("Categories",JSON.stringify(data.data.categories));
                       
                        this.setState({categories : data.data.categories});
                        this.goToHomePage();   
                    } 
                    else if(data.code == errorConstantURL.NO_DATA_FOUND)
                    {

                        this.setState({ showPopup:true,heading: "Sorry", msg :"Couldn't find a account associated with this phone number. Go to registraton page?"});
                 
                    }
                                      
                    else {
                        this.toggleShowError(data.msg);
                    }

				}).catch(error => {
                    this.setState({ enableLoader: false })
                      this.toggleShowError("Something went wrong")
    

                    });

		}

    }
   
	
    goBack = () => {
        this.props.history.goBack();
    }
    togglePopup() {
        this.props.history.push("/MyBasket/login");
		this.setState({
			showPopup: !this.state.showPopup
		});
    }
    toggleShowError = (errorMessage) => {
        console.log("inside toggleShowError " + this.state.showError);
        this.setState(state => ({ showError: true, errorText: errorMessage }))

        setTimeout(() => {
            this.setState(state => ({ errorText: "" }))
        }, 5000);
    }
    
    render() {
       
        return (
            <div className="container-login bgg">
                {this.state.showPopup ?
					<Popup
                    msg={this.state.msg}
                    msgType={this.state.msgType}
                    heading={this.state.heading}
                    okPopup={this.togglePopup}
                    cancelPopup={this.togglePopup}
					/>
					: null
				}
                {this.state.enableLoader ? <Loading /> : null}
                <div className="header-login">
                    <p className="login-back-logo login-back">
                         <span style={{marginLeft:10}}>   Go Back</span> 
                        <img src={Back}  onClick={this.goBack.bind(this)}/><br></br>
                      
                    </p>
                   
                    <span className="header-text" style={{color:"black",fontWeight:"bold",padding:'10px '}}>Welcome back {localStorage.getItem("name")} !</span><br></br>
                
                </div>
                <img src={Basket} alt=":)" width="340px" height="199px"  id="wpstats"></img> 
                <div className="content-login bgg">
                    <p className="mobile-login">Enter Password</p>
                 
                    <p className={this.state.hideTitle ? "input-ttl input-ttl-hide" : "input-ttl"}>Password</p>
                    <div className="msisdn-input">
                        <span>
                            <input type={this.state.inputTypePassword ? "password" : "text"} className={this.state.activeTxt ? "active-txt password" : "password"} name="password" placeholder="Password" onInput={this.handleInputPassword.bind(this)} autoComplete="off" ></input>
                        </span>
                        <span className={this.state.hideShow ? "password-hide-show show-pwd" : "password-hide-show hide-pwd"} onClick={this.hideShow.bind(this)}></span>

                    </div>
                    {/* <p className="reset-btn" onClick={this.resetPassword}>Set/Reset Password</p> */}
                    <button className={this.state.disable ? "submit-login disable submit-pwd" : "submit-login active-button submit-pwd"} onClick={this.submitPassword}>Submit</button>
                    <div className="validate-msg">
       					<span>{this.state.errorText}</span>	
       				</div>
                </div>
            </div>
        );
    }
}

export default withRouter(Password);