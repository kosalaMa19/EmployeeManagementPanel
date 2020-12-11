import React, { useState, useEffect } from 'react'
import axios from '../axios'
import requests from '../request';
import './row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargRow}){
    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    useEffect(() => {

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return requests;

        }
        fetchData();

    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay:1,
        },
    }

    const handleClick = (movie) => {
        console.log(movie);
        if(trailerUrl){
            console.log("FUCK YOU");
            setTrailerUrl('');
        }
        else{
            
            movieTrailer(movie?.name || "")
            .then((url) => {
                console.log("FUCK YOU");
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
                
            })
            .catch((error) => console.log(error));
        }
    }


    return(
        <div className="row">

            <h2 className="row_title">{title}</h2>



            {/* container -> posters */ }
            <div className="row_posters">

                {movies.map(movie => (
                    <img 
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargRow && "row_posterLarge"}`} 
                        key={movie.id} 
                        src={`${base_url}${isLargRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}



        </div>
    )
}

export default Row;