import React, { ThHTMLAttributes } from "react";
import './style/themeselector.css';
import { message } from "antd";

interface Istate{
    time:boolean
}
interface IProps{
    
}

class Themeselect extends React.Component<IProps,Istate>{
   constructor(IProps:IProps){
       super(IProps);
       this.state={
           time:true,
       }
   }
componentDidMount(){
    // let head = document.getElementsByTagName("head")[0];
    // var link = document.createElement("link");
    // link.setAttribute("href","shdbjh4");
    // head.appendChild(link);
}

    handleClick =(e:any)=>{
        
         var time =this.state.time;
         
         if(time){
             this.setState({
                 time:false
             })
            let theme = e.target.dataset.theme;
        if(!theme) return;
        console.log('target', theme);
        var link = document.getElementsByClassName("them")[0];
        console.log(link);
        if(link){
               var href=`theme/theme.${theme}.css`;
           link.setAttribute("href",href);
         
        }
        setTimeout(()=>{
            console.log('可以点击了')
            this.setState({
                time:true
            })
        },1000)
         }else{
             message.warning({content:'操作过于频繁!'})
         }
      
        
     
       
        // this.setState({
        //     themeCode: themeCode
        // });
        
      }
    render(){
        return (
            <div className="theme__select__wrap">
               
               
            <div className="theme__select__con">
                <div className="theme__select__list_wrap">
            <ul className="theme__select__list" onClick={this.handleClick}>
                  <li data-theme="dark">暗黑风暴</li>
                  <li data-theme="purple">紫色恋人</li>
                  <li data-theme="blue">简约蓝色</li>
              </ul>
              </div>
               </div>
            </div>
        )
    }
}

export default Themeselect