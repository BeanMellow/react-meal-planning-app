import React from 'react'
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage';
import FirstVisit from './FirstVisit';

const linkStyle = {
    textDecoration: 'none',
    color: '#0A1F1C'
};

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

const display = {
    display: "flex",
    justifyContent: "space between"
}

class UserHeader extends React.Component {
    render(){
        return (
            <div className={'header'} style={display}>
                <div className={'container'}>
                    <Link to="/" style={linkStyle}><h1 className={'logo'}>
                        Zaplanuj <span>Jedzonko</span>
                    </h1></Link>
                </div>
                <div style={display}>
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
                <ul>
                    <Link to="/Main" style={linkStyle}><li>Pulpit</li></Link>
                    <Link to="/Recipes" style={linkStyle}><li>Przepisy</li></Link>
                    <Link to="/Schedules" style={linkStyle}><li>Plany</li></Link>
                </ul>
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