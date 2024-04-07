import React from 'react'
import  {Routes, Route } from 'react-router-dom'
import Create from './Create'
import Read from './Read'
import Update from './Update'

const AllRouts = () => {
  return (
    <div>
      <Routes>
          <Route path='/add' element={<Create/>}/>
          <Route path='/read' element={<Read/>}/>
          <Route path='/edit/:id' element={<Update/>}/>
      </Routes>
    </div>
  )
}

export default AllRouts