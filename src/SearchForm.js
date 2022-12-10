//each movie seperate page
import React from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {
  const{searchTerm,setSearchTerm,error} = useGlobalContext()
  const handleChange = (e) =>{
    return setSearchTerm(e.target.value) 
  }
  return (
    <form className='search-form' onSubmit={(e)=>e.preventDefault()}>
      <h2>seach movies</h2>
      <input type='text' className='form-input' value={searchTerm} onChange={handleChange}/>
      {error.show && <div className='error'>{error.msg}</div>}
    </form>
  )
}

export default SearchForm
