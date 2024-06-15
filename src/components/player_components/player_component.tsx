// components/Player.js
import React from 'react';
import Quiz from './quiz_component';
import ReactPlayer from 'react-player'

const PlayerComponent = ({ item}: { item: any }) => {

    console.log("what is the items", item);
    if (item == null) {
        return null;
    }
    if (item.mode === 'video') {
        return (
            <div className="h-full w-full relative">
                <ReactPlayer onEnded={() => {
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
