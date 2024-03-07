import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Journal from "./components/Journal";
import UserEntries from "./UserEntries";
import "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/components/Header.css"



function Header() {
  return (
    <Router>
      <>
        <Link to="/">Home</Link>
        <Link to="/journal">Journal</Link>
        <Link to="/user">User Journal</Link>

        <Switch>
          <Route path="/journal" component={Journal} />
            <Route path="/user" component={UserEntries} />
        </Switch>
      </>
    </Router>
  );
}

export default Header;