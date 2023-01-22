import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faStar } from '@fortawesome/free-solid-svg-icons'; 

function Movie({ props }){
  const StarBackground = styled.div`
    position: absolute;
    width: 100%;
    overflow: hidden;
    color: #cdcdcd;
  `
  const StarReal = styled.div`
    position: absolute;
    width: ${props.rating / 10 * 100}%;
    overflow: hidden;
    white-space: nowrap;
  `
  return (
    <div>
      <img 
        style={{display: "block", margin: "0 auto", borderRadius: "7px", width: "100%"}} 
        src={props.medium_cover_image} 
        alt={props.title}
        className="moviePoster" />
      <p style={{fontSize: "14pt", fontWeight: "bold", padding: "13px 0 2px 0"}}>{props.title.length > 22 ? `${props.title.slice(0, 22)}...` : props.title}</p>
      <p style={{fontSize: "12pt", color: "grey", padding: "3.7px 0 5px 0"}}>{props.year}{props.language !== null ? ` ・ ${props.language.toUpperCase()}` : null}</p>
      <div style={{position: "relative", fontSize: "13px", width: "75px", top: "0px"}}>
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
        <p style={{fontSize: "11pt", paddingLeft: "79px", lineHeight: "10pt", fontWeight: "bold"}}>({props.rating})</p>
      </div>
    </div>
  );
}

export default Movie;