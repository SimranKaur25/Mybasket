
const HTTP="//";

export const FRONTEND_NAME="/MyBasket"

//local
//const DOMAIN_ADDRESS="digital.mv1.in"
const DOMAIN_ADDRESS="localhost:8088"
//prod
// const DOMAIN_ADRESS="digital.mv1.in";

const MyBASKET_PROJECT_NAME="MyBasket"

export const MYBASKET_COMBINED_IP=HTTP+DOMAIN_ADDRESS+"/"+ MyBASKET_PROJECT_NAME;
export const VERIFY_USER="/verifyUser";
export const VALIDATE_USER="/validateUser"
export const REGISTER_USER="/registerUser";
export const ADD_TO_CART="/addToCart";
export const CHECKOUT="/checkout";
export const DELETE_FROM_CART="/deleteFromCart"



// -------------------------------------------------------

export const OTP="123456";
export const ONLY_NUM_REGEX = /[^0-9]/g;
export const ONLY_ALPHA_REGEX = /[^A-Za-z ]/g;
export const VALIDATE_MOBILE_NO_REGEX = /^[6-9]\d{9}$/;

export function copyObject (obj){
    return JSON.parse(JSON.stringify(obj));
}

const SECRET_KEY="MYSECRETKEY"

export function setObjectInSS(key,Object){
    sessionStorage[key] = Object;
}


export function getObjectFromSS(key){
    return JSON.parse(sessionStorage[key]);
}


export function isValidMsisdn (msisdn)
{
  console.log("inside isValid() method");  
  var pattern = new RegExp(VALIDATE_MOBILE_NO_REGEX);
  return !(msisdn == null || msisdn == '' || !pattern.test(msisdn));   

}




















