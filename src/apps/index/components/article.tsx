import { List, Avatar, Space, } from 'antd';
import './style/quill.snow.css';
import React from "react";
import http from "../../../utils/api";

interface Iprops{
   classify:string,
   keyWords:any
}
interface IState{
  artList:[{title:any,description:any,avatar:any,href:any,content:any,stars:any,likes:any,nickname:any,createTime:any}],
  haveData:boolean,
  view:number,   //0list 1文章详情
  baseSrc:string,
  detail:any
}

 function IconText (props:any){
    //  console.log(props)
    return(
        <Space>
             {React.createElement(props.icon)}
        {props.text}
       </Space>
    )  
}

class ArticleLise extends React.Component<Iprops,IState>{
    constructor(Iprops:Iprops){
        super(Iprops)
        this.state={
          detail:{},
          baseSrc:'http://jfly.xyz:80/',//http://localhost:3000/
          view:0,
          haveData:false,
          artList:[{content:"",avatar:"",description:"",title:"",href:"",stars:"",likes:"",nickname:'',createTime:''}]
        }
    }

    componentDidMount(){
      console.log(this.props,'进入组件了');
      if(this.props.classify){
        http.postRequest("/api/getAllArticle",{classify:this.props.classify}).then(res=>{
          console.log(res,888)
          this.setState({
           artList:res.data,
           haveData:true
         })
        })
      }else{
        http.postRequest("/api/searchArticle",{keyWords:this.props.keyWords}).then(res=>{
          // console.log(res,9991)
          this.setState({
           artList:res.data,
           haveData:true
         },()=>{
          //  console.log(this.state)
         })
        })
      }
  
    
    }

    


    list=()=>{
      if(!this.state.haveData){
        return null
      }
    
          return (
               <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          // console.log(page);
        },
        pageSize: 12,
      }}
      dataSource={this.state.artList}
      // footer={
      //   <div>
      //     <b>翻页</b> 查看更多
      //   </div>
      // }
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
          <span key='1'>上传时间:{item.createTime}</span>,
          <span key='2'>作者:{item.nickname}</span>
          ]}
        >
  
          <List.Item.Meta
            avatar={<Avatar src={this.state.baseSrc+item.avatar} />}
            title={<a  href={item.href}>{item.title}</a>}
            description={<a onClick={this.toDetail.bind(this,item)} style={{textDecoration:'underline'}}> {item.description}</a>}
          />
        </List.Item>
      )}
    />
          )
    }


    detail=()=>{
      return (
        <div id="detail">
           <List.Item
        key={this.state.detail.title}
        // actions={[
        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        // ]}
      >
        <List.Item.Meta
       avatar={<Avatar src={this.state.baseSrc+this.state.detail.avatar} />}
       title={<a  href={this.state.detail.title}>{this.state.detail.title}</a>}
       description={this.state.detail.description}
        />
      
        
      </List.Item>
      <div id="con_wrap" style={{}}  dangerouslySetInnerHTML = {{ __html: this.state.detail.content }}>
        
      </div>
        </div>
      )
    }

    toDetail=(item:any)=>{
      console.log(item);
      var detail = item;
      http.postRequest('/api/articleDetail',{aid:item.id}).then(res=>{
        detail.content=res.data.content;
        this.setState({
          detail,
          view:1
        },()=>{
          console.log(this.state.detail,888888888888);
        })
      })
     
     
    }

    render() {
      return(
        <>
        {this.state.view===0?this.list():this.detail()}
        </>
      )
  
      
       
    }
}

export default  ArticleLise




