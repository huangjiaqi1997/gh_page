import axios from 'axios';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERR_MSG = 'ERR_MSG';

const authSuccess = (doc) => ({
  type: AUTH_SUCCESS, payload: doc
})
const errMsg = (msg) => ({
  msg, type: ERR_MSG
})

export const login = (data) => {
  return dispatch => {
    axios.post('/login', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errMsg(res.data.msg));
        }
      })
  }
}

export const register = (data) => {
  return dispatch => {
    axios.post('/register', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errMsg(res.data.msg));
        }
      })
  }
}
export const getUserInfo = () => {
  return dispatch => {
    axios.get('/getuserinfo')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errMsg(res.data.msg));
        }
      })
  }
}

const initialState = {
  userName: '',
  msg: ''
}

const userReducer = (state=initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        userName: action.payload.name
      }
    case ERR_MSG:
      return {
        ...state,
        msg: action.msg
      }
    default:
      return state;
  }
};

export default userReducer;
