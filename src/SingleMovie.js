//single page for each movie
import React, { useState, useEffect } from 'react'
//The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path> 
import { useParams, Link } from 'react-router-dom'
import { useGlobalContext } from './context'

const url = `https://www.omdbapi.com/?apikey=be3d02bf`

const SingleMovie = () => {
  const {id} = useParams()  //receive the id of each movie from API using the useParams
  const[movie,setMovie] = useState([])  //we should define a new state here to assign poster,title,year,... to this state
  const {loading,error} = useGlobalContext()

  
  useEffect(()=>{
    async function getMovies(){
      try{
        const add = `&i=${id}`
        const response = await fetch (`${url}${add}`)
        const data = await response.json()
        setMovie(data)  //assign all the data to the new state
      }catch(error){
        console.log(error)
      }
    }
    getMovies()
  },[id])

  if(loading){
    return <div className='loading'></div>
  }
  if(error.show){  //if an error exists
    return(
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to="/" className='btn'>back to movies</Link>
      </div>
    )
  }

  const {Poster:poster,Title:title,Year:year,Plot:plot} = movie
  console.log(movie)
    return(
      <section className='single-movie'>
        <img src={poster} alt={title}/>
        <div className='single-movie-info'>
          <h2>{title}</h2>
          <p>{plot}</p>
          <h4>{year}</h4>
          <Link to="/" className='btn'>back to movies</Link>
        </div>
      </section>
    )
}

export default SingleMovie
