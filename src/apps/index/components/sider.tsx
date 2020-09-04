import { Menu } from 'antd';
import React from 'react';
import http from "../../../utils/api";
import { AppstoreOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;

interface IProps{

 getClassify:any
}
interface IState{
  current: number,
  after:{
    key:any,
    title:any,
    children:any
  }
  front:object,
  sql:object,
  stu:object
}



class Sider extends React.Component<IProps,IState>{  
  constructor(props:IProps) {
    super(props);
    this.state = {
      current: 1,
      front:{},
      after:{key:"",title:"",children:""},
      sql:{},
      stu:{name:"1"}
    }
    console.log("aaa")
  }
  
  handleClick = (e:any) => {
    console.log('click ', e);
    this.props.getClassify(e.key);
  };

  
    demo:any;

//  async function demo(){

//  }

   getSubMenu=(silderData:any)=>{
    // var silderData =this.state["after"];
   
    var children = silderData["children"];
    if(!children){
      return null;
    }
    // console.log(2222222222,silderData,children)
   var submenu ;
   if(children.length>1){
        
   submenu= children.map((item1:any,index1:any)=>
   <Menu.ItemGroup key={item1.key}  title={item1.title}>
     {
       item1.itemGroup.map((item2:any,index2:any)=>
       <Menu.Item key={item2.key}>{item2.con}</Menu.Item>
     ) 
     }
   </Menu.ItemGroup>
 )
   }else{
     submenu=children.itemGroup.map((item:any,index:any)=>
   <Menu.Item key={item.key}>{item.con}</Menu.Item>
       ) 
       
 
   }
  
      return   <SubMenu key={silderData.key} icon={<AppstoreOutlined />} title={silderData.title}>{submenu}</SubMenu>
  }

  componentDidMount(){
      
         //加载silder 侧边导航 //按模块
         http.getRequest("/api/silder").then(res=>{
           console.log(JSON.parse(res.data.value),4747)
          
          
           this.setState({
            front:JSON.parse(res.data.value).front,
             after: JSON.parse(res.data.value).after,
             sql:JSON.parse(res.data.value).sql
           })
          console.log(this.state.after,9999999)
         })
    
  }

  render() {
     var submenu=
       {
       key:"front",title:"前端",children:[
         {key:"1",title:"基础",itemGroup:[{key:"1-1",con:"HTML"},{key:"1-2",con:"CSS"},{key:"1-3",con:"JS"}]},
         {key:"2",title:"进阶",itemGroup:[{key:"2-1",con:"Jquery"},{key:"2-2",con:"VUE"},{key:"2-3",con:"REACT"}]},
       ]
     }
      // console.log(this.state.data,4545)
    
    
    return (
      <Menu
      className="sider"
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['a1']}
        defaultOpenKeys={['front','after','sql']}
        mode="inline"
      >
        {this.getSubMenu(this.state["front"])}
        {this.getSubMenu(this.state["after"])}
        {this.getSubMenu(this.state["sql"])}
      
      </Menu>
    );
  }
}

export default Sider