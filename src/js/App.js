import React from 'react'
import { HashRouter, Switch, Route, Link, NavLink} from 'react-router-dom';
import LandingPage from './LandingPage';
import Schedules from './Schedules';
import Recipes from './Recipes';
import Pulpit from './Pulpit';
import AddRecipe from './AddRecipe';
import AddSchedule from './AddSchedule';
import EditSchedule from './EditSchedule';


class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/Main" component={Pulpit}/>
                    <Route path="/Recipes" component={Recipes}/>
                    <Route path="/Schedules" component={Schedules}/>
                    <Route path="/AddRecipe" component={AddRecipe}/>
                    <Route path="/AddSchedule" component={AddSchedule}/>
                    <Route path="/EditSchedule/:value" component={EditSchedule}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default App;