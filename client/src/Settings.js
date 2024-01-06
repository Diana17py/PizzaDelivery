import React, { useState, useEffect, useRef } from 'react';
import './Settings.css';
import { AuthContext } from './providers/Auth';

const useProfile = () => {
  return React.useContext(AuthContext);
};

const Settings = () => {
  const {setProfile} = useProfile();
  const [formData, setFormData] = useState({});
  const [currentAvatar, setCurrentAvatar] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, avatar: file }));
    setCurrentAvatar(URL.createObjectURL(file));
  };

  const handleInput = (e, field) => {
    let fieldValue = {};
    fieldValue[field] = e.target.value; 
    setFormData({...formData, ...fieldValue});
  }


    const fetchUserData =  useRef(()  => {
      (async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/api/users/profile', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();
        setCurrentAvatar(data.profile.avatar);
        const profileData = Object.fromEntries(["first_name", "last_name", "delivery_type", "phone_number"].map(k => [k, data.profile[k]])); 
        setFormData(profileData);
        setProfile(data.profile);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }})()
    })
  useEffect(() => {
    fetchUserData.current();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataO = new FormData();
    Object.keys(formData).forEach(function(key, index) {
      formDataO.append(key, formData[key])
    })

  // A file <input> element
    //const avatar = document.querySelector("#avatar");
    //formData.append("avatar", avatar.files[0]);
    try {
      const response = await fetch('http://127.0.0.1:3001/api/users/settings', {
        method: 'PUT',
        credentials: 'include',
        body: formDataO,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Settings updated successfully:', data);
        fetchUserData.current();
      } else {
        console.error('Error updating settings:', data.error);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };
  
  return (
    <div className="settings-container">
      <div className="settings-title-container">
        <h1 className="settings-title">Settings</h1>
      </div>
      <div className="content-container">
        <div className="left-section">
          <div className="avatar">
            {currentAvatar && (
              <img className="current-avatar" src={currentAvatar} alt="Current Avatar" />
            )}
            <label htmlFor="avatar" className="photo-upload-btn">
              Change Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="right-section">
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input type="text" name="first_name" value={formData.first_name || ''} onChange={e => handleInput(e, "first_name")}/>
            </label>
            <br />
            <label>
              Last Name:
              <input type="text" name="last_name" value={formData.last_name || ''} onChange={e => handleInput(e, "last_name")}/>
            </label>
            <br />
            <label>
              Delivery Type:
              <input
                type="text"
                name="delivery_type"
                value={formData.delivery_type || ''}
                onChange={e => handleInput(e, "delivery_type")}
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number || ''}
                onChange={e => handleInput(e, "phone_number")}
              />
            </label>
            <br />
            <button className="buttonSettings" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
