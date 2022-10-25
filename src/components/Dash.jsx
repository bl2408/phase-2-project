import { useEffect } from "react";
import { epApi } from "../endpoints";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom"

export default function Dex(){

    // useEffect(()=>{
    //     fetch(epApi.list())
    //     .then(res=>res.json())
    //     .then(data=>console.log(data));
    // },[]);

    const match = useRouteMatch();
    console.log(match)

    return(
        <main>

            <Route exact path={match.url}>
                <Link to={`${match.url}/list`}>list</Link>
                <Link to={`${match.url}/settings`}>settings</Link>
            </Route>

            <Route exact path={`${match.url}/list`}>
                <h1>List</h1>
                <Link to={match.url}>back</Link>
            </Route>
            
            <Route exact path={`${match.url}/settings`}>
                <h1>Settings</h1>
                <Link to={match.url}>back</Link>
            </Route>

            
        </main>
    );
}