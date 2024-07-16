import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditorPage from './pages/EditorPage.jsx';
import ReviewPage from './pages/ReviewPage.jsx';

function App() {
  return(

  <BrowserRouter>
  <Routes>
  <Route path="/" element={<EditorPage />} />
  <Route path="/review" element={<ReviewPage />} />

  </Routes>
  </BrowserRouter>
  )
  
}


export default App;
