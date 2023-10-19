import { loginSuccess } from "../store/auth/auth.slice";
import { loginFail } from "../store/auth/auth.slice";
export const getUserFromLocalStorage = () => (dispatch) => {
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    try{
      const user = JSON.parse(storedUser);
      dispatch(loginSuccess({user: user}));
    }
    catch(error){
      dispatch(loginFail({error:error}));
      console.log(`error:${error}`);
    }
  }
  else {
    console.log('Login failed. Please check your email and password.');
  }
};