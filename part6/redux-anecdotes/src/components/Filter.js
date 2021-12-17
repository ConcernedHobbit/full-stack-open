import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(filterChange(filter))
  }

  return (
    <div className='filter-container'>
      <label htmlFor='filter'>filter</label>
      <input name='filter' onChange={handleChange} />
    </div>
  )
}

export default Filter