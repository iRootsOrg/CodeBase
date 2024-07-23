import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';

function App() {
<<<<<<< HEAD
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
=======
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<EditorPage />} />
        <Route path="/r" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> 4d0a6912ac57e8d6d2878725f15886f784b4d9aa
  
}


export default App;
