import React from "react"
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

interface IProps {
 
}
interface IState {
  current: number
}


class Topnav extends React.Component<IProps,IState> {

  constructor(props:IProps) {
    super(props);
    this.state = {
      current: 1
    }
  }

  handleClick =(e:any)=>{
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
    
  }
  
  componentDidMount(){
  
  };

  render() {
    return (
      <Menu onClick={this.handleClick}  mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          首页
        </Menu.Item>
        <Menu.Item key="app"  icon={<AppstoreOutlined />}>
          Downloads
        </Menu.Item>
        <SubMenu icon={<SettingOutlined />} title="web前端">
          <Menu.ItemGroup title="基础">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="进阶">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            后端
          </a>
        </Menu.Item>
        <Menu.Item key="alipay1">
          <a href="https://ant.design" target="_blank"  rel="noopener noreferrer">
            数据库
          </a>
        </Menu.Item>
        <Menu.Item key="alipay2">
          <a href="https://ant.design" target="_blank"  rel="noopener noreferrer">
            留言
          </a>
        </Menu.Item>
        <Menu.Item key="alipay3">
          <a href="https://ant.design" target="_blank"  rel="noopener noreferrer">
            登录
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Topnav;

