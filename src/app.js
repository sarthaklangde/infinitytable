import React, {Component} from 'react';
import RootRouter from './router';

export default class App extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <RootRouter/>
    )
  }
};



