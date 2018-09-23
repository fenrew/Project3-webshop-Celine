import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
    let link;
    if (props.login === "Logg på") link = <Link to="/auth/sign-in">{props.login}</Link>
    else link = <Link to="/auth/logout">{props.login}</Link>
    
    return <div id="navigation-bar">
        <Link to="/">Hjem</Link>
        <Link to="/shop">Butikk</Link>
        <Link to="/doterra">doTERRA eteriske</Link>
        <Link to="/kurs-og-foredrag">Kurs & foredrag</Link>
        <Link to="/blog">Blogg</Link>
        <Link to="/about-me">Om meg</Link>
        {link}
    </div>
};

export default Navigation;