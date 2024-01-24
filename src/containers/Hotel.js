import React, { Component } from 'react';
import {useParams} from 'react-router-dom';


function Hotel ()
{
    const {id} = useParams();


    // fetch 

    return (
        <h1>{id}</h1>
    );
    
}



export default Hotel;