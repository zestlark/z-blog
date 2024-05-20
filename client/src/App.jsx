import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import NavBar from './component/NavBar';
import Editor from './pages/Editor';
import Space from './pages/Space';
import Auth from './pages/Auth';
import { createContext, useState, useContext, useEffect } from 'react';
import NotFound from './pages/NotFound';

export const Authcontext = createContext();

function App() {
  const [authdata, setauthdata] = useState({ validuser: false });
  const [loading, setLoading] = useState(true);
  const serverurl = "https://z-blog-4h05.onrender.com"

  useEffect(() => {
    const data = localStorage.getItem('authdata');
    if (data) {
      const parsedData = JSON.parse(data);
      if (parsedData.validuser) {
        setauthdata(parsedData);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authdata.validuser) {
      localStorage.setItem('authdata', JSON.stringify(authdata));
    }
  }, [authdata]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Authcontext.Provider value={{ authdata, setauthdata, serverurl }}>
      <BrowserRouter>
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/editor/:id" element={authdata.validuser ? <Editor /> : <Navigate to="/auth" />} />
            <Route path="/editor" element={authdata.validuser ? <Editor /> : <Navigate to="/auth" />} />
            <Route path="/blog/" element={<Navigate to="/" />} />
            <Route path="/blog/:title" element={<Blog />} />
            <Route path="/space" element={<Navigate to="/auth" />} />
            <Route path="/space/:userid" element={authdata.validuser ? <Space /> : <Navigate to="/auth" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      </BrowserRouter>
    </Authcontext.Provider>
  );
}

export default App;
