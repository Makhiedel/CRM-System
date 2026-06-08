import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SideMenu from "./components/SideMenu/SideMenu"
import "./App.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
]);

export default function App() {
  return (
    <>
      <SideMenu />
      <RouterProvider router={router} />
    </>
  );
}
