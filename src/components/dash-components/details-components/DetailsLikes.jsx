import { useState, useMemo, useContext, useEffect } from "react";
import { epBackend } from "../../../data/endpoints";
import { UserContext } from "../../UserContext";
import { AppContext } from "../../App";

export default function DetailsLikes({id}){

    const { loggedUser } = useContext(UserContext);
    const { appState } = useContext(AppContext);

    const [countObj, setCount ] = useState({id: id, users: []});
    const [isLiked, setIsLiked ] = useState(false);
    const [hasDb, setHasDb ] = useState(false);

    const checkLiked = (arr)=> arr.includes(loggedUser.id);

    //checks if backend has likes for specific ID, will set a default if false
    useEffect(()=>{

        if(appState.offline){
            return;
        }

        fetch(epBackend.likesId(id))
        .then(res=>res.json())
        .then(data=>{
            if(data.id){
                setCount(c=>data);
            }
            setHasDb(bool=>!!data.id);
            setIsLiked(liked=>checkLiked(data.id ? data.users: countObj.users));
            
        })
    }, []);

    const handleLike =()=>{
        if(appState.offline){
            return;
        }

        //adds or removes the user from the from the likes array
        const likesObj = {
            users: checkLiked(countObj.users) 
                ? countObj.users.filter(user=> user !== loggedUser.id) 
                : [...countObj.users, loggedUser.id]
        }

        //add an id for the likes object if its going to be saved in db for the first time 
        if(!hasDb){
            likesObj.id=id;
        }

        //creates or updates the likes
        fetch(hasDb ? epBackend.likesId(id) : epBackend.likes(), {
            method: hasDb ? "PUT" : "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(likesObj)
        })
        .then(res=>res.json())
        .then(data=>{
            setCount(c=>data);
            setIsLiked(liked=>checkLiked(data.users));
            if(!hasDb){
                setHasDb(bool=>true);
            }
        });

        
        
    };

    return(
        <>
            <button disabled={appState.offline} onClick={handleLike}>{isLiked ? <i className="fa fa-heart	"></i> : <i className="fa fa-heart-o"></i>}</button> 
            &nbsp;{countObj.users.length} {countObj.users.length === 1 ? "Like" : "Likes"}
        </>
    );

}