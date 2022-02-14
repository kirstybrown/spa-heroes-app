import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import React from 'react'
import { HeroCard } from '../hero/HeroCard';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {q = '' } = queryString.parse(location.search);

  const [ formValues, handleInputChange ] = useForm( {
    searchText: q,
  } );

  const { searchText } = formValues;

  const heroesFiltered = getHeroesByName(q);

  const handleSearch = (e) => {
    e.preventDefault(); 
    navigate(`?q=${ searchText }`)
  }

  return (
    <>
        <h1>Search</h1>
        <hr />

        <div className='row'>
          <div className='col-5'>
            <h4>Search</h4>
            <hr />

            <form onSubmit={ handleSearch }>
              <input 
                type='text'
                placeholder='Search for a hero'
                className='form-control'
                name='searchText'
                autoComplete='off'
                value={ searchText }
                onChange={handleInputChange}
              />


              <button
                className='btn btn-outline-primary mt-1'
                type='submit'
                onClick={ handleSearch }
              >
                Search...
              </button>
            </form>

          </div>

          <div className='col-7'>
            <h4>Results</h4>
            <hr />

            {
              (q === '')
                  ? <div className='alert alert-info'> Please enter a hero!</div>
                  : ( heroesFiltered.length === 0 )
                    && <div className='alert alert-danger'> No results for "{q}", sorry! </div>
            }

            {
              heroesFiltered.map(hero => (
                <HeroCard 
                  key={ hero.id }
                  { ...hero }
                />
              ))
            }


          </div>
        </div>
    </>
  )
}
