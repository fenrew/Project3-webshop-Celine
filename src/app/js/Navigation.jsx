import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
    let link;
    let settings;
    if (props.login === "Logg på") link = <Link to="/auth/sign-in">{props.login}</Link>
    else link = <Link to="/auth/logout">{props.login}</Link>
    if(props.userRole === "admin"){
        settings = <Link to="/settings"><img src={"https://res.cloudinary.com/doecwsnly/image/upload/v1537793247/Settings.png"} alt="" id="rediger-image"/></Link>
    }
    
    return <div id="navigation-bar">
        <Link to="/">Hjem</Link>
        <Link to="/shop">Butikk</Link>
        <Link to="/doterra">doTERRA eteriske</Link>
        <Link to="/events">Kurs & foredrag</Link>
        <Link to="/blog">Blogg</Link>
        <Link to="/about-me">Om meg</Link>
        {link}
        {settings}
    </div>
};

export default Navigation;