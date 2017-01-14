import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router"

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Nutrition from "./pages/Nutrition";
import Supplements from "./pages/Supplements";
import Training from "./pages/Training";
import Workout from "./pages/Workout";

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Dashboard}></IndexRoute>
            <Route path="nutrition" component={Nutrition}></Route>
            <Route path="supplements" component={Supplements}></Route>
            <Route path="training" component={Training}></Route>
            <Route path="workout(/:id)" component={Workout}></Route>
        </Route>
    </Router>
, app);