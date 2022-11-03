export default function DetailsImage({imageData, imageName}){

    //main image
    const { front_default:main } = imageData.other["official-artwork"];

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

        const altString = `${imageName}${(pose !=="none" ? ` | ${pose}` : "")}`;

        return <img 
            key={url} 
            src={url} 
            alt={altString} 
        />
    }); //final image JSX array

    return (
        <div className="section-image">
            <div>
                <img src={main} alt={`${imageName} | official art`} />
            </div>
            <div>
                {extraImgs}
            </div>
            
        </div>
    );
}