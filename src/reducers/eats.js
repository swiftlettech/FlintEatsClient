import { LOGIN, MERGE_AVATARS, SET_CONSENT, SET_FAVE_MODE, SET_FEED, SET_FOCUS, SET_QUERY, SET_QUERY_TEXT } from '../types/eats';

const initialState = {
  me: null,
  avatars: {},
  faveMode: false,
  feeds: {},
  focus: null,
  query: '',
  queryText: ''
};

export default eatsReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: 
      return {
        ...state,
        me: action.me
      };
    case MERGE_AVATARS:
      let avatars = Object.assign({}, state.avatars, action.avatars);
      return {
        ...state,
        avatars
      };
    case SET_CONSENT:
      let me = state.me;
      me.irbAccept = action.consent;
      return {
        ...state,
        me
      };
    case SET_FAVE_MODE:
      return {
        ...state,
        faveMode: action.faveMode
      };
    case SET_FEED:
      let feeds = Object.assign({}, state.feeds);
      feeds[action.key] = action.feed;
      return {
        ...state,
        feeds
      };
    case SET_FOCUS:
      if (action.focus === state.focus) {
        // if focused to selected, unfocus
        return {
          ...state,
          focus: null
        };
      }
      return {
        ...state,
        focus: action.focus
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.query
      };
    case SET_QUERY_TEXT:
      return {
        ...state,
        queryText: action.query
      };
    default:
      return state;
  }
};
