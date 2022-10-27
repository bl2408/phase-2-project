import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { epApi, epBackend } from "../../endpoints";
import { Link } from "react-router-dom";

export default function Details(){

    const { id } = useParams();

    const [details, setDetails ] = useState();

    //loads data from endpoint passing the id then loads any backend data
    useEffect(()=>{
        fetch(epApi.details(id))
        .then(res=>res.json())
        .then(data=>{

            let backendData = {};

            fetch(epBackend.items(id))
            .then(res=>res.json())
            .then(backData=>{
                backendData = backData;
            })
            .finally(()=>{
                setDetails(dets=>({...data, ...backendData}));
            });

        });

    }, []);

    return (
        <>
            {details?.name}
            <Link to={`/dash/list/${id}`}>back</Link>
        </>
    );
}