import React from 'react'
import Loader from 'react-loader-spinner'
import './styles/loader.css'
export default class Loading extends React.Component {
 //other logic
   render() {
    return(
      <div id="apply-modal" className="loader-modal">
         <div className="loaderContainer">
            <div className="modal-heading">
               <Loader
                  type="Oval"
                  color="#fff"
                  height={42}
                  width={42}
                  
               />
            </div>
         </div>
      </div>
    );
   }
}