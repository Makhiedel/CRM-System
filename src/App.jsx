import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Menu from "./pages/Menu"
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
    ]
  },
]);

export default function App() {
  return (
      <RouterProvider router={router} />
  );
}
