import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { epApi } from "../../data/endpoints";
import { Link } from "react-router-dom";
import DetailsImage from "./details-components/DetailsImage";
import DetailsLikes from "./details-components/DetailsLikes";
import DetailsComments from "./details-components/DetailsComments";
import DetailsInfo from "./details-components/DetailsInfo";
import { AppContext } from "../App";

export default function Details(){

    const { id } = useParams();

    const [details, setDetails ] = useState();

    const { appState, setAppState} = useContext(AppContext);

    //loads data from endpoint 
    useEffect(()=>{

        setAppState(state=>({...appState, loading:true}));

        fetch(epApi.details(id))
        .then(res=>res.json())
        .then(data=>{
            setDetails(dets=>(data));
            setAppState(state=>({...appState, loading:false}));
        });

    }, []);

    return (
        <div id="section-grid">
            {!!details
                ? (
                    <>
                    <h1>{details.name} #{details.order}</h1>
                    <div className="section-details">
                        <div>
                            <DetailsImage imageData={details.sprites} imageName={details.name}/>
                        </div>
                        <div>
                            <DetailsInfo data={details}/>
                            <hr />
                            <DetailsLikes id={id} />
                            <hr />
                            <DetailsComments id={id} />
                        </div>
                        
                    </div>
                    </>
                ) 
                : null
            }
            <div><Link to={`/dash/list/${id}`}><button>Back</button></Link></div>
        </div>
    );
}