// AppContext.js
import React, { useState, useMemo } from 'react';
import ContentContext from '../src/Context/ContentContext';

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState('Update Your Name');
  const [mobileNumber, setMobileNumber] = useState('Your Mobile No');
  const [status, setStatus] = useState('Your Status');
  const [userImage, setUserImage] = useState(ContentContext.krishnaImg);
  const appContextValue = useMemo(() => ({
    isSignedIn,
    setIsSignedIn,
    name,
    setName,
    mobileNumber,
    setMobileNumber,
    status,
    setStatus,
    userImage,
    setUserImage
  }), [isSignedIn, name, status,userImage,mobileNumber]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}
