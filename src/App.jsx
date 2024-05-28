import React from "react";
import { createRouting } from "./routes";

export function RootCmp() {
  return <main>{createRouting()}</main>;
}
