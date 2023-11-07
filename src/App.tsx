import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import "./App.css";

// Main entry point for the UI
function App() {
  const [count, setCount] = useState(5);
  const [fileName, setFileName] = useState("");
  const [event, setEvent] = useState<MessageEvent | null>(null);

  useEffect(() => {
    onmessage = (event) => {
      setEvent(event);
    };
  }, []);

  function handleOnChange(value: string) {
    setCount(parseInt(value));
  }

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
      <input
        id="count"
        value={count}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      <button id="submit" onClick={handleGetTextStyles}>
        Get Text Styles
      </button>

      {event && (
        <CSVLink data={event?.data?.pluginMessage}>Download me</CSVLink>
      )}
      <button id="cancel" onClick={handleCancel}>
        Cancel
      </button>
    </>
  );
}

export default App;
