import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu/SideMenu.js";

export default function Menu() {
  return (
    <>
      <SideMenu />
      <Outlet />
    </>
  )
}