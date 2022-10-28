import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { epApi } from "../../data/endpoints";
import { Link } from "react-router-dom";
import DetailsImage from "./details-components/DetailsImage";
import DetailsLikes from "./details-components/DetailsLikes";
import DetailsComments from "./details-components/DetailsComments";

export default function Details(){

    const { id } = useParams();

    const [details, setDetails ] = useState();

    //loads data from endpoint 
    useEffect(()=>{
        fetch(epApi.details(id))
        .then(res=>res.json())
        .then(data=>{
            setDetails(dets=>(data));
        });

    }, []);

    return (
        <>
            {!!details
                ? (
                    <>
                    {details.name} <br />
                    {details.order} <br />
                    <DetailsImage imageData={details.sprites} imageName={details.name}/> <br />
                    <DetailsLikes id={id} />
                    <DetailsComments id={id} />
                    </>
                ) 
                : "Loading"
            }
            <br />
            <Link to={`/dash/list/${id}`}>back</Link>
        </>
    );
}