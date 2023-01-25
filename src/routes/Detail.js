import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 
import langCodes, {by639_1, by639_2T, by639_2B} from 'iso-language-codes'

function Detail(){
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async() => {
    const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setMovie(json.data.movie)
    setLoading(false);
  };
  const navigate = useNavigate();
  const StarBackground = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  color: #cdcdcd;
  `;
  const StarReal = styled.div`
    position: absolute;
    width: ${movie.rating / 10 * 100}%;
    overflow: hidden;
    white-space: nowrap;
    color: #fcd303;
  `;
  const DetailDiv = styled.div`
    width: 960px;
    display: block;
    margin: 0 auto;
  `;
  useEffect(() => {getMovie();}, []);
  return (
    <div>
      {loading ? 
      <div className="loadingBG">
        <div className="loading"></div>
      </div> :
      <DetailDiv>
        <FontAwesomeIcon icon={faArrowLeft} onClick={() => {navigate(-1)}} style={{color: "#222222", position: "relative", top: "20px", left: "0", fontSize: "24pt", cursor: "pointer"}}/>
        <img src={movie.medium_cover_image} alt={movie.title} style={{borderRadius: "7px", width: "270px", display: "block", margin: "0 auto", marginTop: "70px"}}/>
        <p style={{fontSize: "24pt", fontWeight: "bold", textAlign: "center", textOverflow: "ellipsis", paddingTop: "25px"}}>{movie.title}</p>
        <div style={{display: "block", width: "100%", height: "42px", margin: "0 auto", marginTop: "10px"}}>
          <div className="detailStars" style={{position: "relative", fontSize: "24pt", width: "180px", top: "0px", left: "50%", transform: "translate(-50%, -50%)"}}>
            <StarBackground>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </StarBackground>
            <StarReal>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </StarReal>
          </div>
        </div>
        <p style={{fontSize: "18pt", textAlign: "center", paddingTop: "3px", paddingBottom: "7px"}}>Score: {movie.rating}</p>
        <p style={{fontSize: "18pt", textAlign: "center", paddingBottom: "7px"}}>Run Time:&nbsp;
          {movie.runtime === 0 ? 'Unknown' : Math.floor(movie.runtime / 60) <= 1 ? `${Math.floor(movie.runtime / 60)} Hour ` : `${Math.floor(movie.runtime / 60)} Hours `}
          {movie.runtime === 0 ? '' : movie.runtime % 60 <= 1 ? `${movie.runtime % 60} Minute` : `${movie.runtime % 60} Minutes`}</p>
        <p style={{fontSize: "18pt", textAlign: "center", paddingBottom: "7px"}}>Genres: {movie.genres.join(", ")}</p>
        <p style={{fontSize: "18pt", textAlign: "center", paddingBottom: "10px"}}>Language: {by639_1[movie.language].name}</p>
        <hr />
        <p style={{fontSize: "21pt", fontWeight: "bold", paddingTop: "10px", paddingBottom: "10px"}}>Description</p>
        <p style={{paddingTop: "10px", fontSize: "14pt", lineHeight: "17pt"}}>{movie.description_full}</p>
      </DetailDiv>
      }
    </div>
  );
}

export default Detail;