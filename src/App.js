import "./App.css";
import { Route, Routes } from "react-router-dom";

import Hall from "./screens/Hall";
import Room from "./screens/Room";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hall />} />
        <Route path="/room/:roomId" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
