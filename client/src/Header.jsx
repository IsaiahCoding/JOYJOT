import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Journal from "./components/Journal";
import UserEntries from "./UserEntries";
import "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/components/Header.css"



function Header() {
  return (
    <Router>
      <>
        <div>
          <Link to="/">Home</Link>
        </div>
        
        <div>
          <Link to="/journal">Journal</Link>
        </div>

        <div>
          <Link to="/user">User Journal</Link>
        </div>

        <Switch>
          <Route path="/journal" component={Journal} />
          <Route path="/user" component={UserEntries} />
        </Switch>
      </>
    </Router>
  );
}

export default Header;