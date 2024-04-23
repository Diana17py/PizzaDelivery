import React, { useEffect } from 'react';
import './UserDashboard.css';
import { AuthContext } from '../providers/Auth';
import { useNavigate, Link } from 'react-router-dom';

const useProfile = () => {
  return React.useContext(AuthContext);
};

const UserDashboard = ({children }) => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { id: userId } = profile;
  const userIsLogged = parseInt(userId) > 0;

  useEffect(() => {
    if (!userIsLogged) {
     // navigate("/login");
    }
  }, [navigate, userIsLogged]);

  return (
    <>
      <div className="row user-dashboard">
        <div className="menu">
          <ul>
            <Link to="/dashboard">
              <button className={window.location.pathname === "/dashboard"?"active":""}>Панель користувача</button>
            </Link>
            <Link to="/dashboard/orders">
              <button className={window.location.pathname === "/dashboard/orders"?"active":""}>Замовлення</button>
            </Link>
            <Link to="/dashboard/settings">
              <button className={window.location.pathname === "/dashboard/settings"?"active":""}>Налаштування</button>
            </Link>
          </ul>
        </div>
        <div className="main">{children}</div>
      </div>
    </>
  );
};

export default UserDashboard;