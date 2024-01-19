import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
