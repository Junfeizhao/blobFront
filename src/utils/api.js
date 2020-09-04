
import axious from './httpRequest'

async function postRequest  (url, params) {
    return new Promise((resolve,reject) => {
        axious.post(url,{
          params:params
        })
        .then(response => {
            console.log(response,555)
          resolve(response.data);
        })
        .catch(err => {
          reject(err)
        })
      })
  };



  
   async function getRequest (url) {
    return new Promise((resolve,reject) => {
        axious.get(url,{})
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err)
        })
      })
  };


  


  export default{
       getRequest:getRequest,
       postRequest:postRequest
  }