import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(){
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async() => {
    const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setMovie(json.data.movie)
    setLoading(false);
  }
  useEffect(() => {getMovie();}, []);
  return (
    <div>
      {loading ? 
      <div className="loadingBG">
        <div className="loading"></div>
      </div> :
      <div>
        <img src={movie.medium_cover_image} alt={movie.title} />
        <h1>{movie.title}</h1>
        <p>Genres: {movie.genres.join(", ")}</p>
        <p>Description: {movie.description_intro}</p>
      </div>
      }
    </div>
  );
}

export default Detail;