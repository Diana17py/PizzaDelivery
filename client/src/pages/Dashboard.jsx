import React from 'react';
//import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({profile}) {
  console.log(profile.id);
  const {id: userId} = profile;
if (userId === undefined){
 // return <Navigate to="/" replace />;
}
  return (
    <div className="container">
      userProfile
    </div>
  );
}
