"use client";

import React from "react";
import { ConfiguratorProvider } from "@/contexts/Customization";
import Customizer from "./Customizer";

type Props = {};

const page = (props: Props) => {
  return (
    <ConfiguratorProvider>
      <Customizer/>
    </ConfiguratorProvider>
  );
};

export default page;
