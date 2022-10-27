import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { epApi } from "../../endpoints";
import { Link } from "react-router-dom";

export default function Details(){

    const { id } = useParams();

    //loads data from endpoint passing the id 
    useEffect(()=>{
        fetch(epApi.details(id))
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        });

    }, []);

    return (
        <>
            Details
            <Link to={`/dash/list/${id}`}>back</Link>
        </>
    );
}