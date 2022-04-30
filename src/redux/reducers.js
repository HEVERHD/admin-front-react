import {LOGIN, GET_ALL_USERS, GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL} from './actions';


const initialState = {
      currentUser: [],
      allUsers: [],
      allProducts: []
};

const reducer = (state = initialState, action) =>{
      switch(action.type){
            case LOGIN :
                  return {
                        ...state,
                        currentUser : action.payload
                  };

            case GET_ALL_USERS :
                  return {
                        ...state,
                        allUsers : action.payload
                  };
            
            case GET_ALL_PRODUCTS:{
                  return{
                        ...state,
                        allProducts : action.payload
                  }
            }

            default:
                  return state;
      };
}

export default reducer