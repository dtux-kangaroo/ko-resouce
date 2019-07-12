import {globalType} from './constant';
import {message as Message} from 'antd';
import { URL } from "@/api/index";
import Http from "@/utils/http";

const userData = (data) => ({
  type: globalType.GET_USER_DATA,
  payload: data
})
export const getUserData = (params) => async (dispatch, getState,{API}) => {
  try {
    API.getUserInfoUsingGet(params).then(response =>{ 
      const {success,data,message} = response;
      if (success) {
        dispatch(userData(data));
      } else {
        Message.error(message)
      }
    });
  } catch (error) {
    console.log('error: ', error)
  }
}
export const loginInSaveUserData = (params,callBack) => async (dispatch, getState,{API}) => {
  try {
    Http.postForm(URL.loginUsingPost,params,{}).then(response =>{ 
      const {success,data,message} = response;
      if (success) {
        dispatch({
          type: globalType.SAVE_USER_DATA,
          payload: data
        });
        callBack&&callBack()
      } else {
        Message.error(message)
      }
    });
   
  } catch (error) {
    console.log('error: ', error)
  }
}

const navData = (data) => ({
  type: globalType.GET_NAV_DATA,
  payload: data
})
export const getNavData = (params) => async (dispatch, getState,{API}) => {
  try {
    API.getNavData(params).then(response =>{ 
      if (response.success) {
        dispatch(navData(response.data));
      } else {
        //返回失败
      }
    });

  } catch (error) {
    console.log('error: ', error)
  }
}


