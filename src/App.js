import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Post from './components/Post';
import ExcelTable from './ExcelTable';
import PDF from './components/PDF';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path= '/' element={<ExcelTable />} />
      <Route path= 'preview/:id' element={<PDF />} />
      <Route path= 'candidate' element={<Post />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
