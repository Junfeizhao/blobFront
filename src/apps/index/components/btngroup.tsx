import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'
import './style/buttongroup.css'


class Buttongroup extends React.Component {

 


    render() {
        return (<div className="btngroup">
            <div className="btn">
                <Button ><Link to="/login">登录</Link><br></br></Button>
                
     </div>
            <div className="btn">
            <Button ><Link to="/register">注册</Link><br></br></Button>
     </div>
        </div>)
    }
}
export default Buttongroup