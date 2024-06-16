// components/Player.js
import React, { useState } from 'react';
import Quiz from './quiz_component';
import ReactPlayer from 'react-player'
import Loader from '../helpers/Loader';

const PlayerComponent = ({ modules, item, moduleId }: { modules: any, item: any, moduleId: any }) => {
    const [isLoading, setLoading] = useState(false);
    console.log("what is the items", item, moduleId);
    if (item == null) {
        return null;
    }
    if (item.moduleItemDetails&&item.moduleItemDetails.length!=0&&item.moduleItemDetails[0].mode=="video") {
        return (
            <div className="h-full w-full relative">
                <ReactPlayer style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0
                }}

                    onStart={() => {
                        console.log("On Start");
                    }}
                    onReady={() => {
                        setLoading(true);
                        console.log("On Ready");
                    }}
                    onEnded={() => {
                        //first need to fetch the current module using modules id 
                        //then need to check extra moudle items there or not 
                        //if there need to pass that moduleItem data into function params
                        // no there need to go for the next modules with first module item
                        console.log("its ented");
                    }} url={item.moduleItemDetails[0].url} width="100%" height="100%" controls />

            </div>
        );
    }

    if (!item?.moduleItemDetails&&item.mode=="quiz") {
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
