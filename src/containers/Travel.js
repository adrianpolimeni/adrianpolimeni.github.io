import React from 'react';
import {useParams} from 'react-router-dom';


function Travel ()
{
    const {id} = useParams();


    // fetch 

    return (
        <h1>{id}</h1>
    );
    
}



export default Travel;