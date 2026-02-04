import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HeroSection from "./pages/Home";
import AnonymousLogin from "./pages/Login";
import SafeRoutePlanner from "./pages/RoutePlanner";
import RateRoute from "./pages/Ratings";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("anon_user");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <Routes>
      {/* Public Home Page */}
      <Route path="/" element={<HeroSection />} />

      {/* Route Rating Page */}
<Route
  path="/ratings"
  element={
    <div className="full-width-page">
      <RateRoute />
    </div>
  }
/>

      {/* Signup / Anonymous Login */}
      <Route
        path="/signup"
        element={<AnonymousLogin user={user} onLogin={setUser} />}
      />

      <Route
        path="/planner"
        element={user ? <SafeRoutePlanner  /> : <Navigate to="/signup" />}
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
