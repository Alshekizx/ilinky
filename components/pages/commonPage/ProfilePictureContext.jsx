import React, { createContext, useContext, useState } from "react";

// Create a context for the profile picture URI
const ProfilePictureContext = createContext();

// Create a custom hook to use the profile picture URI
export const useProfilePictureURI = () => useContext(ProfilePictureContext);

// Provider component to wrap your application and provide the profile picture URI
export const ProfilePictureProvider = ({ children }) => {
  const [profilePictureURI, setProfilePictureURI] = useState(null);

  return (
    <ProfilePictureContext.Provider
      value={{ profilePictureURI, setProfilePictureURI }}
    >
      {children}
    </ProfilePictureContext.Provider>
  );
};
