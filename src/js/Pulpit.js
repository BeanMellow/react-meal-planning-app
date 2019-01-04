import React from "react";
import FirstVisit from "./FirstVisit";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";

class Pulpit extends React.Component{
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

export default Pulpit;