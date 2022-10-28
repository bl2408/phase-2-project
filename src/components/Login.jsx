import { useEffect, useContext, useRef, useState } from "react";
import { epBackend } from "../data/endpoints";
import { UserContext } from "./UserContext";
import { AppContext } from "./App";

export default function Login({
    state = "list",
}){

    const [viewState, setViewState] = useState(state);
    const [profileList, setProfileList] = useState([]);

    return (
        <>
        
        {viewState === "form" ? 
            (
                <>
                    <CreateLoginForm setViewState={setViewState} setProfileList={setProfileList}/>
                    <button onClick={()=>setViewState(state=>"list")}>List</button>
                </>
            ) 
            : 
            (
                <>
                    <LoginProfileList setProfileList={setProfileList} profileList={profileList}/>
                    <button onClick={()=>setViewState(state=>"form")}>Create</button>
                </>
            )
        }
        
        </>
    );
}

//create a new login
function CreateLoginForm({setViewState, setProfileList}){

    const userName = useRef("");

    const { appState, setAppState} = useContext(AppContext);

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(userName.current.value.length <= 0){
            return ;
        }

        const userData = {
            username: userName.current.value,
            settings: {
                theme: "light",
            }
        };

        setAppState(state=>({...appState, loading:true}));
        
        fetch(epBackend.profiles(), {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.id){
                setViewState(state=>"list");
                userName.current.value = "";
            }
        })
        .catch(err=>{
            setProfileList(profiles=>[{id: -1, ...userData}]);
            setViewState(state=>"list");
        });
        
        
    };

    return (
        <>
            <h1>Create a Profile</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    ref={userName} 
                    type="text" 
                    onChange={(e)=>userName.current.value = e.target.value}
                />
                <input type="submit" value="Create" />
            </form>
        </>
    );
}


//log in via profiles list
function LoginProfileList({setProfileList, profileList}){
    
    const { logUserInOut } = useContext(UserContext);
    const { appState, setAppState} = useContext(AppContext);

    useEffect(()=>{

        setAppState(state=>({...appState, loading:true}));

        fetch(epBackend.profiles())
        .then(res=>res.json())
        .then(data=>{
            setProfileList(profiles=>[...data])
            setAppState(state=>({...appState, offline:false, loading: false}))
        })
        .catch(err=>{
            setAppState(state=>({...appState, offline:true, loading: false}))
        });

        return ()=>{};
    }, []);

    return (
        <>
            <h1>Please select a profile</h1>
            {profileList.map(({id, username, settings})=><button key={id} onClick={()=>logUserInOut({id, username, settings})}>{username}</button>)}
        </>
    );
}