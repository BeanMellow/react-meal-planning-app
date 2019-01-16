import React from "react";
import {Link} from "react-router-dom";

class UserHeader extends React.Component {
    render(){
        return (
            <div className={'appHeader'}>
                <div>
                    <Link to="/" style={{textDecoration: 'none'}}><h1 className={'logo'}>
                        Zaplanuj <span>Jedzonko</span>
                    </h1></Link>
                </div>
                <div className={'user'}>
                    <h2>{localStorage.getItem("givenName")}</h2>
                    <i className="fas fa-user-circle fa-2x"> </i>
                </div>
            </div>

        )
    }
}

export default UserHeader;