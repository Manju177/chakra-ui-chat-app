import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage"
import ChatProvider from './Context/ChatProvider';

function App() {

  return (
    <div className="App">
 
      <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
        </ChatProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
