import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [profile, setProfile] = useState({profile:{}});
  useEffect(() => {
    (async () => {
    axios.get(`http://127.0.0.1:3001/api/users/profile`, {withCredentials: true})
      .then(response => {
        if (response.status === 200){
          setProfile(response.data.profile);
        }
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
      })})()
  }, []);
  return (
    <AuthContext.Provider value={{profile, setProfile}}>
      {children}
    </AuthContext.Provider>
  );
};
