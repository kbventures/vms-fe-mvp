import React, { useEffect, useState } from 'react';
import '../App.css';  // Include any additional CSS here
import 'open-props';  // Import Open Props styles (CDN or package)

const Profile1 = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Fetch data from the JSON file in the public directory
    fetch('/profile.json')
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>Volunteer Profile</h3>
      </div>
      <div className="card-body">
        <div className="profile-header">
          <img
            className="avatar"
            src={profileData.avatar || '/default-avatar.png'}
            alt="Avatar"
          />
          <div>
            <p><strong>ID:</strong> {profileData.id}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Description:</strong> {profileData.description || 'No description available'}</p>
            <p><strong>Created At:</strong> {profileData.happenedAt || 'Not available'}</p>
            <p><strong>Inserted At:</strong> {profileData.insertedAt}</p>
          </div>
        </div>
        <div className="social-links">
          {profileData.socialLinks &&
            Object.keys(profileData.socialLinks).map((platform) => (
              <a
                key={platform}
                href={profileData.socialLinks[platform]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile1;
