import { useState } from "react";
import { Route, useRouteMatch, Link } from "react-router-dom"
import Details from "./dash-components/Details";
import Favourites from "./dash-components/Favourites";
import List from "./dash-components/List";

export default function Dash(){

    const match = useRouteMatch();
    
    const [ itemsObject, setItemsObj ] = useState({
        initLoad: false,
        limit: 20,
        total: 0,
        next: null,
        items: [],
        loading: true,
    });

    return(
        <>

            <Route exact path={match.url}>
                <div id="section-menu" className="section-flex">
                <Link to={`${match.url}/list`}>
                    <div className="link-card">
                        <div><i className="fa fa-list"></i></div>
                        <div>List</div>
                    </div>
                </Link>
                <Link to={`${match.url}/favourites`}>
                    <div className="link-card">
                        <div><i className="fa fa-user-circle"></i></div>
                        <div>Favourites</div>
                    </div>
                </Link>
                </div>
            </Route>

            <Route exact path={[`${match.url}/list`, `${match.url}/list/:section`]}>
                <List itemsObject={itemsObject} setItemsObj={setItemsObj} />
            </Route>

            <Route exact path={`${match.url}/details/:id`}>
                <Details />
            </Route>
            
            <Route exact path={[`${match.url}/favourites`, `${match.url}/favourites/:section`]}>
                <Favourites />
            </Route>

            
        </>
    );
}