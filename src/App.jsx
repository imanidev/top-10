import { billBoardChartData } from "./lib/data";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [albumToggle, setToggleAlbum] = useState(false);

  useEffect(() => {
    const getBillBoardData = () => {
      setData(() => [...billBoardChartData]);
      // const response = await fetch("website.com/api")
      // const returnedData = response.json()
      // setData(returnedData)
    };

    getBillBoardData();
  }, []);

  function handleAlbumToggle() {
    setToggleAlbum((prevVal) => !prevVal);
  }

  return (
    <main>
      <h1>Top 10 Songs</h1>
      <section className="songs-section">
        <div>
          <FilterAlbumsButton
            onClick={handleAlbumToggle}
            albumViewIsFiltered={albumToggle}
          />
        </div>
        <BillBoardData songs={data} albumViewFiltered={albumToggle} />
      </section>
    </main>
  );
}

function FilterAlbumsButton({ onClick, albumViewIsFiltered }) {
  return (
    <button onClick={onClick}>
      {albumViewIsFiltered ? "View All Albums" : "View Available Albums"}
    </button>
  );
}

function BillBoardData({ songs, albumViewFiltered }) {
  if (albumViewFiltered) {
    return (
      <div className="song-grid">
        {songs
          .filter((song) => song.albumAvailable === true)
          .map((song) => (
            <div key={song.id}>
              <div>
                <img
                  src={song.imgSrc}
                  alt={song.title}
                  style={{ maxWidth: "300px", height: "300px" }}
                />
              </div>
              <h2>
                {song.title} | <span>{song.releaseDate}</span>
              </h2>

              <h3>{song.album}</h3>

              <div>
                <p>
                  Artists: <span>{song.artists.join(", ")}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="song-grid">
      {songs.map((song) => (
        <div key={song.id}>
          <div>
            <img
              src={song.imgSrc}
              alt={song.title}
              style={{ width: "300px", height: "300px" }}
            />
          </div>
          <h2>
            {song.title} | <span>{song.releaseDate}</span>
          </h2>

          <h3>{song.album}</h3>

          <div>
            <p>
              Artists: <span>{song.artists.join(", ")}</span>
            </p>
          </div>
        </div>
      ))}
      <footer>Imani Roberts &copy; 2024 </footer>
    </div>
  );
}

export default Home;
