import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "./SideMenu.module.css";
// import Sider from "antd/es/layout/Sider.js";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [getItem("Список задач", "1",  <DesktopOutlined />)];

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function navigateHandler(url: "/" | "/profile"): void {
    navigate(url);
  }

  return (
    <>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu items={items} />
        </Sider>
      </Layout>

      <div className={styles.sidemenucontainer}>
        <Button
          className={styles.buttons}
          size="large"
          onClick={() => navigateHandler("/")}
        >
          Список задач
        </Button>
        <Button
          className={styles.buttons}
          size="large"
          onClick={() => navigateHandler("/profile")}
        >
          Профиль
        </Button>
      </div>
    </>
  );
}
