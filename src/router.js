import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Main from "./scenes/Main/Main.js";

const RootRouter = (props) => {

  return (
    <Router>
        <Route path ="/" component={Main}/>
    </Router>
  );
};

export default RootRouter;
