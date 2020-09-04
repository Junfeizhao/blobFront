import './index.less';
import React from "react";
import { BackTop ,Affix} from 'antd';
import { createHashHistory } from 'history'; // 是hash路由 history路由 自己根据需求来定
import Article from './components/article';
import Sider from './components/sider';
import Themeselector from './components/themeselector';
import http from "../../utils/api";
import Header from './components/headerNav';
const history = createHashHistory();

interface IProps {
 style:any,
 nickname:"",
 avatar:""
}
interface IState {
  current: number,
  user:any,
  alive:boolean,
  visible:boolean,
  classify:any,
  keyWords:any
}


class Login extends React.Component<IProps,IState> {

  constructor(props:IProps) {
    super(props);
    this.state = {
      keyWords:null,
      visible:false,
      alive:false,
      current: 1,
      user:null,
      classify:'a1'
    }
  }
  
  componentDidMount(){

    this.getInfo()
     
  };

  getKeyWords=(e:any)=>{
    console.log(e);
    this.setState({
      keyWords:e,
      classify:null
    })
  }


  getInfo=()=>{
    var uid = sessionStorage.getItem('uid');
    if(uid){
      http.postRequest('/api/getUserInfo',{uid:sessionStorage.getItem('uid')}).then(res=>{
        console.log(res.data,'4444')
        this.setState({
          user:res.data,
          alive:true
        })
      })
    }
  }


  render() {
    return (
      <>
       <Header getKeyWords={this.getKeyWords}/>
        <div id="wrap">
        <div id="left">
        <Affix style={{ position: 'absolute', top: 0, left: 0 }}>
          <div id="siderwrap">
          <Sider getClassify={(classify:any)=>{
            this.setState({
              classify:classify,
              keyWords:null
            },()=>{
              console.log(this.state.classify)
            })
        }} />
          </div>
        </Affix>
          
        </div>
        <div id="con">
        <BackTop/>
        < div >
        {<Article key={this.state.classify||this.state.keyWords} classify={this.state.classify} keyWords={this.state.keyWords}/>}
           
        </div>
          <Themeselector/>
        </div>
     </div>
      </>
    
    
    );
  }
}

export default Login;

