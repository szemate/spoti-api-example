import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import LoginScreen from "./components/screens/LoginScreen";
import MainScreen from "./components/screens/MainScreen";
import PlaylistTracksScreen from "./components/screens/PlaylistTracksScreen";

// Configure nested routes with JSX
const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/app" element={<MainScreen />} />
      <Route path="/app/playlist" element={<PlaylistTracksScreen />} />
    </>
  )
);

export default AppRouter;
