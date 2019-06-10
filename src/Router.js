import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SplSave } from './SplIO'
import App from './App'

const SplRouter = () => {
  return <Router>
    <Route path="/save" component={ SplSave } />
    <Route path="/" component={ App } />
  </Router>
}

export default SplRouter
