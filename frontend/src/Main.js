import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contract";
import Navbar from "./components/navbar";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Navbar user={get_user}/>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/stuff" component={Stuff}/>
                        <Route path="/contact" component={Contact}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;

function get_user(){

}