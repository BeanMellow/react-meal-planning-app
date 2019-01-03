import React from 'react'
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage';

const linkStyle = {
    textDecoration: 'none',
    color: '#0A1F1C'
};

class About extends React.Component{
    render(){
        return (
            <div>
                {/*to będzie wysyłać do głównej strony*/}
            </div>
        )
    }
}

class MainApp extends React.Component{
    render(){
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

class Planes extends React.Component{
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
            <div className="appHeader">
                <Link to="/" style={linkStyle}><h1>Zaplanuj jedzonko</h1></Link>
            </div>
        )
    }
}

class InitialHeader extends React.Component {
    render(){
        return (
            <div className="appHeader">
                <Link to="/About" style={linkStyle}><h1>Zaplanuj jedzonko - to jest initial header</h1></Link>
            </div>
        )
    }
}

class AppSwitch extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/Main" component={MainApp}/>
                    <Route path="/Recipes" component={Recipes}/>
                    <Route path="/Planes" component={Planes}/>
                </Switch>
            </div>)
    }
}

class AppNavigation extends React.Component {
    render() {
        return (
            <div className="navigationContainer">
                <ul>
                    <Link to="/Main" style={linkStyle}><li>Pulpit</li></Link>
                    <Link to="/Recipes" style={linkStyle}><li>Przepisy</li></Link>
                    <Link to="/Planes" style={linkStyle}><li>Plany</li></Link>
                </ul>
            </div>
        );
    }
}

class RegistrationPage extends React.Component{
    render(){

        return (
            <h1>regisration page</h1>
        )
    }
}

class App extends React.Component {
    render() {

        return (
            <HashRouter>
                    <AppSwitch/>
            </HashRouter>
        )

    }


}

export default App;