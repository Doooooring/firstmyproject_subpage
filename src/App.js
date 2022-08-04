import './App.css'
import { useState, useRef } from 'react'
import axios from 'axios'
import LinkList from './linklist.js'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Page1 from './page1.js'
import Page2 from './page2.js'
import Page3 from './page3.js'
import Page4 from './page4.js'
import Header from './header.js'

function App() {
  const [currentPage, handleCurrentPage] = useState('page1')
  return (
    <BrowserRouter className="App">
      <Header currentPage={currentPage} handleCurrentPage={handleCurrentPage} />
      <Routes className="total-container">
        <Route
          exact
          path="/"
          element={<Page1 handleCurrentPage={handleCurrentPage} />}
        ></Route>
        <Route
          path="/page2"
          element={<Page2 handleCurrentPage={handleCurrentPage} />}
        ></Route>
        <Route
          path="/page3"
          element={<Page3 handleCurrentPage={handleCurrentPage} />}
        ></Route>
        <Route
          path="/page4"
          element={<Page4 handleCurrentPage={handleCurrentPage} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
