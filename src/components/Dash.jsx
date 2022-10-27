import { useState } from "react";
import { Route, useRouteMatch, Link } from "react-router-dom"
import Details from "./dash-components/Details";
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
        <main>

            <Route exact path={match.url}>
                <Link to={`${match.url}/list`}>list</Link>
                <Link to={`${match.url}/settings`}>settings</Link>
            </Route>

            <Route exact path={[`${match.url}/list`, `${match.url}/list/:section`]}>
                <List itemsObject={itemsObject} setItemsObj={setItemsObj} />
                <Link to={match.url}>back</Link>
            </Route>

            <Route exact path={`${match.url}/details/:id`}>
                <Details />
            </Route>
            
            <Route exact path={`${match.url}/settings`}>
                <h1>Settings</h1>
                <Link to={match.url}>back</Link>
            </Route>

            
        </main>
    );
}