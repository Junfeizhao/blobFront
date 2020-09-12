import ReactQuill from 'react-quill';
import React from 'react';
import { Upload, message,  TreeSelect,Input,Button,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';
import  "./index.css"
import http from "../../utils/api"
// import Header from '../index/components/headerNav';
const { TextArea } = Input;

//懒加载组件
// const ReactQuill=React.lazy(()=>import('react-quill'));
// const Header =React.lazy(()=>import('../index/components/headerNav'));

const modules= {
  toolbar: {
    container: [
      [{ 'size': ['small', false, 'large', 'huge'] }], //字体设置
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //标题字号，不能设置单个字大小
      [{ 'font': [] }],                         //字体类型
      ['bold', 'italic', 'underline', 'strike'],    // 加粗 斜体 下划线 中划线
      [{ 'color': [] }, { 'background': [] }],          // 字体颜色 字体背景颜色
      [{ 'script': 'sub'}, { 'script': 'super' }],      // 上标 下标
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], // 有序列表 无序列表 左右缩进
      [{ 'align': [] }],//对齐方式
      [{ 'direction': 'rtl' }],                         // text direction
      ['link', 'image'], // a链接和图片的显示
      ['blockquote', 'code-block'],            //引用 代码块
      ['clean']            //删除    
    ]
  } 
}


interface IProps{
   
}
interface IState{
  content:any,
  treeData:any,
  classify:any
}


class Publish extends React.Component<IProps,IState>{
  
    constructor(IProps:IProps) {
      super(IProps);
      this.state = {classify:null, content:'',treeData:[]} // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
    }


   componentDidMount(){
     var data = [
      { title: '前端', value: 'a', disabled:true, children: [{ title: 'html', value: 'a1' },{ title: 'css', value: 'a2' },{ title: 'js', value: 'a3' },
      { title: 'jquery', value: 'a4' },{ title: 'vue', value: 'a5' },{ title: 'react', value: 'a6' }
    ] },
      { title: '后端端',  disabled:true, value: 'b', children: [{ title: 'java', value: 'b1' },{ title: 'php', value: 'b2' },{ title: 'python', value: 'b3' },
      { title: 'NodeJs', value: 'b4' }] },
      { title: '数据库', value: 'c',  disabled:true, children: [{ title: 'mysql', value: 'c1' },{ title: 'mongoDB', value: 'c2' }] },
      
    ]
    this.setState({
      treeData:data
    },()=>{console.log(this.state,88888888888)})
   }


   treeChange=(value:any)=>{
     this.setState({
       classify:value
     })
   }


    Upload(){
      const fileList = [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'yyy.png',
          status: 'error',
        },
      ];
      
      const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: 'picture',
        defaultFileList: [...fileList],
      };
      
      const props2 = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        listType: 'picture',
        defaultFileList: [...fileList],
        className: 'upload-list-inline',
      };

      return(
        <div>
          <Upload listType="picture" >
            <Button>
              <UploadOutlined /> Upload
            </Button>
          </Upload>
          <br />
        </div>);
    }

    getKeyWords=(e:any)=>{
      console.log(e);
    } 
   
    handleChange(value:any) {
      this.setState({ content: value })
    //   console.log(this.state['content'])
    }

    submit=()=>{
      var classify=this.state.classify;
        var content = this.state['content'];
         var title = this.refs.title['state']['value'];
        var description = this.refs.description['state']['value'];
        
        if(!title){
          message.warning({
            content:'文章标题不能少于5字!'
          })
        }
        if(!description){
          message.warning({
            content:'文章简介不能少于20字!'
          })
        }
        if(!content){
          message.warning({
            content:'文章内容不能少于100字!'
          })
        }
        if(!classify){
          message.warning({
            content:'请选择文章类目!'
          })
        }
        console.log(title,description)
        if(title&&content&&description&&classify){
          http.postRequest("/api/publish",{title:title,description:description.replace(/"/g,'\''),content:content.replace(/"/g,'\''),uid:sessionStorage.getItem('uid'),classify:this.state.classify}).then(res=>{
            // window.location.reload();
            message.success({
              content:'文章发布成功'
            })
          })
        } 
       
    }
   
    render() {
      return (
          <>
          <Header getKeyWords={this.getKeyWords}/>
          <div className="quillwrap">
             <div className="row_wrap" ><Input style={{borderRadius:'0'}} placeholder="请输入文章标题" ref="title" className="title"/>
             <TreeSelect  onChange={this.treeChange} placeholder='请选择文章类目' treeData={this.state.treeData} style={{margin:'0px 20px', width:'200px'}}/>
              <div className="btn_group"><Button>保存草稿</Button><Button onClick={this.submit}>发布文章</Button></div>
              </div>

              <div className="wp">

            
              <div className='description_wrap'>
              <label>文章简介</label>
              <TextArea ref='description' style={{borderRadius:'0'}} rows={4} className="description" />
              </div>

              <div className='content_wrap'>
              <label>文章正文</label>
           <ReactQuill  modules={modules} ref='quill' style={{borderRadius:'0'}} className="quill"
                    onChange={this.handleChange}/>
              </div>
              </div>
         
                    </div>
                    </>
      )
    }
  }

 export default Publish


