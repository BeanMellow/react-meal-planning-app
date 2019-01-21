import React from "react";
import {NavLink} from "react-router-dom";

class AppNavigation extends React.Component {
    render() {
        return (
            <div className="navigationContainer">
                <NavLink to="/Main" className={"navStyle"} activeClassName={"activeLink"}>Dashboard</NavLink>
                <NavLink to="/Recipes" className={"navStyle"} activeClassName={"activeLink"}>Recipes</NavLink>
                <NavLink to="/Schedules" className={"navStyle"} activeClassName={"activeLink"}>Plans</NavLink>
            </div>
        );
    }
}

export default AppNavigation;