import React from "react";
import SpeechRecognition, {
    useSpeechRecognition
} from "react-speech-recognition";

const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Ritu Speak here... {listening ? "on" : "off"}</p>
            <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <br />
            <br />
            {/* <p>{transcript}</p> */}
            <input type="text" value={transcript} />
        </div>
    );
};
export default Dictaphone;
