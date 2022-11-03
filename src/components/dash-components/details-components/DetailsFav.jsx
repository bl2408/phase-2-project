import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { AppContext } from "../../App";

export default function DetailsFav({id}){

    const { loggedUser, isFaved, addToFav } = useContext(UserContext);
    const { appState } = useContext(AppContext);

    const checkFav = ()=>{
        if(isFaved){
            return isFaved(id, loggedUser.favourites);
        }
        return false;
    };

    return(
        <>
            <button onClick={()=>addToFav(id)}>{checkFav() ? <i className="fa fa-bookmark"></i> : <i className="fa fa-bookmark-o"></i>}</button>
        </>
    );

}