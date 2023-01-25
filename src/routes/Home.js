import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styled from "styled-components";
import './Loading.css';
import './Inputs.css';
import './Movie.css'
import { Link } from "react-router-dom";
import logo from '../logo.png';

function Home(){
  const MovieUL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 100px;
  `;
  const MovieLI = styled.li`
    list-style: none;
    margin: 40px 20px;
    width: 15%;
  `;
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [stars, setStars] = useState(8);
  const [sortby, setSort] = useState("rating")
  const star = (event) => {
    setStars(event.target.value);
  }
  const sort = (event) => {
    setSort(event.target.value);
    console.log(event.target.value);
  }
  const getMovies = async() => {
    const response = 
    stars >= 9.0 ?
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=${sortby}}&limit=50`) :
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=${stars}&sort_by=${sortby}&limit=50`);
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  }
  useEffect(() => {getMovies();}, [stars, sortby]);
  return (
    <div>
      {loading ?
        <div className="loadingBG">
          <div className="loading"></div>
        </div> : 
        <div>
          <img src={logo} alt="logo" className="logo" />
          <div className="starWrap">
            <span style={{fontSize: "28pt", paddingRight: "5px"}}>Minimum Rating:&nbsp;</span>
            <span className="star">
              ★★★★★
              <span style={{width: `${stars * 10}%`}}>
                ★★★★★
              </span>
              <input type="range" onChange={e => star(e)} value="1" step="1" min="0" max="10" />
            </span>
            <span style={{fontSize: "43pt", paddingLeft: "1.5rem"}}>{stars}</span>
          </div>
          <form className="sortBy">
            <label><input name="sort" type="radio" value="rating" onClick={e => sort(e)} defaultChecked/>Sort by rate</label>
            <label><input name="sort" type="radio" value="year" onClick={e => sort(e)}/>Sort by year</label>
          </form>
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
        </div>
      }
    </div>
  );
}

export default Home;