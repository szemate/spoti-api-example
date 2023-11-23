import React from "react";
import { useNavigate } from "react-router-dom";


// import PlaylistTracksFilterModal from "../dialogs/PlaylistTracksFilterModal";

function PlaylistTracksScreen() {
  const navigate = useNavigate();

  if (!localStorage.getItem("access_token")) {
    return navigate("/");
  }
    
  return (
    <div className=" bg-orange-200 grow">
      <h2>PlaylistTracksScreen</h2>
     
    </div>
  );
}

export default PlaylistTracksScreen;
