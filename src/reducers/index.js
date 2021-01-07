import { CUSTOM_RECEIVED, DELETED_RECEIVED, FLAGGED_INBOX_RECEIVED, INBOX_RECEIVED, SPAM_RECEIVED } from "../constants/AppConstants";

const reducer = (state = {}, action) => {
   switch (action.type) {
      case INBOX_RECEIVED:
         return { ...state, inboxData: action.inboxData, setFlaggedData: false }
      case SPAM_RECEIVED:
         return { ...state, spamData: action.spamData, setFlaggedData: false }
      case CUSTOM_RECEIVED:
         return { ...state, customData: action.customData, setFlaggedData: false }
      case DELETED_RECEIVED:
         return { ...state, deletedData: action.deletedData, setFlaggedData: false }
      case FLAGGED_INBOX_RECEIVED:
         return { ...state, inboxFlaggedData: action.inboxFlaggedData, setFlaggedData: true }
      default:
         return state;
   }
};

export default reducer;
