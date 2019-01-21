import React from "react";
import {Link, NavLink} from "react-router-dom";


class RegistrationPage extends React.Component {

    handleClick = () => {
        const name = this.input.value;
        localStorage.setItem("givenName", name);

        if (typeof(this.props.onNameSubmitted) === "function") {
            this.props.onNameSubmitted();
        }
    };

    render() {

        return (
            <div>
                <h2>Welcome,</h2>
                <h3>Looks like you're here for the first time.</h3>
                <h3>Enter your name below and start enjoying our app!</h3>
                <input type={"text"} placeholder={"Name"} ref={input => {
                    this.input = input
                }}/>
                <button type={"submit"} onClick={this.handleClick}>Confirm</button>
            </div>
        );
    }
}

class InitialHeader extends React.Component {
    render() {
        return (
            <div className={'appHeader'}>
                <div>
                    <Link to="/" style={{textDecoration: 'none'}}><h1 className={'logo'}>
                        Meal <span>Planner</span>
                    </h1></Link>
                </div>
                <div className={'user'}>
                    <h2>Imię</h2>
                    <i className="fas fa-user-circle fa-2x"> </i>
                </div>
            </div>
        );
    }
}


class InitialAppNavigation extends React.Component {
    render() {
        return (
            <div className="navigationContainer">
                <NavLink to="/Main" className={"navStyle"} activeClassName={"activeLink"}>Dashboard</NavLink>
            </div>
        );
    }
}

class FirstVisit extends React.Component {
    render() {
        return (
            <div className="mainAppView">
                <InitialHeader/>
                <div style={{display: 'flex'}}>
                    <InitialAppNavigation/>
                    <div className="firstVisitContainer">
                        <RegistrationPage onNameSubmitted={this.props.nameIsChanged}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default FirstVisit;