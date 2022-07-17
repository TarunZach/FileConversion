import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import PDF from "./components/PDF";
import Post from "./components/Post";
// import PptDemo from "./components/PptDemo";
import { UserContext } from "./components/UserContext";
import PdfDemo from "./components/PdfDemo";
import { useState } from "react";
// import ContextTest from "./components/ContextTest";
export default function App() {
  const [value, setValue] = useState();
  // const Context = React.createContext()
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Header />
          <UserContext.Provider value={[value, setValue]}>
            <Routes>
              <Route path="/" element={<FileUpload />} />
              <Route path="preview/:id" element={<PDF />} />
              <Route path="candidate" element={<Post />} />
              {/* <Route path="pptdemo" element={<PptDemo />} /> */}
              {/* <Route path="ctest" element={<ContextTest />} /> */}
              <Route path="pdfdemo" element={<PdfDemo />} />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}
