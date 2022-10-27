import { useState, useMemo, useContext, useEffect } from "react";
import { epBackend } from "../../endpoints";
import { UserContext } from "../UserContext";

export default function DetailsLikes({id}){

    const { loggedUser } = useContext(UserContext);
    const [countObj, setCount ] = useState({id: id, users: []});
    const [isLiked, setIsLiked ] = useState(false);
    const [hasDb, setHasDb ] = useState(false);

    const checkLiked = (arr)=> arr.includes(loggedUser.id);

    useEffect(()=>{
        fetch(epBackend.likesId(id))
        .then(res=>res.json())
        .then(data=>{
            if(data.id){
                setCount(c=>data);
            }
            setHasDb(bool=>!!data.id);
            console.log(hasDb)
            setIsLiked(liked=>checkLiked(data.id ? data.users: countObj.users));
            
        })
    }, []);

    const handleLike =()=>{
        if(loggedUser.id < 0){
            return;
        }

        const likesObj = {
            users: checkLiked(countObj.users) 
                ? countObj.users.filter(user=> user !== loggedUser.id) 
                : [...countObj.users, loggedUser.id]
        }
        if(!hasDb){
            console.log("checl", hasDb)
            likesObj.id=id;
        }

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
            <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}: </button> : {countObj.users.length}
        </>
    );

}