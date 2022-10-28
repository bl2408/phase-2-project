import { useEffect, useState } from "react";
import { epApi } from "../../data/endpoints";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import { useMemo } from "react";

export default function List({itemsObject, setItemsObj}){

    const { section } = useParams();

    const mainEl = useRef();

    //loads api data on first mount
    useEffect(()=>{

        if(itemsObject.initLoad){
            return;
        }

        fetch(epApi.list({limit: itemsObject.limit, offset:0}))
        .then(res=>res.json())
        .then(data=>{
            setItemsObj(obj=>({
                    ...obj, 
                    initLoad: true,
                    total: data.count,
                    next: data.next,
                    items: data.results,
                    loading:false,
            }));
        });


    },[]);

    useEffect(()=>{       
        //scrolls to section if section param is in url
        if(section){
            document.querySelector(`#${section}`)?.scrollIntoView({behavior:"smooth", block: "start", inline: "nearest"});
        }
    }, []);


    const loadMore = ()=>{
        
        
        if(itemsObject.loading || itemsObject.next === null){
            return;
        }

        setItemsObj(obj=>({
            ...obj,
            loading: true,
        }));

        const url = itemsObject.next;


        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setItemsObj(obj=>({
                ...obj, 
                next: data.next,
                items: [...itemsObject.items, ...data.results],
                loading: false,
            }));

        });

    };

    const elScrollMax = (e)=>{
        let el = e;
        if(e.target){
            el = e.target;
        }

        const { clientHeight, scrollTop, scrollHeight } = el;
        
        if((clientHeight + scrollTop) >= (scrollHeight - 5) ){
            return true;
        }
        return false;
    };

    const scrollLoad =(e)=>{

        if(elScrollMax(e)){
            loadMore();
        }
    };
    

    const list = itemsObject.items.map(item=>{
        return <div id={item.name} key={item.name}><Link to={`/dash/details/${item.name}`}>{item.name}</Link></div>
    });
     

    return(
        <>
            <div ref={mainEl} onScroll={scrollLoad} style={{overflow: "auto", maxHeight: "300px"}}>
                {list}
            </div>
            Showing {itemsObject.items.length} of {itemsObject.total}.
        </>
    );
}