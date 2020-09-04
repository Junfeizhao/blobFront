import './register.css'
import http from "../../utils/api"
import React, { useState } from 'react';
import { createHashHistory } from 'history'; // 是hash路由 history路由 自己根据需求来定
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';




const history = createHashHistory();
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
var rcode:any=null;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};




  
function validateEmail (e:any) {
  // 邮箱验证正则
  var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
  return reg.test(e);
}


interface IProps{

}
interface IState{
count:number
}

class Demo extends React.Component<IProps,IState>{
  constructor(props:IProps){
    super(props);
    this.state={
      count:1
    }
  }
  
  
  dw=()=>{
     var value = document.getElementById("email")?.getAttribute("value");
     console.log(value,666666)
    if(!validateEmail(value)){
      console.log('邮箱格式错误')
     message.error({
       content:'邮箱格式错误!'
     })
     return
    }

      http.postRequest("/api/getCode",{receiver:value}).then(res=>{
      rcode=res.data.code;
     })

    //更新按钮状态
    this.setState({
      count:30
    })		
    var timer = setInterval(()=>{
         if(this.state.count<=1){
            clearInterval(timer);
         }
    this.setState({
      count:this.state.count-1
    },()=>{
      console.log(this.state.count)
    })
    
    },1000)
  }
  
  componentDidMount(){
    console.log('组件完成了');
    
  }
  
  render(){
    return (<Button disabled={this.state.count<=1?false:true} onClick={this.dw}>{this.state.count<=1?'获取验证码':this.state.count+"s后重新获取"}</Button>)
  }
}



const RegistrationForm = () => {
  const [count,setCount] = useState(1);
  const [form] = Form.useForm();
  const onFinish = (values:any) => {
    // console.log('Received values of form: ', values);
    http.postRequest("/api/register",values).then(({status}) =>{
      console.log(status)
      if(status.code===500){
        alert('邮箱已被注册!');
        return 
      }
      message.success({
        content:'注册成功,欢迎登录!'
      })
      history.push('/login')

      
    })
  };





  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value:any) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      var array:any =['.com', '.org', '.net'];
      setAutoCompleteResult(array.map((domain:any) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));
  return (
    <div className="register__wrap">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '邮箱格式不正确!',
          },
          {
            required: true,
            message: '请输入邮箱!',
          },
        ]}
      >
        <Input id="email"/>
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '青再次输入密码进行确认!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('输入的两次密码不一样!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            昵称&nbsp;
            <Tooltip title="你想别人怎么称呼你?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: '请输入昵称!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

   

      <Form.Item label="验证" extra="我们必须要确定你不是机器人">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle 
              validateTrigger="onChange"
              rules={[
                {
                  validator:(_, value) => (value==rcode && value!="") ? Promise.resolve() : Promise.reject(''),
                  required: true,
                  message: '请输入正确的验证码',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} id="codeBtn">
             <Demo/>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('请勾选接受协议'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已经阅读了 <a href="">协议</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default RegistrationForm;

