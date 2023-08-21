"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
const Provider = ({ children, session }) => {
  // note since these is a higher order function we wrap it like these
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
