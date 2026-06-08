import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./SideMenu.module.css";

export default function SideMenu() {
  const navigate = useNavigate();
  
  function navigateHandler(url:"/"|"/profile"):void {
    navigate(url);
  }

  return (
    <div className={styles.sidemenucontainer}>
      <Button className={styles.buttons} size="large" onClick={()=>navigateHandler("/")}>Список задач</Button>
      <Button className={styles.buttons} size="large" onClick={()=>navigateHandler("/profile")}>Профиль</Button>
    </div>
  )
}