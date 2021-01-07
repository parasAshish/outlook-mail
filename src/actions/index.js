import { GET_INBOX_FLAGGED_MESSAGES, GET_INBOX_MESSAGES, GET_SPAM_MESSAGES, UPDATE_MESSAGE, GET_CUSTOM_MESSAGES, GET_DELETED_MESSAGES, DELETE_MESSAGE } from "../constants/AppConstants";

export const getInboxMessages = (payload) => ({
  type: GET_INBOX_MESSAGES,
  payload
});

export const getSpamMessages = (payload) => ({
  type: GET_SPAM_MESSAGES,
  payload
});

export const getCustomMessages = (payload) => ({
  type: GET_CUSTOM_MESSAGES,
  payload
});

export const getDeletedMessages = (payload) => ({
  type: GET_DELETED_MESSAGES,
  payload
});

export const getInboxFlaggedMessages = (actualList, filteredList, isFlag) => ({
  type: GET_INBOX_FLAGGED_MESSAGES,
  actualList,
  filteredList,
  isFlag
});

export const updateMessage = (mId, wholeData, messageType, messageActionType) => ({
  type: UPDATE_MESSAGE,
  mId,
  payload: wholeData,
  messageType,
  messageActionType
});

export const deleteMessage = (selectedMessage, wholeData, messageType, deletedData) => ({
  type: DELETE_MESSAGE,
  selectedMessage,
  payload: wholeData,
  messageType,
  deletedData
});