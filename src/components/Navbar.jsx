import { useContext } from "react";
import { UserContext } from "./UserContext";
import {AppContext} from "./App";

export default function Navbar (){

    const {loggedIn, loggedUser, logUserInOut} = useContext(UserContext);
    const { appState } = useContext(AppContext);

    const handleLogoutClick =()=>{
        let noCancel = true;
        if(appState.offline){
            noCancel = window.confirm("Logging out in offline mode will all lose profile data.\nAre you sure?");
        }

        if(!noCancel){
            return ;
        }

        logUserInOut({});
    };

    return (
        <nav>
            {loggedIn ? 
            (
                <>
                    Welcome {loggedUser.username}
                    <br />
                    <button onClick={handleLogoutClick}>Logout</button>
                </>
            ) : null}
            Mode: {appState.offline ? "Offline" : "Online"}
        </nav>
    );
}