import React from 'react';
import '../styles/style.scss';
import axios from 'axios';
import { withRouter } from 'react-router';
import Back from '../images/l-back.svg'
import Reset from '../images/reset.svg'
import * as constantURL from '../Configuration/Constants';
import * as errorConstantURL from '../Configuration/ErrorConstants';
import Loading from '../loader'
import $ from 'jquery';
import Popup from './popup'
import Cookies from 'universal-cookie';
import Basket from '../images/galbasket.png'

class Mobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disable: true,
            activeTxt: false,
            reset: false,
            hideTitle: true,
            countryCode: constantURL.COUNTRY_CODE,
            msisdn: '',
            password: '',
            errorText: '',
            errorMsg: '',
            showError: false,
            userType: '',
            enableLoader: false,
            showPopup: false,
            showPopupNew: false,
            showConfirmPopup: false,
            msg: '',
            msgType: 'S',
            alertMessage: '',
            heading: ''


        }
        this.handleInputMsisdn = this.handleInputMsisdn.bind(this);
 
        this.goToPasswordPage = this.goToPasswordPage.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.removeValues = this.removeValues.bind(this);

    }
   
    goToPasswordPage = () => {
        this.props.history.push({
            pathname: '/MyBasket/Password'
        })
    }
    gotToRegistrationPage= () => {
        this.props.history.push({
            pathname: '/MyBasket/RegistrationForm'
        })
    }
    

    closePopup = () => {
        this.setState({
            showPopupNew: false,
        })
       
    }



    inputValidation(msisdn) 
    {

        console.log("user mobile number",msisdn);
        var pattern = new RegExp(constantURL.ONLY_NUM_REGEX);
        //console.log(pattern.test(msisdn));

        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (!msisdn) {
            this.setState({ errorText: "Mobile number cannot be empty" });
            return false;
        }
        // else if (!msisdn.value.match(phoneno)) {
        //     this.setState({ errorText: "Invalid Mobile number. Only digits allow." });
        //     return false;
        // }
        else if (msisdn.length != 10) {
            this.setState({ errorText: "Mobile number should be of 10 digits" });
            return false;
        }
        else if (!msisdn.startsWith("9") && !msisdn.startsWith("8") && !msisdn.startsWith("7") && !msisdn.startsWith("6")) {
            this.setState({ errorText: "Mobile number should start with 9,8,7 or 6" });
            return false;
        }
        return true;
    }


    componentDidMount() {
  
            
    }

    


    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    loginUser() {
        const cookies = new Cookies();
   
        console.log("inside loginUser method");
        if (this.inputValidation(this.state.msisdn)) {
            this.setState({ enableLoader: true });
            var url = constantURL.MYBASKET_COMBINED_IP + constantURL.VERIFY_USER;

            const body = {
                mobileNumber:this.state.msisdn
            }

            const headers={}
            axios.post(url, body, { headers })
                .then(response => response.data)
                .then((data) => {
                    this.setState({ enableLoader: false });
                    if(data.code == errorConstantURL.SUCCESS_CODE)
                    {
console.log("i am here");
                        localStorage.setItem("name", data.data.name);
                        localStorage.setItem("mobileNumber", data.data.mobileNumber);


                      this.goToPasswordPage();


                    }
                    else if(data.code == errorConstantURL.NO_DATA_FOUND)
                    {

                        this.setState({ showPopupNew:true,heading: "Sorry", msg :"Couldn't find a account associated with this phone number. Go to registraton page?"});
                 
                    }
                    else {
                        this.state.toggleShowError(data.msg);
                    }

           


                   
                }).catch(error => {
                    this.setState({ enableLoader: false })
                     this.toggleShowError("Something went wrong")
    
                    });
            
        }
    }

    handleInputMsisdn(event) {
        this.setState({ activeTxt: true, reset: true, hideTitle: false });
        this.setState({ msisdn: event.target.value });
        if (event.target.value.length == 10) {
            this.setState({ msisdn: event.target.value, disable: false });
        }
        else if (event.target.value.length == 0) {
            this.setState({ reset: false, activeTxt: false, hideTitle: true });
        }
        else {
            this.setState({ disable: true });
        }
    }
    removeValues() {
        $('#msisdn').val('');
        this.setState({ msisdn: '', disable: true, reset: false, hideTitle: true });
    }

    toggleShowError = (errorMessage) => {
        console.log("inside toggleShowError " + this.state.showError);
        this.setState(state => ({ showError: true, errorMsg: errorMessage }))

        setTimeout(() => {
            this.setState(state => ({ errorMsg: "" }))
        }, 5000);
    }

    render() {
        return (
            <div className="container-login bgg">
                {this.state.enableLoader ? <Loading /> : null}
                {this.state.showPopupNew ?
                    <Popup
                        msg={this.state.msg}
                        msgType={this.state.msgType}
                        heading={this.state.heading}
                        okPopup={this.gotToRegistrationPage}
                        cancelPopup={this.closePopup}
                    />
   
                    : null}
   <span  className="float-lft-text2"  >Welcome To My Basket</span>
                <div className="header-login">
                    <div className="login-back-logo">
                 
                    </div>
                    <img src="http://digital.mv1.in/profileImages/registerHere.png" className="register-now " onClick={this.gotToRegistrationPage}></img> 
                   <img src={Basket} alt=":)" width="340px" height="199px"  id="wpstats"></img> 
                  
                   
                </div>
                <div className="content-login bgg">
                    <p className="mobile-login enter">Enter Mobile Number</p>
                    <p className={this.state.hideTitle ? "input-ttl input-ttl-hide" : "input-ttl"}>Mobile Number</p>
                    {/* <form> */}
                    <div className="msisdn-input">
                        <span className={this.state.activeTxt ? "select-countryCode active-txt" : "select-countryCode"}>+91</span>
                        <span>
                            <input type="text" id="msisdn" className={this.state.activeTxt ? "active-txt" : ""} name="mobileNumber" placeholder="Mobile Number" maxLength="10" onInput={this.handleInputMsisdn.bind(this)} autoComplete="off" ></input>
                        </span>
                        <span className={this.state.reset ? "login-reset login-reset-status" : "login-reset"}><img src={Reset} alt="" onClick={this.removeValues.bind(this)} /></span>

                    </div>
                    <div className="validate-msg">
                        <span>{this.state.errorMsg}</span>
                    </div>
                    <button className={this.state.disable ? "submit-login disable" : "submit-login active-button"} onClick={this.loginUser.bind(this)}>Proceed</button>

               {/* <input type="reset" className="resetBtn" value="" /> */}
                    {/* </form> */}
                </div>
            </div>
        );
    }
}

export default withRouter(Mobile);