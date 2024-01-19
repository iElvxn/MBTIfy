import { useEffect, useRef } from "react";

function ThinkFeel({songs, isLoading, setIsLoading, mbti}) {
    let thinkingLevel = useRef();
    let feelingLevel = useRef();

    useEffect(() => {
        analyzeThinking();
    }, [])

    const analyzeThinking = () => {
        let thinkingCounter = 0;
        let feelingCounter = 0;

        for(let i = 0; i < songs.length; i++) {
            if(songs[i].valenceRatio >= .6) {
                feelingCounter++;
            }
            if(songs[i].genreRatio >= .6) {
                thinkingCounter++;
            }
        }
        
        thinkingLevel.current = thinkingCounter/(thinkingCounter + feelingCounter);
        feelingLevel.current = feelingCounter/(thinkingCounter + feelingCounter);
        const stringArray = mbti.current.split('');
        if(thinkingLevel.current > feelingLevel.current) {
            stringArray[2] = 'T';
        } else {
            stringArray[2] = 'F';
        }
        mbti.current = stringArray.join('');
    }
    return (
        <>
        {!isLoading ?
            <div className="mbti-container" id="think-feel-container" style={{backgroundColor: "#C1E1C1"}}>
                {(thinkingLevel.current > feelingLevel.current) ?
                <>
                    <h1 className="header">You are Thinking</h1>
                    <div className="bar">
                        <div className="bar-inner" style={{width: `${thinkingLevel.current * 100}%`, backgroundColor: "#7A8E7A", color: "#C1E1C1"}}>{Math.round(thinkingLevel.current * 100)}%</div>
                    </div>
                </>
                    :
                <>
                    <h1 className="header">You are Feeling</h1>
                    <div className="bar">
                        <div className="bar-inner" style={{width: `${feelingLevel.current * 100}%`, backgroundColor: "#7A8E7A", color: "#C1E1C1"}}>{Math.round(feelingLevel.current * 100)}%</div>
                    </div>
                </>
                }
                {thinkingLevel.current ?
                    <p className="sub-text">Thinking individuals tend to have playlists organized by genre, or technical aspects of music, while feeling individuals might create playlists based on emotional connection, or sentimental value of songs.</p>
                :
                    <p className="sub-text">Not enough data.</p>
                }
                
            </div>
        : null

        }
        </>
    )
}

export default ThinkFeel;