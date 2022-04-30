import baseURL from "../config/baseUrl";
import { notifyError } from '../utils/notifications'

//ACTIONS
export const LOGIN = 'LOGIN';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const updateUser = (id, userData, token) => {
      return async dispatch => {
            await baseURL.put(`admin/user/update/${id}`, {...userData}, {
                  headers: {
                        token
                  }
            })
            .then(res=>{
                  dispatch({
                        type: UPDATE_USER,
                        payload: res.data
                  })
            })
            .catch(res => notifyError(res.response.data.error))
      }
}

export const deleteUser = (id, token) => {
      return async dispatch => {
            await baseURL.delete(`admin/user/delete/${id}`, {
                  headers: {
                        token
                  }
            })
            .then(res=>{
                  dispatch({
                        type: DELETE_USER,
                        payload: res.data
                  })
            })
            .catch(res => notifyError(res.response.data.error))
      }
}

export const logIn =  (username, password, navigate) =>{
      return async dispatch => {
            await baseURL.post('login',{
                  username,
                  password,
            })
            .then(res => {
                  dispatch( {type: LOGIN, payload : res.data} );
                  navigate('/home');
            })
            .catch(res => notifyError(res.response.data.error))
      }
};

export const logOut = ()=>{
      return dispatch =>{
            dispatch( {type: LOGIN, payload: {} } )
      }
};

export const getAllUsers = (token)=>{
      return async dispatch =>{
            const result = await baseURL.get('/register',{
                  headers:{
                        token
                  }
            });
            dispatch( {type : GET_ALL_USERS, payload : result.data} )
      }
};

export const getAllProducts = ()=>{
      return async dispatch =>{
            await baseURL.get('/product')
            .then(res => {
                  dispatch( {type: GET_ALL_PRODUCTS, payload: res.data} )
                  
            })
            .catch(res => notifyError(res.response.data.error))
      }
}


export const getAllTransactions = ()=>{
      return dispatch =>{
      }
};