// components/Player.js
import React, { useState } from 'react';
import Quiz from './quiz_component';
import ReactPlayer from 'react-player'
import Loader from '../helpers/Loader';

const PlayerComponent = ({ item}: { item: any }) => {
const [isLoading,setLoading]=useState(false);
    console.log("what is the items", item);
    if (item == null) {
        return null;
    }
    if (item.mode === 'video') {
        return (
            <div className="h-full w-full relative">
                <ReactPlayer style={{
                    objectFit:"cover",
                    width:"100%",
                    height:"100%",
                    top:0,
                    left: 0
                }}

                onStart={()=>{
                    console.log("On Start");
                }}
               onReady={()=>{
setLoading(true);
                    console.log("On Ready");
                }}
                onEnded={() => {
                    console.log("its ented");
                }} url={item.url} width="100%" height="100%" controls />

            </div>
        );
    }

    if (item.mode === 'quiz') {
        console.log("Item Quiz");
        console.log(item.quiz);
        return (
            <div className="h-full w-full relative bg-normal_white">
                <Quiz questions={item.quiz} />
            </div>
        );
    }

    return null;
};

export default PlayerComponent;
