import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { runSmoke } from "./smoke.mjs";

function App() {
  const [status, setStatus] = useState("running");
  useEffect(() => {
    runSmoke().then((results) => {
      window.__SMOKE_RESULTS__ = results;
      setStatus(JSON.stringify(results));
    });
  }, []);
  return <pre id="status">{status}</pre>;
}

createRoot(document.getElementById("root")).render(<App />);
