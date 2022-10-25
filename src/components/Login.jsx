import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { epBackend } from "../endpoints";
import { UserContext } from "./UserContext";

export default function Login({
    state = "list",
}){

    const [formState, setFormState] = useState(state);


    return (
        <>
        
        {formState === "form" ? 
            (
                <>
                    <CreateLoginForm setFormState={setFormState} />
                    <button onClick={()=>setFormState(state=>"list")}>List</button>
                </>
            ) 
            : 
            (
                <>
                    <LoginProfileList />
                    <button onClick={()=>setFormState(state=>"form")}>Create</button>
                </>
            )
        }
        
        </>
    );
}

//create a new login
function CreateLoginForm({setFormState}){

    const userName = useRef("");

    const handleSubmit =(e)=>{
        e.preventDefault();
        
        fetch(epBackend.profiles(), {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userName.current.value,
                settings: {
                    theme: "light",
                }
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.id){
                console.log(data);
                setFormState(state=>"list");
                userName.current.value = "";
            }
        })
        
        
    };

    return (
        <>
            <h1>Create a Profile</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    ref={userName} 
                    type="text" 
                    value={userName.current.value} 
                    onChange={(e)=>userName.current.value = e.target.value}
                />
                <input type="submit" value="Create" />
            </form>
        </>
    );
}


//log in via profiles list
function LoginProfileList(){
    
    const [profileList, setProfileList] = useState([]);
    const { logUserInOut } = useContext(UserContext);
    
    useEffect(()=>{
        fetch(epBackend.profiles())
        .then(res=>res.json())
        .then(data=>{
            setProfileList(profiles=>[...data])
        })
    }, []);

    return (
        <>
            <h1>Please select a profile</h1>
            {profileList.map(({id, username, settings})=><button key={id} onClick={()=>logUserInOut({id, username, settings})}>{username}</button>)}
        </>
    );
}