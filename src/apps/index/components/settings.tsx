import { Modal,Input,Form,DatePicker,message} from 'antd';
import { UserOutlined} from '@ant-design/icons';
import Uploader from '../components/uploader';
import React from 'react';
import http from "../../../utils/api";
import moment from 'moment';
interface IProps{
    visible:boolean,
    getChildrenValue:any
}
interface IState{
    user:any,
    visible:boolean,
    confirmLoading:boolean,
    ModalText:string,
    birthday:any
}
class Settings extends React.Component<IProps,IState> {

    constructor(IProps:IProps){
        super(IProps);
        this.state = {
            birthday:'',
            visible: false,
            confirmLoading: false,
            user:{},
            ModalText:''
          };
    }


  componentDidMount(){
      console.log('进入settings')
      var uid = sessionStorage.getItem('uid');
      if(uid){
        http.postRequest('/api/getUserInfo',{uid:sessionStorage.getItem('uid')}).then(res=>{
         
          this.setState({
            user:res.data,
            birthday:res.data.birthday
          },()=>{
              console.log(this.state.user,'settingdata')
          })
        })
      }
  };

  dateChange=(date:any,date2:String)=>{
    //  console.log(date2);
     this.setState({
       birthday:date2
     })
  }   

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      },()=>{
        this.props.getChildrenValue(this.state.visible);
      });
    }, 2000);
    var nickname = this.refs.nickname['state'].value;
    var signature = this.refs.signature['state'].value;
    var birthday = this.refs.birthday;
   console.log(birthday)
    http.postRequest('/api/basicSettings',{
      nickname:nickname,
      signature:signature,
      birthday:this.state.birthday,
      uid:sessionStorage.getItem('uid')
    }).then(res=>{
      message.success({
        content:'更新个人信息成功!'
      })
      this.setState({
        visible: false,
        confirmLoading: false,
      },()=>{
        this.props.getChildrenValue(this.state.visible);
      })
    })
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
        visible: false,
      },()=>{
        this.props.getChildrenValue(this.state.visible);
      });
   
   
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <>
        <Modal
          title="个人信息"
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p><Uploader avatarUrl={'http://jfly.xyz:80/'+this.state.user.avatar}/></p>  
          <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      // onFinish={this.onFinish}
    >
      <Form.Item
       label="账号"
       rules={[
        {
          required: true,
          message: 'Please input your Password!',
        },
      ]}
        name="account"
        >
        <Input   disabled={true} defaultValue={this.state.user?this.state.user.account:''}  prefix={<UserOutlined   className="site-form-item-icon" />}  placeholder="账号/邮箱" />
      </Form.Item>
      <Form.Item
        label="昵称"
        name="nickname"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
         ref='nickname'
          defaultValue={this.state.user?this.state.user.nickname:''}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        label="生日"
        name="birthday"
        rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
      >
       <DatePicker   onChange={this.dateChange} ref='birthday' defaultValue={moment(this.state.birthday?this.state.user.birthday:'', 'YYYY-MM-DD')} />
      </Form.Item>
      <Form.Item
        label="签名"
        name="signature"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
        ref='signature'
        defaultValue={this.state.user?this.state.user.signature:''}
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
    </Form>
      <p>注册于2000年1月31日,至今368天。累计发表文章5000,累计点赞528</p>
        </Modal>
      </>
    );
  }
}

export default Settings
