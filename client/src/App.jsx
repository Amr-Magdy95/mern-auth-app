import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./shared/pages/Home";
import About from "./shared/pages/About";
import Signin from "./users/pages/Signin";
import Signup from "./users/pages/Signup";
import Profile from "./users/pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
