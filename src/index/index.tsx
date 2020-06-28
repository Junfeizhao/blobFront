import React from "react";
import { BackTop } from 'antd';
import './index.scss';
import Topnav from "./components/topnav";
import ArticleList from './components/articelist';
import Sider from './components/sider'

interface IProps {
 
}
interface IState {
  current: number
}


class Login extends React.Component<IProps,IState> {

  constructor(props:IProps) {
    super(props);
    this.state = {
      current: 1
    }
  }
  
  componentDidMount(){
  
  };

  render() {
    return (
      <div>
    
        <Topnav/>
     <div id="wrap">
        
        <div id="left">
          <Sider/>
        </div>
        <div id="con">
        <BackTop />
          <ArticleList/>
        </div>
        <div id="right"></div>
     </div>
      </div>
    
    
    );
  }
}

export default Login;

