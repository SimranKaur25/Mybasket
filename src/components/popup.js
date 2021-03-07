import React from 'react'
import axios from 'axios';
import '../styles/popup.css';

import { withRouter } from 'react-router'

class Popup extends React.Component {
    render() {
      
        return (
            <div id="apply-modal1" className= "modal1"  >
                <div className="modal-content1">
                    <div className="modal-heading1">
                        <p className="popup-p1">{this.props.heading}</p>
                    </div>
                    <div className="apply-modal-header1">
                        <p>{this.props.msg}</p>
                    </div>
                    <div className="modal-close1">
                    <button className="popup-btn1 p-ryt1" onClick={this.props.okPopup}>OK</button>
                    <button className="popup-btn1 p-ryt1" onClick={this.props.cancelPopup}>CANCEL</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Popup);