import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";

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

export default Recipes;

