import React from "react";
import {Input,Menu,Dropdown ,Badge,Avatar } from 'antd';
import http from "../../../utils/api";
import Btngroup from '../components/btngroup';
import { createHashHistory} from 'history'; // 是hash路由 history路由 自己根据需求来定
import Topnav from "../components/topnav";
import Settings from '../components/settings';
import { SearchOutlined,DownOutlined} from '@ant-design/icons';
const history = createHashHistory();

interface IProps{
  getKeyWords:any
}
interface IState{
    user:any,
    alive:boolean,
    visible:boolean
}
export default class Header extends React.Component<IProps,IState>{

      constructor(IProps:IProps){
            super(IProps);
            this.state={
                user:null,
                alive:false,
                visible:false
            }
      }


      componentDidMount(){
        this.getInfo();
          
       };
     
       getInfo=()=>{
         var uid = sessionStorage.getItem('uid');
         if(uid){
           http.postRequest('/api/getUserInfo',{uid:sessionStorage.getItem('uid')}).then(res=>{
             console.log(res.data,'4444')
             if(res.data.length!=0){
               this.setState({
                 user:res.data,
                 alive:true
               })
             }
           })
         }
       }

       search=(e:any)=>{
        
         if(e.keyCode===13){
          var value = this.refs.input['state'].value;
          console.log(typeof value);
          if(!value) return;
           console.log('按了回车键');
           this.props.getKeyWords(value);
         }
       }

       getChildrenValue=(val:any)=>{
        console.log('children',val)
        this.setState({
          visible:val
        },()=>{
          this.getInfo()
        })
      }

       userInfo=()=>{
        var user = this.state.user;
        var base = 'http://39.101.203.37/';//'http://localhost:8025/';
        var userAvatar = base +user.avatar;
        console.log(user,'user3333')
        const onClick = (e:any) => {
          if(e.key==="logout"){
            http.postRequest('/api/removeUserInfo',{uid:sessionStorage.getItem('uid')}).then(res=>{
              sessionStorage.removeItem("uid");
              this.setState({
                user:null
              })
            })
          }
          if(e.key==="publish"){
            history.push('/publish');
          }
          if(e.key==="settings"){
           this.setState({
             visible:true
           })
          }
         
        };
        const menu = (
          <Menu onClick={onClick}>
            <Menu.Item key="message">消息通知</Menu.Item>
            <Menu.Item key="publish">发表文章</Menu.Item>
            <Menu.Item key="settings">个人设置</Menu.Item>
            <Menu.Item key="resetpassword">修改密码</Menu.Item>
            <Menu.Item key="logout">退出登录</Menu.Item>
          </Menu>
        );
         
       return (
         <div>
         <span style={{marginRight:"10px"}}>
           {user.nickname}
         </span>
          <span className="avatar-item">
  
          <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      <Badge count={1}>
          <Avatar shape="square" src={userAvatar} />
        </Badge><DownOutlined />
      </a>
    </Dropdown>
        </span>
         </div>
       )
     
      
    }

      public render(){
          return (
        <div id="header">
         <div className="header_left">
                   <h2>
                     <a href="#">
                       <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt=""/>
                       JFlyHak
                     </a>
                   </h2>
         </div>
         <div className="header_con">
           <div className="searchwrap">
                 <span>{<SearchOutlined />}</span>
                 <Input ref='input' placeholder="在全网搜索" onKeyUp={this.search}/>
           </div>
           <div className="topnavwrap">
               <Topnav/>
           </div>
        </div>
        <div className="header_right" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
         {this.state.user?this.userInfo():<Btngroup/>}
        </div>
        <Settings visible={this.state.visible} getChildrenValue={this.getChildrenValue}/>
        </div>
          )
      }
}