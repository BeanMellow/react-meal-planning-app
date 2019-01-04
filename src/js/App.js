import React from 'react'
import { HashRouter, Switch, Route, Link, NavLink} from 'react-router-dom';
import LandingPage from './LandingPage';
import Schedules from './Schedules';
import Recipes from './Recipes';
import Pulpit from './Pulpit';

class PulpitRoute extends React.Component{
    render(){
        return (
            <Pulpit/>
        )
    }
}

class RecipesRoute extends React.Component{
    render(){
        return (
            <Recipes/>
        )
    }
}

class SchedulesRoute extends React.Component{
    render(){
        return (
            <Schedules/>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/Main" component={PulpitRoute}/>
                    <Route path="/Recipes" component={RecipesRoute}/>
                    <Route path="/Schedules" component={SchedulesRoute}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default App;