import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";

export default function DetailsFav({id}){

    const { loggedUser, isFaved, addToFav } = useContext(UserContext);

    const [isFav, setIsFav ] = useState(false);
    
    const checkFav = ()=>loggedUser ? isFaved(id, loggedUser.favourites) : false;
    
    useEffect(()=>{
        setIsFav(fav => checkFav());
    }, [loggedUser.favourites]);

    const handleToggleFav =()=>{
        addToFav(id)
    };


    return(
        <>
            <button onClick={handleToggleFav}>{isFav ? <i className="fa fa-bookmark"></i> : <i className="fa fa-bookmark-o"></i>}</button>
        </>
    );

}