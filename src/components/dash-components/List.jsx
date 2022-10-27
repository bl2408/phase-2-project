import { useEffect } from "react";
import { epApi } from "../../endpoints";
import { Link, useParams } from "react-router-dom";

export default function List({itemsObject, setItemsObj}){

    const { section } = useParams();

    //loads api data on first mount
    useEffect(()=>{

        let endpoint = epApi.list();

        if(itemsObject.initLoad){
            return;
        }

        fetch(endpoint)
        .then(res=>res.json())
        .then(data=>{
            setItemsObj(obj=>({
                    ...itemsObject, 
                    initLoad: true,
                    itemsTotal: data.count,
                    next: data.next,
                    items: data.results,
                }));
            console.log(data)
        });


    },[]);

    //scrolls to section if section is in url
    useEffect(()=>{

        if(section){
            document.querySelector(`#${section}`).scrollIntoView({behavior:"smooth", block: "start", inline: "nearest"});
        }

    }, []);

    const loadMore = ()=>{
        //window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

        const url = itemsObject.next;

        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setItemsObj(obj=>({
                ...itemsObject, 
                next: data.next,
                items: [...itemsObject.items, ...data.results],
            }));
        });

    };

    const list = itemsObject.items.map(item=>{
        return <div id={item.name} key={item.name}><Link to={`/dash/details/${item.name}`}>{item.name}</Link></div>
    });
     

    return(
        <>
            {list}
            Showing {itemsObject.items.length} of {itemsObject.itemsTotal}.
            <button onClick={loadMore}>Load more</button>
        </>
    );
}