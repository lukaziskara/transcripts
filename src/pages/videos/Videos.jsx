import { Outlet, Link } from "react-router-dom";
import "./Videos.scss";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
import transcripts from "../../scriptsData/videoTranscripts.json";
import VideoItem from "../../components/videoItem/VideoItem";

export default function Videos() {
  console.log(transcripts);
  return (
    <div className="container">
      <div className="videos">
        {transcripts.map((item) => (
          <div className="">
            <VideoItem item={item} />
          </div>
        ))}
      </div>
      {/* <Header /> */}
      {/* <div className="">
        <Link className="page-button" to="/about-idea">
          იდეის შესახებ
        </Link>
      </div> */}
      {/* <div className="">
        <Link className="page-button" to="/game">
          თამაში
        </Link>
      </div>
      <div className="">
        <Link className="page-button" to="/about-game">
          თამაშის შესახებ
        </Link>
      </div> */}
      {/* <Footer /> */}
    </div>
  );
}
