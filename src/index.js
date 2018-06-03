import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/utils.css';

import App from './app';

import './styles/endOverride.css';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      <App />,
    document.getElementById('smallcase-platform')
  );
});
