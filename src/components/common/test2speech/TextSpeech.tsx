import React, {useEffect, useState} from "react";

type test2speechProps = {
  text: string
  voiceIndex: number
}

/**
 * TS Doc Info
 * @component textSpeech
 */
export function TextSpeech({text, voiceIndex = 0}: test2speechProps): React.ReactElement {

  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>();
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
  console.log(voices)

    setUtterance(u);
    setVoice(voices[voiceIndex]);

    return () => {
      synth.cancel();
    };
  }, [text, voiceIndex]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    if (!utterance)
      return
    utterance.voice = voice;

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  )
}
