import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Journal from "./components/Journal";

function Header() {
  return (
    <Router>
      <>
        <Link to="/">Home</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/user">User</Link>

        <Switch>
          <Route path="/journal" component={Journal} />
          {/* Add more routes as needed */}
        </Switch>
      </>
    </Router>
  );
}

export default Header;
