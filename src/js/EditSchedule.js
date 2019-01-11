import React from "react";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";

class EditSchedule extends React.Component{
    render(){
        const scheduleID = this.props.match.params.value


        return (
            <div className="mainAppView">
                <UserHeader/>
                <div style={{display: 'flex'}}>
                    <AppNavigation/>
                    <h1>{scheduleID}</h1>

                </div>
            </div>
        )
    }
}

export default EditSchedule;