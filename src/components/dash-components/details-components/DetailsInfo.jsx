import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

export default function DetailsInfo({data}){
    const { base_experience, height, weight, stats} = data;

    const expandStats = stats.map(stat=>{
        const key = uuidv4();
        return (
            <Fragment key={key}>
                <div>{stat.stat.name}:</div>
                <div>{stat.base_stat}</div>
            </Fragment>
        );  
    });

    return (
        <>
            <h2>Stats:</h2>
            <div className="section-info">
                <div>Base experience:</div><div>{base_experience}</div>
                <div>Height:</div><div>{height}</div>
                <div>Weight:</div><div>{weight}</div>
                {expandStats}
            </div>
        </>
    );
}