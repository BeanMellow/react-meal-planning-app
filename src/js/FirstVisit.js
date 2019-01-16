import React from "react";
import {Link, NavLink} from "react-router-dom";


class RegistrationPage extends React.Component{

    handleClick = () => {
        const name = this.input.value;
        localStorage.setItem("givenName", name);

        if (typeof(this.props.onNameSubmitted) === "function") {
            this.props.onNameSubmitted();
        }
    };

    render(){

        return (
            <div className="firstVisitContainer">
                <h2>Witaj,</h2>
                <h3>Wygląda na to, że jesteś tutaj pierwszy raz!</h3>

                    <input type={"text"} placeholder={"tutaj wpisz jak masz na imię"} ref={(input) => {
                        this.input = input
                    }}/> <br/>
                    <button type={"submit"} onClick={this.handleClick}> Gotowe!</button>

                <h3>Podaj nam swoje imię, a my zorganizujemy dla Ciebie naszą aplikację :)</h3>
            </div>
        )
    }
}

class InitialHeader extends React.Component {
    render(){
        return (
            <div className={'appHeader'}>
                <div>
                    <Link to="/" style={{textDecoration: 'none'}}><h1 className={'logo'}>
                        Zaplanuj <span>Jedzonko</span>
                    </h1></Link>
                </div>
                <div className={'user'}>
                    <h2>Imię</h2>
                    <i className="fas fa-user-circle fa-2x"> </i>
                </div>
            </div>

        )
    }
}


class InitialAppNavigation extends React.Component {
    render() {
        return (
            <div className="navigationContainer">
                    <NavLink to="/Main" className={"navStyle"} activeClassName={"activeLink"}>Pulpit</NavLink>
            </div>
        );
    }
}

class FirstVisit extends React.Component{
    render(){
        return (
            <div className="mainAppView">
                <InitialHeader/>
                <div style={{display: 'flex'}}>
                    <InitialAppNavigation/>
                    <RegistrationPage onNameSubmitted={this.props.nameIsChanged}/>
                </div>
            </div>
        )
    }
}

export default FirstVisit;