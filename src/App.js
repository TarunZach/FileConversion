import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import PDF from "./components/PDF";
import Post from "./components/Post";
export default function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="preview/:id" element={<PDF />} />
            <Route path="candidate" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
