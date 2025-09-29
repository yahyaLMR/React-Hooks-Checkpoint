import { useState } from "react";
import Card from "./card";
import { ratingfilter, titlefilter } from "./filter";
import moviesArray from "./moviesarray"

export default function Movies() {
  const [data, setData] = useState({
    id: 5,
    title: "",
    description: "",
    rating: "",
    imgLink: "",
  });

  const [movies, setMovies] = useState(moviesArray);
  const [btndisplay, setbtndisplay] = useState("block");
  const [inputdisplay, setinputdisplay] = useState("none");
  const [search, setsearch] = useState([]);
  const movieslist = movies.map((movie) => {
    return (
      <Card
        key={movie.id}
        title={movie.title}
        description={movie.description}
        rating={movie.rating}
        imgLink={movie.imgLink}
        handelDelete={() => {
          handelDelete(movie.id);
        }}
      />
    );
  });
  let searchlist = search.map((movie) => {
    return (
      <Card
        key={movie.id}
        title={movie.title}
        description={movie.description}
        rating={movie.rating}
        imgLink={movie.imgLink}
        handelDelete={() => {
          handelDelete(movie.id);
        }}
      />
    );
  });
  function handelDelete(id) {
    setMovies(
      movies.filter((movie) => {
        if (movie.id != id) {
          return movie;
        }
      })
    );
    setsearch(
      search.filter((emovie) => {
        if (emovie.id != id) {
          return emovie;
        }
      })
    );
  }
  return (
    <>
      <button
        onClick={() => {
          setinputdisplay("flex");
          setbtndisplay("none");
        }}
        className="add"
        style={{ display: btndisplay }}
      >
        add a movie
      </button>
      <div style={{ position: "absolute", top: "10px", right: "100px",display:'flex',flexDirection:'column' }}>
        <input
          onChange={(e) => {
            setsearch(titlefilter(movies, e));
          }}
          type="text"
          placeholder="search"
        />
        <label style={{margin:'10px'}} htmlFor="">
          Rating:
          <select onChange={(e)=>{setsearch(ratingfilter(movies,e))}} name="" id="rating">
            <option value="all">ALL</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
      </div>
      <div
        style={{
          width: "300px",
          position: "relative",
          display: inputdisplay,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "orange",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <button
          onClick={() => {
            setinputdisplay("none");
            setbtndisplay("block");
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            borderRadius: "50%",
            backgroundColor: "rgba(248, 47, 47, 1)",
            fontWeight: "700",
            cursor: "pointer",
            height: "30px",
            width: "30px",
            fontSize: "15px",
          }}
        >
          X
        </button>
        <h2 style={{ textAlign: "center" }}>Add a movie</h2>
        <label htmlFor="">name :</label>
        <input
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
          value={data.title}
          type="text"
        />
        <label htmlFor="">description: </label>
        <input
          onChange={(e) => {
            setData({ ...data, description: e.target.value });
          }}
          value={data.description}
          type="text"
        />
        <label htmlFor="">Rating: </label>
        <input
          onChange={(e) => {
            setData({ ...data, rating: e.target.value });
          }}
          value={data.rating}
          type="number"
          max={10}
          min={0}
          placeholder="0-10"
        />
        <label htmlFor="">Poster URL: </label>
        <input
          onChange={(e) => {
            setData({ ...data, imgLink: e.target.value });
          }}
          value={data.imgLink}
          type="text"
        />
        <button
          className="add"
          onClick={() => {
            if (data.description && data.imgLink && data.imgLink) {
              setData({ ...data, id: data.id + 1 });
              setMovies([...movies, data]);
              setData((c) => {
                return { ...c, title: "", description: "", imgLink: "" };
              });
            }
          }}
        >
          ADD
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin:'40px 0 40px 0'
        }}
      >
        {search.length > 0 ? searchlist : movieslist}
      </div>
    </>
  );
}
