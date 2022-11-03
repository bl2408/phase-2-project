import { useEffect, useContext, useRef, useState } from "react";
import { epBackend } from "../data/endpoints";
import { UserContext } from "./UserContext";
import { AppContext } from "./App";
import { v4 as uuidv4 } from 'uuid';

export default function Login({
    state = "list",
}){

    const [viewState, setViewState] = useState(state);
    const [profileList, setProfileList] = useState([]);

    return (
        <>
        
        {viewState === "form" ? 
            (
                <div className="section-login section-flex">
                    <CreateLoginForm setViewState={setViewState} setProfileList={setProfileList}/>
                    <hr />
                    <button onClick={()=>setViewState(state=>"list")}>List</button>
                </div>
            ) 
            : 
            (
                <div className="section-login section-flex">
                    <h1>Choose a profile</h1>
                    <LoginProfileList setProfileList={setProfileList} profileList={profileList}/>
                    <hr />
                    <button onClick={()=>setViewState(state=>"form")}>Create</button>
                </div>
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
                <label htmlFor="formUsername">Username:</label>
                <input
                    id="formUsername"
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
    const { setAppState } = useContext(AppContext);

    const handleLoginClick=({id, username, settings, favourites})=>{
        setAppState(state=>({...state, theme: settings.theme}))
        logUserInOut({id, username, settings, favourites})
    }

    useEffect(()=>{

        setAppState(state=>({...state, loading:true}));

        fetch(epBackend.profiles())
        .then(res=>res.json())
        .then(data=>{
            setProfileList(profiles=>[...data]);
            setAppState(state=>({...state, offline:false, loading: false}))
        })
        .catch(err=>{
            setAppState(state=>({...state, offline:true, loading: false}))
        });

        return ()=>{};
    }, []);

    return (
        <div id="list-profiles">
            {profileList.map(({id, username, settings, favourites})=><button key={uuidv4()} onClick={()=>handleLoginClick({id, username, settings, favourites})}>{username}</button>)}
        </div>
    );
}