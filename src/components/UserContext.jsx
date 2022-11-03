import { createContext, useEffect, useState } from "react";
import { epBackend } from "../data/endpoints";

const UserContext = createContext();

function UserContextProvider({children}){
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser ] = useState({});

  //sets the logged in user to true when a user object is present in loggedUser
  useEffect(()=>{
    if(loggedUser !== null && loggedUser.username){
      setLoggedIn(bool=>true);
    }else{
      setLoggedIn(bool=>false);
    }
  }, [loggedUser]);

  //logs the user in
  const logUserInOut =(userObj)=>{
    setLoggedUser(user=>userObj);
  };

  const isFaved =(id, arr)=> arr.includes(id);

  const addToFav =(id)=>{

    fetch(epBackend.profiles(loggedUser.id),{
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...loggedUser,
        favourites: isFaved(id, loggedUser.favourites) ? loggedUser.favourites.filter(fav=> fav !== id) : [...loggedUser.favourites, id]
      })
    })
    .then(res=>res.json())
    .then(data=>{
      setLoggedUser(user=>data)
    })
    .catch(err=>console.log(err));

  };

  return(
    <UserContext.Provider value={{loggedIn, loggedUser, logUserInOut, addToFav, isFaved}}>
        {children}
    </UserContext.Provider>
  );
}

export {UserContext, UserContextProvider};