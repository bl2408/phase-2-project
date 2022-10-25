import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Navbar (){

    const {loggedIn, loggedUser, logUserInOut} = useContext(UserContext);

    return (
        <nav>
            {loggedIn ? 
            (
                <>
                    Welcome {loggedUser.username}
                    <br />
                    <button onClick={()=>logUserInOut({})}>Logout</button>
                </>
            ) : null}
        </nav>
    );
}