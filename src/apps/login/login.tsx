import React from "react"
import { Form, Input, Button, Checkbox, message } from 'antd';
import http from "../../utils/api";
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { createHashHistory } from 'history'; // 是hash路由 history路由 自己根据需求来定
import './login.css';
const history = createHashHistory();


class  NormalLoginForm  extends React.Component{
  constructor(Iprops:any){
    super(Iprops);
  }

 

  
  onFinish=(values:any)=>{
    console.log('Received values of form: ', values);
    http.postRequest("/api/login",values).then(res=>{
      console.log(res)
        if(res.status.code=="0"){
          message.success({
            content:'登录成功！欢迎'
          })
          sessionStorage.setItem("uid",res.data.id);    
          history.push('/');
        }else if(res.status.code==500){
          message.error({
            content:'账号不存在!'
          })
      
        }
        else if(res.status.code==501){
          message.error({
            content:'密码错误!'
          })
      
        }
      
    })

  };
  

  render(){
    
  return (
    <div className='login__wrap'>
<Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="account"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input  prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="账号/邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox >记住账号</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit"  className="login-form-button">
          登录
        </Button>
        Or <a href="/register"><Link to="/register">去注册</Link></a>
      </Form.Item>
    </Form>
    </div>
    
  );
  }





} 


export default NormalLoginForm
