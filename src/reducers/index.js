import { CUSTOM_RECEIVED, DELETED_RECEIVED, INBOX_RECEIVED, SPAM_RECEIVED } from "../constants/AppConstants";

const reducer = (state = {}, action) => {
   switch (action.type) {
      case INBOX_RECEIVED:
         return { ...state, inboxData: action.inboxData }
      case SPAM_RECEIVED:
         return { ...state, spamData: action.spamData }
      case CUSTOM_RECEIVED:
         return { ...state, customData: action.customData }
      case DELETED_RECEIVED:
         return { ...state, deletedData: action.deletedData }
      default:
         return state;
   }
};

export default reducer;
