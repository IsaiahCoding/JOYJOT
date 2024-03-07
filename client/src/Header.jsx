import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Journal from "./components/Journal";



function Header() {
  return (
    <Router>
      <>
        <Link to="/">Home</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/user">User Journal</Link>

        <Switch>
          <Route path="/journal" component={Journal} />
        </Switch>
      </>
    </Router>
  );
}

export default Header;