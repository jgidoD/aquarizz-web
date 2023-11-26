import "./App.css";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import { Routes, Route, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthContexts";
import { ChakraProvider } from "@chakra-ui/react";
import ProtectedRoutes from "./components/ProtectRoutes/ProtectedRoutes";
import { AuthContextProvider } from "./context/AuthContext";
import UserProfile from "./components/userProfile/UserProfile";
function App() {
  return (
    // <AuthProvider>
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route path="/profile/:userId" component={UserProfile} />
        </Routes>
      </AuthContextProvider>
    </div>

    // </AuthProvider>
  );
}

export default App;
