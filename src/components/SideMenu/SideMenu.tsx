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
import type { MenuProps } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, onClick) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}
 
const items: MenuProps['items'] = [
  getItem("Список задач", "/", <DesktopOutlined />),
  getItem("Профиль", "/profile", <FileOutlined />),
];

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  function navigateHandler(url: "/" | "/profile"): void {
    navigate(url);
  }

  return (
    <Layout style={{height: '100vh', position:'fixed'}}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          onClick={({ key }) => {
            navigateHandler(key);
          }}
          items={items}
        />
      </Sider>
    </Layout>
  );
}
