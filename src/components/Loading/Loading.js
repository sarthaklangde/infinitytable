import React, { Component } from 'react';

import './Loading.css';

const Loading = (props) => {
    const style = props.style || {height: '100vh', width: '100vw'};
    return(
      <div styleName="animation_container" style={style}>
        <div styleName="loader">
          <svg styleName="circular" viewBox="25 25 50 50">
            <circle styleName="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>
    );

};

export default Loading;
