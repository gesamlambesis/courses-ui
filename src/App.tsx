import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Courses from './pages/Courses'
import Students from './pages/Students'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Courses />} />
          <Route path="students" element={<Students />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
