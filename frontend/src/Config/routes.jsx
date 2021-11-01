import React from "react";
import Home from '../Pages/Home';
import Community from '../Pages/Community';
import Jobs from '../Pages/Jobs';
import Companies from '../Pages/Companies';
import Login from '../Pages/Login';
import Dashboard from "../Pages/Dashboard";
import PageNotFound from '../Pages/PageNotFound';

const routes = [
    {
        path: '/',
        component: <Login/>
    },
    {
        path: '/community',
        component: <Community/>
    },
    {
        path: '/jobs',
        component: <Jobs/>
    },
    {
        path: '/companies',
        component: <Companies/>
    },
    {
        path: '/dashboard',
        component: <Dashboard/>
    },
    {
        path: '/*',
        component: <PageNotFound/>
    }

]

export default routes