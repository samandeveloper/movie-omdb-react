import React, { useState, useContext, useEffect } from 'react'

export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //states
  const [loading,setLoading] = useState(true) 
  const[movies,setMovies] = useState([])
  const[searchTerm,setSearchTerm] = useState('batman')  //by default we want to recceive some movies on homepage
  const [error, setError] = useState({ show: false, msg: '' })   //we define an object for it as default
 

  //fetch data from api--params is the parameter that represents the full url
  const fetchMovies = async(param) =>{

    setLoading(true)
    try{
      const response = await fetch(param)
      const data = await response.json()

      //Note:without the line below when we type in input search we receive an error 
      if(data.Response === 'True'){
        setMovies(data)
        setError({ show: false, msg: '' })
      }else{
        setError({ show: true, msg: data.Error })
      }

      setLoading(false)   //at the end setLoading should be false
    }
    catch(error){
      console.log(error)
      setLoading(false)  //at the end no loading should be set
    }
  }

  //the part below should be added at the end of the url
  const urlParams = `&s=${searchTerm}`
  useEffect(()=>{
    fetchMovies(`${url}${urlParams}`)
  },[urlParams])  //call it every time we want to search

  //value below is the place to call the states, setStates, functions inside{{}}
  return <AppContext.Provider value={{loading,movies,searchTerm,setSearchTerm,error}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

