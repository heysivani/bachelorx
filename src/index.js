import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { auth, provider } from "./firebase";
import "./index.css";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // check if a user is logged in
        auth().onAuthStateChanged(user => {
            if(user) {
                console.log("set current user");
                // if a user is currently logged in, store them in state
                setUser(user);
            }
        })
    }, [])

    const logoutUser = async () => {
        console.log("logging u out...");
        try {
            await auth().signOut();
            window.location = "/";
        } catch(error) {
            console.log("can't log u out if you're not logged in");
            console.error(error);
        }
    }

    return(
        <Router>
            <div className="app">
                <nav className="main-nav">
                    { !user && 
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    }
                    { user && 
                        <a href = "#!" onClick={ logoutUser }>Logout</a>
                    }
                    {/* <Link to="/">Home</Link> */}
                </nav>
                <Switch>
                    <Route path="/" exact render={ () => <Home user={ user } /> } />
                    <Route path="/login" exact component= { Login } />
                    <Route path="/register" exact component= { Register } />
                    <Route component= { NoMatch } />
                </Switch>
            </div>
        </Router>
    );
}

const NoMatch = () => 
    "No space baes here :(";

ReactDOM.render(<App />, document.getElementById("root"));