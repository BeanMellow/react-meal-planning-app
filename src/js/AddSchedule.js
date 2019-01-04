import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";


class AddSchedule extends React.Component{
    render(){
        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <h1>Dodawanie nowego planu</h1>
                </div>
            </div>
        )
    }
}

export default AddSchedule;