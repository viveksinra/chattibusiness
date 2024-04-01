const { useContext } = require("react");
const { AppContext } = require("../../context/appContext");
import * as SecureStore from 'expo-secure-store';
import { startUrl } from '../Context/ContentContext';
import axios from 'axios';

const handleSetData = async ({ setName, setStatus, setUserImage, setMobileNumber }) => {

    try {
      console.log("getti")
      // Step 1: Retrieve profile data from local storage
      let storedProfile = await SecureStore.getItemAsync('profile');
  
      if (storedProfile) {
        // Parse the stored JSON data
        storedProfile = JSON.parse(storedProfile);
  
        // Destructure profile data
        const { name, status, userImage, mobileNumber } = storedProfile;
  
        // Step 2: Update state with retrieved profile data
        setName(name);
        setStatus(status);
        setUserImage(userImage); // Assuming userImage is the key for the profile image
        setMobileNumber(mobileNumber); // Assuming userImage is the key for the profile image
        // Assuming you have a state variable for mobile number as well, update it if needed
      } else {
        console.log('Profile data not found in local storage');
      }
        // Step 3: Make API call to fetch additional data
        const url = `${startUrl}/chattiApi/allCommon/getProfile/oneUser`;
        const token = await SecureStore.getItemAsync('authToken');
  
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
  
        // Step 4: Update state with fetched data
        const apiData = response.data;
  
        if (apiData) {
          // Assuming apiData has properties like name, status, userImage, mobileNumber
          setName(apiData.name);
          setStatus(apiData.status);
          setUserImage(apiData.userImage);
          setMobileNumber(apiData.mobileNumber);
  
          // Step 5: Update local storage with the new data
          const updatedProfile = {
            name: apiData.name,
            status: apiData.status,
            userImage: apiData.userImage,
            mobileNumber: apiData.mobileNumber,
          };
  
          await SecureStore.setItemAsync('profile', JSON.stringify(updatedProfile));
        }
    
    } catch (error) {
      console.error('Error while handling data:', error);
      // Handle errors accordingly
    }
  };

  module.exports = handleSetData
  

  