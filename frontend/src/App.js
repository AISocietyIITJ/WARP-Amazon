import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Prompt from "./pages/Prompt";
import About from "./pages/About"
// import Output from "./pages/Output"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/output" element={<Output />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
