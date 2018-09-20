import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
    
    return <div id="navigation-bar">
        <Link to="/">Hjem</Link>
        <Link to="/shop">Butikk</Link>
        <Link to="/doterra">doTERRA eteriske</Link>
        <Link to="/kurs-og-foredrag">Kurs & foredrag</Link>
        <Link to="/blog">Blogg</Link>
        <Link to="/om-meg">Om meg</Link>
    </div>
};

export default Navigation;