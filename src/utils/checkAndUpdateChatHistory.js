import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { startUrl } from '../Context/ContentContext';
const { LocalDeleteAllChat, DbAndLocalDeleteAllChat } = require("./deleteOrders");


const checkAndUpdateChatHistory = async (messages,clearMessages,replaceMessagesInAsyncStorageAndContext) => {
  try {
  const allMsgId = Object.keys(messages);

    const localChatCount = allMsgId.length;
    const url = `${startUrl}/chattiApi/allCommon/getChat/count`;

    // Retrieve the authorization token from SecureStore
    const token = await SecureStore.getItemAsync('authToken');


    // Make an API call to get the chat count from the server
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
let apiChatCount = 0
    if(response.data.variant == "success"){ 
      apiChatCount = response.data.count;
    }
    // if (localChatCount !== apiChatCount) {
    if ("localChatCount" !== "apiChatCount") {
      // If counts mismatch, make another API call to get all chats
      const allChatsUrl = `${startUrl}/chattiApi/allCommon/getChat/oneUser`;

      const allChatsResponse = await axios.get(allChatsUrl, {
        headers: {
          Authorization: token,
        },
      });

      const allChats = allChatsResponse.data.chatData;

replaceMessagesInAsyncStorageAndContext(allChats)
// LocalDeleteAllChat(clearMessages)
      // Update the Message context with the new chats
      // dispatch({ type: 'SET_MESSAGES', payload: allChats });
    }
  } catch (error) {
    console.error('Error checking/updating chat history:', error);
  }
};

module.exports = checkAndUpdateChatHistory;