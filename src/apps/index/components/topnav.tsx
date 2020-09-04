import React from "react"
import { Menu } from 'antd';
import { CloudDownloadOutlined, AppstoreOutlined, RobotOutlined,HomeOutlined,} from '@ant-design/icons';
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
      <Menu onClick={this.handleClick}  className="topnav"  mode="horizontal">
        <Menu.Item key="mail" icon={<HomeOutlined />}>
          首页
        </Menu.Item>
        <Menu.Item key="app"  icon={<AppstoreOutlined />}>
         面试题专区
        </Menu.Item>
        <SubMenu icon={<CloudDownloadOutlined />} title="基础类库">
        
            <Menu.Item key="setting:3">组件库</Menu.Item>
            <Menu.Item key="setting:4">方法库</Menu.Item>
          
        </SubMenu>
        <Menu.Item key="alipay" icon={<RobotOutlined />}>
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            前端工具
          </a>
        </Menu.Item>
        {/* <Menu.Item key="alipay1">
          <a href="https://ant.design" target="_blank"  rel="noopener noreferrer">
            网络协议/安全
          </a>
        </Menu.Item>
       */}
      </Menu>
    );
  }
}

export default Topnav;

