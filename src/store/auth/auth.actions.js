
import { loginFail, logoutSuccess } from './auth.slice';

import request from '../../axios/index';
import { capitalizeFirstLetter } from '../../helpers/capitalizeLetter';

const fetchUserData = async (email,password)=>{
  const response = await request.get('/users'); 
    const users = response.data;
    email = email.toLowerCase();
    console.log(email)
    // Find the user with the provided email and password
    const userToLogin = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!userToLogin && !userToLogin.address) return
    if (userToLogin.address) {
      const { lat, long } = userToLogin.address.geolocation;
      const apiKey = process.env.REACT_APP_GEOCODE_APIKEY;
      const { data } = await request.get(
        `https://geocode.xyz/${lat},${long}?json=1&auth=${apiKey}`
        );
      const countryname = await data?.standard?.countryname;
      let { city, street } = userToLogin.address;
      [city, street] = capitalizeFirstLetter([city, street])
      const addressLine = `${countryname} - ${city} city - ${street} street`;
      userToLogin.addressLine = addressLine ? addressLine : '';
      localStorage.setItem('user',JSON.stringify({...userToLogin}))
      
    }else {
      console.log('no address found')
    }

    return userToLogin;
}

export const login = async (email, password) => {
  try {
    
      const userToLogin = await fetchUserData(email,password);
      return userToLogin;
    }
   catch (error) {
    console.log("An error occurred when logging in", error)
    alert(`An error occurred when logging in ${error}`);
  }
};

export const logout = () => (dispatch) => {
    try{
      dispatch(logoutSuccess());
      localStorage.removeItem('user');
    }
    catch(err){
      dispatch(loginFail({error: err}));
    }
};
