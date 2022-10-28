import { UserContext } from "../UserContext";
import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { epBackend } from "../../endpoints";
import DetailsCommentForm from "./DetailsCommentForm";


export default function DetailsComments({id}){

    const { loggedUser } = useContext(UserContext);
    const { appState } = useContext(AppContext);

    const [commentsObj, setCommentsObj ] = useState({id: id, comments: []});
    const [hasComments, setHasComments ] = useState(false);

    useEffect(()=>{

        if(appState.offline){
            return;
        }

        fetch(epBackend.commentsId(id))
        .then(res=>res.json())
        .then(data=>{
            if(data.id){
                setCommentsObj(c=>data);
            }
            setHasComments(bool=>!!data.id);            
        })


    }, []);

    const addComment = (obj, resetCallback)=>{
        if(appState.offline){
            return;
        }

        const commentObj = {
            username: loggedUser.username,
            ...obj
        }

        let finalCommentObj = {
            comments: [...commentsObj.comments, commentObj]
        };

        if(!hasComments){
            finalCommentObj.id=id;
        }

        //creates or updates the comments
        fetch(hasComments ? epBackend.commentsId(id) : epBackend.comments(), {
            method: hasComments ? "PUT" : "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalCommentObj)
        })
        .then(res=>res.json())
        .then(data=>{
            setCommentsObj(c=>data);
            if(!hasComments){
                setHasComments(bool=>true);
            }
            resetCallback();
        });


    };

    const commentsList = commentsObj.comments.map(({username, comment})=>{
        return (
            <div>
                <div>{username}</div>
                <div>{comment}</div>
            </div>
        )
    });


    return (
        <div>
            {commentsObj.comments.length} comment(s).
            {commentsList}
            <DetailsCommentForm addComment={addComment}/>
        </div>
    );

}