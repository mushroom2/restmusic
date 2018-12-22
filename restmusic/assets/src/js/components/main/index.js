import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Base from '../base'
const TrackList = () => <h1>Hello!11</h1>;

const BasePage = () => <h1>Welcome to REST music</h1>;


const myRouter = () => (
    <Router>
    <Switch>
        <Route path="/tracks" component={TrackList}/>
        <Route exact path="/" component={BasePage}/>
    </Switch>
    </Router>
);

export default myRouter;