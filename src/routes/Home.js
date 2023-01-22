import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styled from "styled-components";
import './Movie.css';
import { Link } from "react-router-dom";

function Home(){
  const MovieUL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 100px;
  `;
  const MovieLI = styled.li`
    list-style: none;
    margin: 40px 20px;
    width: 15%;
  `;
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [stars, setStars] = useState(9.0);
  const star = (event) => {
    setStars(event.target.value);
  }
  const getMovies = async() => {
    const response = 
    stars >= 9.0 ?
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year&limit=50`) :
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=${stars}&sort_by=year&limit=50`);
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {getMovies();}, [stars]);
  return (
    <div>
      {loading ?
        <div className="loadingBG">
          <div className="loading"></div>
        </div> : 
        <div>
          <input type="range" min="0" max="10" step="0.5" defaultValue={stars} onChange={e => star(e)}/>
          <span>{stars}</span>
          <h1>up to {stars} stars!</h1>
          <MovieUL>
            {movies.map((movie) => (
              movie.rating >= stars ?
              <MovieLI>
                <Link to={`movie/${movie.id}`} style={{textDecoration: "none", color:"black"}}>
                  <Movie key={movie.id} props={movie}/>
                </Link>
              </MovieLI>
              : null
            ))}
          </MovieUL>
          <footer style={{backgroundColor: "#151515", width: "100%", height: "250px"}}>

          </footer>
        </div>
      }
    </div>
  );
}

export default Home;