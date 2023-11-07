import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import "./App.css";

// const csvData = [
//   ["firstname", "lastname", "email"],
//   ["John", "Doe", "john.doe@xyz.com"],
//   ["Jane", "Doe", "jane.doe@xyz.com"],
// ];

// const csvData2 = [
//   { firstname: "Varun", lastname: "Dee", email: "VA@gmail.com" },
//   { firstname: "Varun", lastname: "Dee", email: "VA@gmail.com" },
//   { firstname: "Varun", lastname: "Dee", email: "VA@gmail.com" },
// ];

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

  function handleSubmit() {
    parent.postMessage(
      { pluginMessage: { type: "submit", fileName, count } },
      "*"
    );
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
      <button id="submit" onClick={handleSubmit}>
        Submit
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
