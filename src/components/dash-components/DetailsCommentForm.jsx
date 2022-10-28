import { useRef, useContext } from "react";
import { AppContext } from "../App";


export default function DetailsCommentForm({addComment}){

    const textareaRef = useRef();
    const { appState } = useContext(AppContext);

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(textareaRef.current.value.length <= 0 || appState.offline){
            return;
        }

        addComment(
            {
                comment: textareaRef.current.value,
            },
            ()=>textareaRef.current.value = ""
        );

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea ref={textareaRef} disabled={appState.offline}></textarea>
                <input type="submit" value="Submit" disabled={appState.offline}/>
            </form>
        </div>
    );

}