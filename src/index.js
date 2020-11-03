import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./index.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function AppRouter() {
    return(
        <Router>
            <div className="app">
                <nav className="main-nav">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
                <Switch>
                    <Route path="/" exact component= { Home } />
                    <Route path="/login" exact component= { Login } />
                    <Route path="/register" exact component= { Register } />
                    <Route component= { NoMatch } />
                </Switch>
            </div>
        </Router>
    );
}

const NoMatch = ({ location }) => 
    "No route match for {location.pathname}";

ReactDOM.render(<AppRouter />, document.getElementById("root"));