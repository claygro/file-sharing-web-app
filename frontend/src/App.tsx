import Home from "./components/Home";
import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyDrive } from "./components/MyDrive";
import LayOut from "./components/LayOut";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/layout" element={<LayOut />}>
            <Route path="home" element={<Home />} />
            <Route path="mydrive" element={<MyDrive />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
