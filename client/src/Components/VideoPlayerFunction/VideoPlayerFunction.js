import React, { useEffect } from "react";
import { Cloudinary } from "cloudinary-core";
import "cloudinary-video-player/dist/cld-video-player.light.min";
import "cloudinary-video-player/dist/cld-video-player.light.min.css";

function VideoPlayerFunction(props) {
  const cloudinary = new Cloudinary({
    cloud_name: props.options.cloudName,
    secure: true,
  });
  const videoPlayerInit = () => {
    cloudinary.videoPlayer(document.querySelector(".fn-video"), {
      publicId: props.options.public_id,
      fluid: true,
      controls: true,
      preload: "auto",
      mute: true,
      autoplay: false,
    });
  };

  useEffect(() => {
    return videoPlayerInit(), [];
  });
  return (
    <>
      <video className="fn-video" />
    </>
  );
}

export default VideoPlayerFunction;
