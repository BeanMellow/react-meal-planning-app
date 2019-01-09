import React from "react";
import FirstVisit from "./FirstVisit";
import UserHeader from "./Header";
import AppNavigation from "./Navigation";
import {NavLink} from "react-router-dom";

class Widgets extends React.Component{
    render(){
        return(
            <div className={"widgetsContainer"}>
                <div>
                    <NavLink to="/AddRecipe" style={{textDecoration: 'none'}}>
                        <div className={"widgetAdd"}>
                            <i className="far fa-plus-square fa-4x"> </i>
                            <h3>dodaj przepis</h3>
                        </div>
                    </NavLink>

                    <NavLink to="/AddSchedule" style={{textDecoration: 'none'}}>
                        <div className={"widgetAdd"}>
                            <i className="far fa-plus-square fa-4x"> </i>
                            <h3>dodaj plan</h3>
                        </div>
                    </NavLink>
                </div>
                <div className={"widgetsInfo"}>
                    <div>
                        <i className="fas fa-info-circle">
                            <h3>Masz już x przepisów, nieźle!</h3>
                        </i>
                        <i className="fas fa-times-circle"> </i>
                    </div>
                    <div>
                        <i className="fas fa-exclamation-circle">
                            <h3>Pamiętaj, aby dodać plan!</h3>
                        </i>
                        <i className="fas fa-times-circle"> </i>
                    </div>
                    <div>
                        <i className="fas fa-check-circle">
                            <h3>Świetnie, że jesteś! Udanego planowania i smaczego! :)</h3>
                        </i>
                        <i className="fas fa-times-circle"> </i>
                    </div>
                </div>
            </div>
        )
    }
}

class ScheduleWeek extends React.Component{


    render(){


        function getWeekNumber(d) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
            var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
            return [d.getUTCFullYear(), weekNo];
        }

        var result = getWeekNumber(new Date());
        console.log(result);

        return(
            <div className={"scheduleContainer"}>
                <div>
                    <h2>Twój plan na  tydzień:</h2>
                    <div>plan</div>
                </div>
                <div>
                    <h3>  poprzedni </h3>
                    <h3>następny</h3>
                </div>
            </div>
        )
    }
}
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
                        <div>
                            <Widgets/>
                            <ScheduleWeek/>
                        </div>
                    </div>

                </div>
            )
        }
    }
}

export default Pulpit;