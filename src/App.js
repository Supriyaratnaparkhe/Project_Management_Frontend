import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Board from './Pages/Board/Board';
import Analytics from './Pages/Analytics/Analytics';
import Settings from './Pages/SettingsPage/Settings';
import PublicTask from './Pages/PublicTask/PublicTask';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/board/:userId' element={<Board />} />
          <Route path='/analytics/:userId' element={<Analytics />} />
          <Route path='/settings/:userId' element={<Settings />} />
          <Route path='/publicTask/:taskId' element={<PublicTask />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
