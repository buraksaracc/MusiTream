import React from "react";
import AudioList from "./AudioList";
import AudioProvider from "./AudioProvider";

export function MEDIA(props) {
  return (
    <AudioProvider>
      <AudioList navigation={props.navigation} />
    </AudioProvider>
  );
}
