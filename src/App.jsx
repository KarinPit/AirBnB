import React from "react";
import { createRouting } from "./routes";

export function RootCmp() {
  return (
    <div>
      <main>{createRouting()}</main>
    </div>
  );
}
