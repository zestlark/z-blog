import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Blog from './pages/Blog'
import NavBar from './component/NavBar';
import Editor from './pages/Editor';
import { v4 as uuidv4 } from 'uuid';

function App() {

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/blog/" element={<Navigate to="/" />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
