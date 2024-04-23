import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../providers/Auth';

const useProfile = () => {
  return React.useContext(AuthContext);
};

const LogoutButton = ({ userIsLogged, userName }) => {
  const {setProfile} = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete('http://127.0.0.1:3001/api/users/logout', 
      { withCredentials: true });
      setProfile({});
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
        <button onClick={handleLogout} className="link-style">
          <FontAwesomeIcon icon={faRightToBracket} /> Вийти
        </button>
  );
};

export default LogoutButton;
