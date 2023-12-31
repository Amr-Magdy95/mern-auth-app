import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./shared/pages/Home";
import About from "./shared/pages/About";
import Signin from "./users/pages/Signin";
import Signup from "./users/pages/Signup";
import Profile from "./users/pages/Profile";
import Header from "./shared/components/Header";
import PrivateRoute from "./shared/components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
