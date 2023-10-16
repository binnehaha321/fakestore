import { loginSuccess } from "../store/auth/auth.slice";

export const getUserFromLocalStorage = () => (dispatch) => {
  const storedUser = localStorage.getItem('user');

  if (storedUser) {
    const user = JSON.parse(storedUser);

    dispatch(loginSuccess({ user }));
  }
};