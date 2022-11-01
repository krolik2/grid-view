import "./App.css";
import { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import Tiles from "./components/Tiles";
import { tilesList } from "./data/data";

export interface ITile {
  title: string;
  description: string;
  imagePath: string;
}

function App() {
  const DEFAULT_PAGE = 1;
  const DISPLAY_ITEMS_PER_PAGE = 6;

  const [data, setData] = useState<ITile[]>([]);
  const [filteredData, setFilteredData] = useState<ITile[]>([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [itemsPerPage] = useState(DISPLAY_ITEMS_PER_PAGE);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setData(tilesList);
    setFilteredData(tilesList);
  }, [tilesList]);

  const filter = (input: string) => {
    const filteredDataArray = data.filter((el) => {
      return el.title.toLowerCase().indexOf(input.toLowerCase()) !== -1;
    });
    setFilteredData(filteredDataArray);
    setCurrentPage(DEFAULT_PAGE);
  };

  return (
    <>
      <div className="App">
        <h1>Grid View</h1>
        <div className="search-bar">
          <label htmlFor="search-input">Search:</label>
          <input
            id="search-input"
            onChange={(e) => filter(e.target.value)}
          ></input>
        </div>
        {filteredData.length === 0 ? (
          <div>no results found</div>
        ) : (
          <>
            <Tiles data={currentItems} />
            <Pagination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
