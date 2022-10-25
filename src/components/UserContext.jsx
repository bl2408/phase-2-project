import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserContextProvider({children}){
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser ] = useState({});

  //sets the logged in user to true when a user object is present in loggedUser
  useEffect(()=>{
    if(loggedUser !== null && loggedUser.username){
      setLoggedIn(true);
    }else{
      setLoggedIn(false);
    }
  }, [loggedUser]);

  //logs the user in
  const logUserInOut =(userObj)=>{
    setLoggedUser(user=>userObj);
  };

  return(
    <UserContext.Provider value={{loggedIn, loggedUser, logUserInOut}}>
        {children}
    </UserContext.Provider>
  );
}

export {UserContext, UserContextProvider};