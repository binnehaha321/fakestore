import { loginSuccess, logoutSuccess } from '../reducers/authReducer';
import request from '../../axios/index';

export const login = (email, password) => async (dispatch, getState) => {
  try {
    const response = await request.get('/users'); 
    const users = response.data;
    email = email.toLowerCase();
    console.log(email)
    // Find the user with the provided email and password
    const userToLogin = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userToLogin) {
        if (userToLogin && userToLogin.address) {
            const { lat, lng } = userToLogin.address.geolocation;

            const apiKey = process.REACT_APP_GEOCODE_APIKEY;

            const countryResponse = await request.get(
                `https://geocode.xyz/${lat},${lng}?json=1&auth=${apiKey}`
              );
      
              // Extract the country from the response and add it to the user object
              const country = countryResponse.data.standard.countryname;
              const capitalizeFirstLetter = (text) => {
                return text.charAt(0).toUpperCase() + text.slice(1);
            };
        
            const city = capitalizeFirstLetter(userToLogin.address.city);
            const street = capitalizeFirstLetter(userToLogin.address.street);
            const addressLine = `${country} - ${city} city - ${street} street`;
            userToLogin.addressLine = addressLine;
            localStorage.setItem('user',JSON.stringify(userToLogin))
            console.log(userToLogin)
        }
      dispatch(loginSuccess({ user: userToLogin }));
    } else {
      console.log('Login failed. Please check your email and password.');
    }
  } catch (error) {
    console.log("An error occurred when logging in", error)
    alert(`An error occurred when logging in ${error}`);
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
};
