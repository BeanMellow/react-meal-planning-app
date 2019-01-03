import React from "react";
import {Link} from "react-router-dom";

const linkStyle = {
    textDecoration: 'none',
    color: '#0A1F1C'
};

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
            <div>
                <h2>Witaj,</h2>
                <h3>Wygląda na to, że jesteś tutaj pierwszy raz!</h3>
                <input type={"text"} ref={(input) => {
                    this.input = input
                }}/>
                <button type={"submit"} onClick={this.handleClick}> Gotowe!</button>
                <h3>Podaj nam swoje imię, a my zorganizujemy dla Ciebie naszą aplikację :)</h3>
            </div>
        )
    }
}

class InitialHeader extends React.Component {
    render(){
        return (
            <div className={'header'}>
                <div className={'container'}>
                    <Link to="/" style={linkStyle}><h1 className={'logo'}>
                        Zaplanuj <span>Jedzonko</span>
                    </h1></Link>
                </div>
            </div>
        )
    }
}

class InitialAppNavigation extends React.Component {
    render() {
        return (
            <div className="navigationContainer">
                <ul>
                    <Link to="/Main" style={linkStyle}><li>Pulpit</li></Link>
                </ul>
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