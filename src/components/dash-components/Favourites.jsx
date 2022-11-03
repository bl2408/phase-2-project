import { useContext, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Favourites(){

    const {loggedIn, loggedUser} = useContext(UserContext);

    const { section } = useParams();

    const mainEl = useRef();

    useEffect(()=>{       
        //scrolls to section if section param is in url
        if(section){
            document.querySelector(`#${section}`)?.scrollIntoView({ block: "start", inline: "nearest"});
        }
    }, []);

    const list = loggedIn ? loggedUser.favourites.map(item=>{
        return <div className="list-item" id={item} key={item}><Link to={{pathname:`/dash/details/${item}`, state: { from: "favourites" }}}>{item}</Link></div>
    }) : null;
     

    return(
        <div id="section-grid">
            <h1>Favourites list</h1>
            <div ref={mainEl}>
                {list}
            </div>
            <div>
                {loggedUser.favourites.length} total favourites.
                <br />
                <br />
                <Link to={`/dash`}><button>Back</button></Link>
            </div>
        </div>
    );
}