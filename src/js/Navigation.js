import React from "react";
import {NavLink} from "react-router-dom";

class AppNavigation extends React.Component {
    render() {
        return (
            <div className="navigationContainer">
                <NavLink to="/Main" className={"navStyle"} activeClassName={"activeLink"}>Pulpit</NavLink>
                <NavLink to="/Recipes" className={"navStyle"} activeClassName={"activeLink"}>Przepisy</NavLink>
                <NavLink to="/Schedules" className={"navStyle"} activeClassName={"activeLink"}>Plany</NavLink>
            </div>
        );
    }
}

export default AppNavigation;