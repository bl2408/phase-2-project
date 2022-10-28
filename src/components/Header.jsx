import { useContext } from "react";
import { UserContext } from "./UserContext";
import {AppContext, defaultAppState} from "./App";
import { useRef } from "react";

export default function Header (){

    const {loggedIn, loggedUser, logUserInOut} = useContext(UserContext);
    const { appState, setAppState } = useContext(AppContext);
    const toggleRef = useRef();

    const handleLogoutClick =()=>{
        let noCancel = true;
        if(appState.offline){
            noCancel = window.confirm("Logging out in offline mode will all lose profile data.\nAre you sure?");
        }

        if(!noCancel){
            return ;
        }
        setAppState(defaultAppState);
        logUserInOut({});
    };

    const toggleTheme =()=>{
        const mode = toggleRef.current.checked ? "dark" : "light";
        setAppState(state=> ({...state, theme: mode}));
    };

    return (
        <header>

            <div className="mode">Mode: {appState.offline ? "Offline" : "Online"}</div>
            {loggedIn ?
                <div className="user-section">
                    <div className="welcome">
                        Welcome {loggedUser.username}
                    </div>
                    <div>
                        <input checked={appState.theme === "dark"} type="checkbox" ref={toggleRef} onClick={toggleTheme}/>
                    </div>
                    <div className="logout">
                        <button onClick={handleLogoutClick}>Logout</button>
                    </div>
                </div>
            : null
            }
            
            
        </header>
    );
}