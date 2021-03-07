import urls from './apiUrls';
import axios from 'axios';
import {FRONTEND_NAME} from './constants';
import * as constants from './constants';


//use ?
axios.interceptors.response.use(function (response) {
  console.log("responses in ",response);
  if([2010,2009,4000,5000].includes(response.data.code)){
    //window.location=FRONT_END_NAME;
  }
  return response;
}, function (error) {
  
  return Promise.reject(error);
});








export const getPostApi =   (url, headers = {}, requestBody={} ) => {
    console.log("Url to call : ", url);
    console.log("headers : ", headers)
    console.log("requestBody : ", requestBody);
    return axios.post(url, requestBody, {headers} );
}

export const getGetApi = (url, headers) => {
    console.log("Url to call : ", url);
    headers["Content-Type"]="application/json";
    console.log("headers : ", headers);
    return axios.get(url,{headers});
}

export const getDeleteApi =   (url, headers = {}, data={} ) => {
  console.log("Url to call : ", url);
  console.log("headers : ", headers)
  console.log("requestBody : ", data);
  return axios.delete(url ,{headers,data});
}


export default {
  appLoger : (body,headers)=> getPostApi((urls.appLoger),headers,body)
}

