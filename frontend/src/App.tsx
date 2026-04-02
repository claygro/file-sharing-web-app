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
import { FileRetriveProvider } from "./context/fileRetriveContext";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SharePopUp from "./components/SharePopUp";
function App() {
  return (
    <>
      <Router>
        <FileRetriveProvider>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/layout" element={<LayOut />}>
              <Route index element={<Home />} />

              <Route path="mydrive" element={<MyDrive />} />
              <Route path="share" element={<Share />} />
              <Route path="history" element={<History />} />
              <Route path="recents" element={<Recents />} />
              <Route path="setting" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="shareUrl" element={<SharePopUp />} />
            </Route>
          </Routes>
        </FileRetriveProvider>
      </Router>
    </>
  );
}

export default App;
