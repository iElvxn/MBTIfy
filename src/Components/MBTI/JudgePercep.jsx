import { useEffect, useRef } from "react";

function JudgePercep({songs, isLoading, setIsLoading, mbti}) {
    let judgingLevel = useRef();
    let perceptionLevel = useRef();

    useEffect(() => {
        analyzeJudging();
    }, [])

    const analyzeJudging = () => {
        let judgingCounter = 0;
        for(let i = 0; i < songs.length; i++) {
            if(songs[i].valenceRatio >= .7 || songs[i].energyRatio >= .7 || songs[i].genreRatio >= .7) {
                judgingCounter++;
            }
        }
        judgingLevel.current = judgingCounter/songs.length;
        perceptionLevel.current = 1 - (judgingCounter/songs.length);
        console.log("Judging LeveL: " + judgingLevel.current);

        const stringArray = mbti.current.split('');
        if(judgingLevel.current > perceptionLevel.current) {
            stringArray[3] = 'J';
        } else {
            stringArray[3] = 'P';
        }
        mbti.current = stringArray.join('');
    }
    return (
        <>
        {!isLoading ?
            <div className="mbti-container" id="judge-perception-container" style={{backgroundColor: "#e0d6ff"}}>
                {(judgingLevel.current > perceptionLevel.current) ?
                <>
                    <h1 className="header">You are Judging</h1>
                    <div className="bar">
                        <div className="bar-inner" style={{width: `${judgingLevel.current * 100}%`, backgroundColor: "#8A849E", color: "#e0d6ff"}}>{Math.round(judgingLevel.current * 100)}%</div>
                    </div>
                </>
                    :
                <>
                    <h1 className="header">You are Perceiving</h1>
                    <div className="bar">
                        <div className="bar-inner" style={{width: `${perceptionLevel.current * 100}%`, backgroundColor: "#8A849E", color: "#e0d6ff"}}>{Math.round(perceptionLevel.current * 100)}%</div>
                    </div>
                </>
                }
                <p className="sub-text">Judging individuals might have neatly curated playlists with a specific theme or purpose such as genres or mood. Whereas, Perceiving individuals might have more spontaneous playlists with diverse genres or moods.</p>
            </div>
        : null

        }
        </>
    )
}
export default JudgePercep;