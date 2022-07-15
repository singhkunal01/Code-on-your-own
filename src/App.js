import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { EditorPages } from "./pages/EditorPages";
import { Toaster } from "react-hot-toast";
import { AboutProject } from "./pages/AboutProject";
export default function App() {
  // const location = useLocation();
  return (
    <>
      {/* container for the toaster */}

      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                color: "#fff",
                backgroundColor: "#5e8de0",
              },
            },
            error: {
              style: {
                color: "#fff",
                backgroundColor: "#C62828",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#C62828",
              },
            },
          }}
        />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutProject />} />
          {/* home page */}
          <Route path="/editor/:roomId" element={<EditorPages />} />
          {/* editor page */}
        </Routes>
      </Router>
    </>
  );
}
