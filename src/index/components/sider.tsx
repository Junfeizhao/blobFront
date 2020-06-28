import { Menu } from 'antd';
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = (e:any) => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <MailOutlined />
              <span>前端</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="基础">
            <Menu.Item key="1">HTML</Menu.Item>
            <Menu.Item key="2">CSS</Menu.Item>
            <Menu.Item key="2">JS</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="进阶">
            <Menu.Item key="3">Jquery</Menu.Item>
            <Menu.Item key="4">React</Menu.Item>
            <Menu.Item key="4">Vue</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="后端">
          <Menu.Item key="5">JAVA</Menu.Item>
          <Menu.Item key="6">PHP</Menu.Item>
          <Menu.Item key="7">NodeJS</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <SettingOutlined />
              <span>数据库</span>
            </span>
          }
        >
          <Menu.Item key="9">Mysql</Menu.Item>
          <Menu.Item key="10">MongoDB</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default Sider