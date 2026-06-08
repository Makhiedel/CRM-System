import { Button } from "antd";
import styles from "./SideMenu.module.css";

export default function SideMenu() {
  return (
    <div className={styles.sidemenucontainer}>
      <Button size="large">Список задач</Button>
      <Button size="large">Профиль</Button>
    </div>
  )
}