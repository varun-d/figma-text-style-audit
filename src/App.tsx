import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import "./App.css";

// Main entry point for the UI
function App() {
  const [fileName, setFileName] = useState("");
  const [event, setEvent] = useState<MessageEvent | null>(null);
  // Set a wait mode here, so when we click on LONG process, the UI changes to show warning on how it's still in progress...

  useEffect(() => {
    onmessage = (event) => {
      setEvent(event);
    };
  }, []);

  console.log(event);

  function handleGetTextStyles() {
    parent.postMessage({ pluginMessage: { type: "text-styles" } }, "*");
  }

  function handleCancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

  return (
    <>
      <h2>Style Audit</h2>
      <input
        id="fileName"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button id="submit" onClick={handleGetTextStyles}>
        Get Text Styles
      </button>

      {event?.data?.pluginMessage.status === "txtStyleDone" && (
        <CSVLink data={event?.data?.pluginMessage.csvdata}>Download me</CSVLink>
      )}
      <button id="cancel" onClick={handleCancel}>
        Cancel
      </button>
      {event?.data?.pluginMessage.status === "txtStyleDone" && (
        <p>Text Styles Done!</p>
      )}
    </>
  );
}

export default App;
