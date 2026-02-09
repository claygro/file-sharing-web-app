import Home from "./components/Home";
import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyDrive } from "./components/MyDrive";
import LayOut from "./components/LayOut";
import Share from "./components/Share";
import History from "./components/History";
import Recents from "./components/Recents";
import Settings from "./components/Settings";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/layout" element={<LayOut />}>
            <Route path="home" element={<Home />} />
            <Route path="mydrive" element={<MyDrive />} />
            <Route path="share" element={<Share />} />
            <Route path="history" element={<History />} />
            <Route path="recents" element={<Recents />} />
            <Route path="setting" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
