import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';

function App() {
  return(

  <BrowserRouter>
  <Routes>
  <Route path="/" element={<EditorPage />} />
  <Route path="/review" element={<ReviewPage />} />
  <Route path="/log-in" element={<Login/>} />
  <Route path="/sign-up" element={<SignUp/>} />
  

  </Routes>
  </BrowserRouter>
  )
  
}


export default App;
