import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function DetailsImage({imageData, imageName}){

    //main image
    const { front_default:main } = imageData.other["official-artwork"];

    const [mainImage, setMainImage ] = useState(main);
    const [allImages, setAllImages] = useState([]);

    useEffect(()=>{
        //small images obtained by filtering
        const extraImgs = Object.values(imageData)
        .filter(data=>typeof data === 'string') // finds only strings and removes nested objects
        .filter(data=> !data.includes('shiny')) // removes shinies
        .map(data=>{ //creates an object that assigns it a gender and position
            let gender = "male";
            let pose = "front";

            if(data.includes("female")){
                gender=  "female";
            }

            if(data.includes("back")){
                pose = "back";
            }

            return {url: data, gender, pose};
        })
        .sort((a, b)=>{ //sort by gender
            if(a.gender > b.gender){
                return -1;
            }
            if(a.gender < b.gender){
                return 1;
            }
            return 0;
        })
        .map(({url, pose})=>{
            return url
        });

        setAllImages(imgs=>[main, ...extraImgs])
    },[]);

    

    return (
        <div className="section-image">
            <div style={{height: "300px", width: "100%", display:"flex", justifyContent:"center"}}>
                <img style={{maxHeight: "100%", maxWidth:"100%"}} src={mainImage} alt={`${imageName} | official art`} />
            </div>
            <div>
                {allImages.map((i)=>{
                    return <img style={{maxHeight:"50px", maxWidth:"100%"}} key={uuid()} src={i} onClick={()=>setMainImage(img=>i)}/>
                })}
            </div>
            
        </div>
    );
}