import { useEffect, useState } from 'react'
import axios from 'axios'
import { MDBCol, MDBIcon } from 'mdbreact'
import PageNavbar from '../common/PageNavbar'

const urlPosters = 'http://image.tmdb.org/t/p/original/'

const SearchMovie = () => {

  const [movies, setMovies] = useState([])
  const [updatedMovies, setUpdatedMovies] = useState([])
  const [query, setQuery] = useState('')
  const [titleSearch, setTitleSearch] = useState('')
  // filteredMovies


  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(`/api/movies/${query}/`) // add the search (mango)
        setMovies(data)
        // console.log(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getMovies()
  }, [query])

  console.log('****movies***', movies)


  const handleChange = (e) => {
    console.log(e)
    setQuery(e.target.value)
  }


  return (
    <>
      <PageNavbar />

      <MDBCol md="6">
        <form className="form-inline mt-4 mb-4">
          <MDBIcon icon="search" />
          <input
            className="form-control form-control-sm ml-3 w-75"
            onChange={handleChange}
            type="text"
            placeholder="Search for a Movie"
            value={query}
            aria-label="Search" />
        </form>
      </MDBCol>

      {/* 
      <div className="search-movie">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search for a Movie"
          value={query}
        /> */}

      {/* {movies && movies.map(movie =>
          <p key={movie.id}>{movie.title}</p>
        )} */}

      {movies && movies.map(movie => {
        const { id, poster_path: posterPath, title } = movie
        return (
          <>
            <div key={id}>
              <p>{title}</p>
              < img className="poster"
                src={`${urlPosters}${posterPath}`}
                // key={`${id}`}
                alt={title} />
            </div>
          </>
        )
      })}
    </>
  )
}

export default SearchMovie