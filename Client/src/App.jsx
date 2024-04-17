import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Post } from "./components/Post";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/post" element={<Post />}></Route>
    </Routes>
  );
}

export default App;
