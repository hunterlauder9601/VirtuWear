"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Craft Your Style, Visualize in 3D - Your Perfect Outfit Awaits!")
          .pauseFor(2000)
          .deleteAll()
          .typeString("Interactive Fashion Technology")
          .pauseFor(2000)
          .start();
      }}
    />
  );
};

export default TypewriterTitle;