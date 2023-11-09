import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import "./App.css";

// Main entry point for the UI
function App() {
  const [event, setEvent] = useState<MessageEvent | null>(null);

  // Future: This isn't easy due to single threaded Figma Plugin ... the UI should change to show "in progress" UI.
  useEffect(() => {
    onmessage = (event) => {
      setEvent(event);
    };
  }, []);

  // console.log(event);

  function handleGetTextStyles() {
    parent.postMessage({ pluginMessage: { type: "text-styles" } }, "*");
  }

  function handleCancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

  // Set Status and other Event variables here on useEffect re-renders
  const status = event?.data?.pluginMessage.status;
  const textNodesLength = event?.data?.pluginMessage.length;
  const randomVal = new Date().getUTCMilliseconds();
  const csvFilename = `text_style_audit_${randomVal}.csv`;

  return (
    <>
      <h2>Text Styles Audit</h2>
      {status === "txtStyleLength" && (
        <>
          <p>You have {textNodesLength} text nodes.</p>
          <p>
            The export may take upto a minute if you have more than 10,000 text
            nodes.
          </p>
        </>
      )}
      <button
        id="submit"
        onClick={handleGetTextStyles}
        disabled={status === "txtStyleDone" ? true : false}
      >
        Generate Text Styles CSV
      </button>

      {status === "txtStyleDone" && (
        <button className="downloadcsv">
          <CSVLink
            data={event?.data?.pluginMessage.csvdata}
            filename={csvFilename}
          >
            Download CSV
          </CSVLink>
        </button>
      )}
      <br></br>
      <button className="cancelbtn" id="cancel" onClick={handleCancel}>
        Close
      </button>
    </>
  );
}

export default App;
