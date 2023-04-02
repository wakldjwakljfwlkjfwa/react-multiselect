import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  const options = Array.from(Array(10)).map((_, index) => ({
    value: `item ${index}`,
    label: `item ${index}`,
  }));

  const [selectedItems, setSelectedItems] = useState([]);
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = () => {
    // Make http requests here
    console.log(selectedItems);
    setTimeout(() => {
      setFetchedData(selectedItems);
    }, 1000);
  };

  useEffect(() => {
    if (shouldFetchData) fetchData();
    setShouldFetchData(false);
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ccc",
      }}
    >
      <div>request: {fetchedData.join(", ")}</div>
      <Select
        options={options}
        isMulti
        closeMenuOnSelect={false}
        onMenuClose={() => {
          // Fetch data when the options list is closed
          fetchData();
        }}
        onChange={(newValue, actionMeta) => {
          setSelectedItems(newValue.map((e) => e.value));

          // Only fetch data when items are removed
          setShouldFetchData(
            actionMeta.action === "clear" ||
              actionMeta.action === "remove-value"
          );
        }}
      />
    </div>
  );
}

export default App;
