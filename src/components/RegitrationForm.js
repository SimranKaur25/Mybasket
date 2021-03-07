import React from 'react';
import '../styles/style.scss';
import logo from '../images/logo.svg';
import tick from '../images/tick.svg';
import { isValidMsisdn, FRONTEND_NAME } from '../Configuration/Constants';
import { Route, Switch, BrowserRouter, withRouter } from 'react-router-dom';
import red from '../images/red.svg';
import $ from "jquery";
import axios from 'axios';
import Back from '../images/backNew.svg'
import * as constantURL from '../Configuration/Constants';
import * as errorConstantURL from '../Configuration/ErrorConstants';

class RegistrationForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            mobileNumber: '',
            address: '',
            name: '',
            password: '',
            confirmPassword: '',

            isError: false,
            errFieldName: '',
            showMsg: false,
            screenMsg: "",
            errorMsg: '',
            showError: false,


        }

        //this.getCurrentTime();
        this.submitUserDetails = this.submitUserDetails.bind(this);

    }

    componentDidMount() {
        $("html, body").animate({ scrollTop: 0 }, "fast");



        $("#mobileNumber").keydown(function (event) {

            if (event.shiftKey == true) {
                event.preventDefault();
            }

            if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 46) {

            } else {

                event.preventDefault();
            }
        });


    }
    goBack = () => {
        this.props.history.goBack();
    }

    handleClick = (e) => {
        if (isValidMsisdn(this.state.mobileNumber) === false) {

            this.toggleShowMsg("Invalid Mobile Number");
            e.preventDefault();
            return false;

        }

        this.setState({ isError: false, errFieldName: '' });
        e.preventDefault();
        const textPatt = /^[A-Z a-z]+$/g;
        const alphaNumberPatt = /^[A-Za-z 0-9]+$/g;
        const passwordPatt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        var Name = 'Name';
        console.log('this.state.password' + this.state.password);
        console.log('this.state.confirmPassword' + this.state.confirmPassword);
        var val = '';

        if (this.state.name === '' || this.state.name === null || this.state.name === undefined || !textPatt.test(this.state.name)) {
            $("html, body").animate({ scrollTop: 0 }, "fast");
            console.log('inside this');
            val = 'true';
            this.setState({ isError: true });
            this.setState({ errFieldName: 'Name' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
        }
        else if (this.state.address === '' || this.state.address === null || this.state.address === undefined || !alphaNumberPatt.test(this.state.address)) {
            $("html, body").animate({ scrollTop: 0 }, "fast");
            console.log('inside this');
            val = 'true';
            this.setState({ isError: true });
            this.setState({ errFieldName: 'Address' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
        }
        else if (this.state.password === '' || this.state.password === null || this.state.password === undefined || !passwordPatt.test(this.state.password)) {
            $("html, body").animate({ scrollTop: 0 }, "fast");
            console.log('inside this');
            val = 'true';
            this.setState({ isError: true });
            this.setState({ errFieldName: 'Password' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
        }
        else if (this.state.confirmPassword === '' || this.state.confirmPassword === null || this.state.confirmPassword === undefined || !passwordPatt.test(this.state.confirmPassword)) {
            $("html, body").animate({ scrollTop: 0 }, "fast");
            console.log('inside this');
            val = 'true';
            this.setState({ isError: true });
            this.setState({ errFieldName: 'Confirm Password' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
        }
        else if (this.state.password != this.state.confirmPassword) {
            $("html, body").animate({ scrollTop: 0 }, "fast");
            console.log('inside this');
            val = 'true';
            this.setState({ isError: true });
            this.setState({ errFieldName: 'Passwords dont match' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
        }



        if (val === 'true') {
            e.preventDefault();
            return false;
        }
        else {

            this.submitUserDetails();



        }

    }


    toggleShowError = (errorMessage) => {
        console.log("inside toggleShowError " + this.state.showError);
        this.setState(state => ({ showError: true, errorMsg: errorMessage }))

        setTimeout(() => {
            this.setState(state => ({ errorMsg: "" }))
        }, 5000);
    }




    handleNameChange = (e) => {
        const textPatt = /^[A-Z a-z]+$/g;
        const alphaNumberPatt = /^[A-Za-z 0-9]+$/g;

        if (textPatt.test(e.target.value) === false) {
            console.log("i am hererrrrrrrrrrrrrrr");
            $("html, body").animate({ scrollTop: 0 }, "fast");
            this.setState({ isError: true, errFieldName: 'Name' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000000);

        }


        this.setState({ name: e.target.value });



    }



    handleAddressChange = (e) => {
        const textPatt = /^[A-Z a-z]+$/g;
        const alphaNumberPatt = /^[A-Za-z 0-9]+$/g;

        if (alphaNumberPatt.test(e.target.value) === false) {

            $("html, body").animate({ scrollTop: 0 }, "fast");
            this.setState({ isError: true, errFieldName: 'Address' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
            this.setState({ address: e.target.value });
        }

        this.setState({ address: e.target.value });

    }

    handlePasswordChange = (e) => {
        const textPatt = /^[A-Z a-z]+$/g;
        const alphaNumberPatt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (alphaNumberPatt.test(e.target.value) === false) {

            $("html, body").animate({ scrollTop: 0 }, "fast");
            this.setState({ isError: true, errFieldName: 'Password' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
            this.setState({ password: e.target.value });
        }

        this.setState({ password: e.target.value });

    }

    handleConfirmPasswordChange = (e) => {
        const textPatt = /^[A-Z a-z]+$/g;
        const alphaNumberPatt = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if (alphaNumberPatt.test(e.target.value) === false) {

            $("html, body").animate({ scrollTop: 0 }, "fast");
            this.setState({ isError: true, errFieldName: 'Confirm Password' });
            setTimeout(() => {
                this.setState({ isError: false, errFieldName: '' })
            }, 2000);
            this.setState({ confirmPassword: e.target.value });
        }

        this.setState({ confirmPassword: e.target.value });

    }

    handleBack = () => {
        this.props.history.goBack();
    }





    fetchContactNumber = (event) => {
        var contactNumber = event.target.value;
        console.log("Inside fetchContactNumber", contactNumber);

        this.setState({ mobileNumber: contactNumber });
        if (isValidMsisdn(contactNumber) === false) {

            this.toggleShowMsg("Invalid Mobile Number");

        }


    }


    toggleShowMsg = (message) => {
        console.log("inside toggleShowMsg " + this.state.showMsg);
        $("html, body").animate({ scrollTop: 0 }, "fast");
        this.setState({ showMsg: true, screenMsg: message })

        setTimeout(() => {
            this.setState({ screenMsg: " ", showMsg: false })
        }, 5000);
    }

    submitUserDetails() {


        this.setState({ enableLoader: true });
        var url = constantURL.MYBASKET_COMBINED_IP + constantURL.REGISTER_USER;
        const headers = {

        };

        var body = {
            mobileNumber: this.state.mobileNumber,
            password: this.state.password,
            name: this.state.name,
            address: this.state.address
        }
        console.log("url: " + url);
        console.log("headers" + JSON.stringify(headers))
        console.log("body: " + JSON.stringify(body));
        axios.post(url, body, { headers })
            .then(response => response.data)
            .then((data) => {
                this.setState({ enableLoader: false });
                if (data && data.code == errorConstantURL.SUCCESS_CODE) {

                    this.props.history.push({
                        pathname: FRONTEND_NAME + "/login"
                    })
                }
                else if (data.code == errorConstantURL.NO_DATA_FOUND) {

                    this.toggleShowError(data.msg);

                }

                else {
                    this.toggleShowError(data.msg);
                }

            }).catch(error => {
                this.setState({ enableLoader: false })
                this.toggleShowError("Something went wrong")


            });



    }

    render() {
        return (
            <div className="containerF">
                <div className="headerF">
                <img src={Back} alt="" className="float-lft-form"  onClick={this.goBack.bind(this)}></img>
                <span  className="float-lft-text"  >Welcome To My Basket</span>
                </div>
                <div className="contentF">
                    <p className="choose-num mb-20">Personal Details</p>
                    <div className="pd-wyt mt-32">
                        <p>Contact No.</p>

                        <input pattern="\d*" id="mobileNumber" onChange={this.fetchContactNumber} maxLength="10">
                        </input>
                    </div>
                    {this.state.showMsg ?
                        <div className="area">
                            <span><img src={red}></img></span>
                            <span className="red">{this.state.screenMsg}</span>
                        </div>
                        : null}
                    <div className="pd-wyt mt-32">
                        <p>Name</p>
                        <input pattern="[A-Za-z]" title="Only Alphabets" onChange={(e) => this.handleNameChange(e)}></input>
                        {
                            this.state.isError && this.state.errFieldName === 'Name' ?
                                <b>Invalid {this.state.errFieldName}</b>
                                :
                                null
                        }
                        <p>Address</p>
                        <input pattern="[A-Za-z0-9]" title="Alphanumeric value" onChange={(e) => this.handleAddressChange(e)}></input>
                        {
                            this.state.isError && this.state.errFieldName === 'House No' ?
                                <b>Invalid {this.state.errFieldName}</b>
                                :
                                null
                        }

                        <p>Password</p>
                        <input type="password" className={this.state.activeTxt ? "active-txt password" : "password"} name="password" placeholder="Enter Password" onChange={(e) => this.handlePasswordChange(e)} autoComplete="off" ></input>
                        {
                            this.state.isError && this.state.errFieldName === 'Password' ?
                                <b>Invalid {this.state.errFieldName}</b>
                                :
                                null
                        }

                        <p>Confirm Password</p>
                        <input type="password" className={this.state.activeTxt ? "active-txt password" : "password"} name="password" placeholder="Enter Password" onChange={(e) => this.handleConfirmPasswordChange(e)} autoComplete="off" ></input>
                        {
                            this.state.isError && this.state.errFieldName === 'Confirm Password' ?
                                <b>Invalid {this.state.errFieldName}</b>
                                :
                                null

                        }
                        {
                            this.state.isError && this.state.errFieldName === 'Passwords dont match' ?
                                <b>Invalid {this.state.errFieldName}</b>
                                :
                                null

                        }
                        <div className="validate-msg">
                            <span>{this.state.errorMsg}</span>
                        </div>
                    </div>
                    <div className="num-submit m-18">
                        <button id="submitButton" className={isValidMsisdn(this.state.mobileNumber) ? "active-button" : "submit-disable"} onClick={(e) => this.handleClick(e)}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RegistrationForm);










