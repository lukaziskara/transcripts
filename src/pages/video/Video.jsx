import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Video.scss";
// import YoutubeTranscript from "youtube-transcript";

import lexicon from "../../scriptsData/lexicon.json";
import transcripts from "../../scriptsData/videoTranscripts.json";

import Game from "../../components/Game";
import YouTube from "react-youtube";

export default function Video(props) {
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(300);
  const [isStarted, setIsStarted] = useState(false);
  const [newGame, setNewGame] = useState(0);
  const [searchWord, setSearchWord] = useState();

  const { id } = useParams();
  const inputRef = useRef();
  const videoData = transcripts.find((el) => el.id == id);
  const { title, lines } = videoData;
  const [click, setClick] = useState(0);
  const searchedWords = useMemo(() =>
    lexicon.filter((wordData) =>
      wordData.theWord.toString().includes(searchWord)
    )
  );

  console.log(searchedWords);
  const videoUrl = videoData.videoUrl;
  console.log(videoData, lines);
  // YoutubeTranscript.fetchTranscript(videoData).then(console.log);
  const wordsToChoose = useMemo(() => {
    console.log(lines, startTime, endTime);
    const choicedLines = lines.filter(
      (line) => startTime <= line.time && line.time < endTime
    );
    console.log(choicedLines, "choicedLines");
    const wordsTemp = choicedLines
      .map((line) =>
        line.line
          .toLowerCase()
          .replace(",", "")
          .replace(".", "")
          .replace('"', "")
          .replace('"', "")
          .replace("(", "")
          .replace(")", "")
          .replace(":", "")
          .replace("?", "")
          .split(" ")
      )
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index);
    return wordsTemp.map((word) => ({
      theWord: word,
    }));
  }, [startTime, endTime]);

  console.log(wordsToChoose);
  function clickHandler(index) {
    // console.log("test", wordsToChoose[index], click, index);
    if (wordsToChoose[index].selected) {
      // console.log("wordsToChoose[index], ", click, index);
      wordsToChoose[index].selected = false;
    } else {
      // console.log("false", wordsToChoose[index], click, index);
      wordsToChoose[index].selected = true;
    }
    // console.log("test2", wordsToChoose[index], click, index);

    setClick(click + 1);
    // console.log(wordsToChoose[index], click, index);
  }
  const wordsForGame = useMemo(() => {
    const chosenWords = wordsToChoose.filter((word) => word.selected);
    return chosenWords.map((word) =>
      lexicon.find((wordData) => word.theWord == wordData.theWord)
    );
  }, [newGame]);
  // console.log(wordsForGame, wordsForGame);
  // console.log("start", startTime);
  // console.log("end", endTime);
  function timeToSeconds(time) {
    const arr = time.split(":");
    let seconds = 0;
    for (let i = 0; i < arr.length; i++) {
      const power = arr.length - i - 1;
      seconds += Number(arr[i]) * 60 ** power;
    }
    return seconds;
  }
  function handleSubmit() {
    const timeInterval = inputRef.current.value;
    console.log(inputRef.current.value);
    setStartTime(timeToSeconds(timeInterval.split("-")[0]));
    setEndTime(timeToSeconds(timeInterval.split("-")[1]));
  }
  return (
    <div className="video">
      <div className="">
        <h1>{videoData.title}</h1>
      </div>
      <div className="sets">
        <div className="langar">
          <div className="choose-panel">
            <div className="time-choose">
              <input
                defaultValue="00:00:00-00:05:00"
                className="input-interval"
                ref={inputRef}
              />
              <input
                type="submit"
                className="input-interval"
                onClick={() => {
                  handleSubmit();
                }}
              />
            </div>
            <div className="">{wordsToChoose.length} სიტყვა</div>
          </div>
          <div className="words">
            {wordsToChoose.map((word, index) => (
              <div
                className={word.selected ? "word selected" : "word"}
                onClick={() => {
                  clickHandler(index);
                }}
              >
                <div className="">{word.theWord}</div>
              </div>
            ))}
          </div>
          <div className="start-button">
            <button
              onClick={() => {
                if (!isStarted) setNewGame(newGame + 1);
                setIsStarted(!isStarted);
              }}
            >
              დაწყება
            </button>
          </div>
        </div>
        {isStarted ? <Game wordsForGame={wordsForGame} /> : null}
      </div>
      <div className="video-palyer">
        {/* <video controls="true"> */}
        {/* <YouTube src="ZG9F22nBKFY13Pfk" /> */}
        <iframe
          width="891"
          height="501"
          src={videoUrl}
          // src="https://www.youtube.com/embed/zOBzNmM9ylw"
          // title='#12 Walter Block   -  Author of "Defending The Undefendable", Loyola University Professor'
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        {/* <source src={videoUrl} type="video/mp4" /> */}
        {/* </video> */}
      </div>
      <input
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <div className="">
        {searchedWords.map((searchedWord) => (
          <div className="">
            {searchedWord.theWord}-{searchedWord.wTranslation}
          </div>
        ))}
      </div>
      {/* <div className="lexicon">
        {words.map((word, index) => (
          <div
            className={word.selected ? "word selected" : "word"}
            onClick={() => {
              clickHandler(index);
            }}
          >
            <div className="">
              {word.theWord}-{word.wTranslation}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
