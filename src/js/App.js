import React from 'react'
import { HashRouter, Switch, Route, Link, NavLink} from 'react-router-dom';
import LandingPage from './LandingPage';
import FirstVisit from './FirstVisit';

class Recipes extends React.Component{
    render(){
        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <h1>Przepisy</h1>
                </div>
            </div>
        )
    }
}

class Schedules extends React.Component{
    render(){
        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <h1>Plany</h1>
                </div>
            </div>
        )
    }
}

class UserHeader extends React.Component {
    render(){
        return (
            <div className={'header appHeader'}>
                <div className={'container'}>
                    <Link to="/" style={{textDecoration: 'none'}}><h1 className={'logo'}>
                        Zaplanuj <span>Jedzonko</span>
                    </h1></Link>
                </div>
                <div className={'user'}>
                    <h2>{localStorage.getItem("givenName")}</h2>
                    <i className="fas fa-user-circle fa-2x"> </i>
                </div>
            </div>

        )
    }
}

class AppNavigation extends React.Component {
    render() {
        return (
            <div className="navigationContainer">
                    <NavLink to="/Main" className={"navStyle"} activeClassName={"activeLink"}>Pulpit</NavLink>
                    <NavLink to="/Recipes" className={"navStyle"} activeClassName={"activeLink"}>Przepisy</NavLink>
                    <NavLink to="/Schedules" className={"navStyle"} activeClassName={"activeLink"}>Plany</NavLink>
            </div>
        );
    }
}

class MainApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            changeName: false
        }
    }

    changeView = () => {
        this.setState({
            changeName: true
        });
    };

    render(){

        if(localStorage.getItem("givenName") === null) {
            return <FirstVisit nameIsChanged={this.changeView}/>
        }else{
            return (
                <div className="mainAppView">
                    <UserHeader/>
                    <div style={{display: 'flex'}}>
                        <AppNavigation/>
                        <h1>główny widok aplikacji z widżetami i planem tygodnia</h1>
                    </div>
                </div>
            )
        }
    }
}

class App extends React.Component {
    render() {

        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/Main" component={MainApp}/>
                    <Route path="/Recipes" component={Recipes}/>
                    <Route path="/Schedules" component={Schedules}/>
                </Switch>
            </HashRouter>
        )

    }


}

export default App;