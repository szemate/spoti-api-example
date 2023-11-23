import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SharedPlaylistDisplay from "./SharedPlaylistDisplay";

const SharePlaylistInputBox = () => {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const arrayOfString = inputUrl.split("/");
    const playListId = arrayOfString[arrayOfString.length - 1].split("?")[0];
    navigate(`/app/playlist/{playListId}`);
  }

  return (
    <>
      <div className="form-container">
        <div className="UrlInput-container">
          <form>
            <h1>Input your playlist URL</h1>
            <div className="inputButton-container">
              <input
                type="text"
                placeholder="Playlist URL"
                onChange={(e) => setInputUrl(e.target.value)}
              />
              
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                ADD
              </button>
             
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SharePlaylistInputBox;
