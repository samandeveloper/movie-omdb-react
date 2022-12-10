//each movie poster and content on homepage
import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'

//in case the poster doesn't have image then we use the below poster
const urlPosterAlt =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'


  const Movies = () => {
    //bring the items that we want from api
    const {loading,movies} = useGlobalContext()
    const moviesSearch = movies.Search

    if(loading){
      return <div className='loading'></div>
    }
    return(
      <section className='movies'>
       
        {moviesSearch.map((movie)=>{
          const {imdbID:id,Poster:poster,Title:title,Year:year} = movie  
          return(
            <Link to={`/movies/${id}`} key={id} className='movie'>
              <article>
                <img src={poster === "N/A" ? urlPosterAlt : poster} alt={title}/>
                <div className='movie-info'>
                  <h4 className='title'>{title}</h4>
                  <p>{year}</p>
                </div>
              </article>
            </Link>
          
          )
        })}

      </section>
    )
  }

export default Movies
