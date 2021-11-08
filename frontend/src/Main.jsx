import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Home from "./Home";
import Navbar from "./components/NavMenu/TopNav";


import "./css/main_style.css";
import "./css/top_nav.css";
import "./css/footer.css";
import "./css/profile_menu.css";
import "./css/language_menu.css";
import "./css/chatbox.css";
import "./css/loader.css";

// document.querySelector('#lang-img').src = `./img/languages/en.webp`;
// document.querySelector('body').onload = setTimeout(function () { reveal_chats(); }, 1000);
// // if (width > 1290) {window.onscroll = function(){scrollFunction2()};}
//
// function set_lang_cookie(lang) {
//     document.cookie = `django_language=en`
// }
//
// document.querySelector('.system-message').style.bottom = "5%";
// setTimeout(
//     function () {
//         document.querySelector('.system-message').style.bottom = "-25%";
//     },
//     3000
// )

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    {/*<Navbar user={get_user}/>*/}
                    <div className="content">
                        {/*<Route exact path="/" component={Home}/>*/}
                        Unilab Website
                    </div>
                </div>
                <Navbar></Navbar>
            </HashRouter>
        );
    }
}

export default Main;

function get_user() {

}
