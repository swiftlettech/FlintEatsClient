import { LOGIN, MERGE_AVATARS, SET_CONSENT, SET_FAVE_MODE, SET_FEED, SET_FOCUS, SET_QUERY, SET_QUERY_TEXT } from '../types/eats';

export const login = (me) => ({ type: LOGIN, me });
export const mergeAvatars = (avatars) => ({ type: MERGE_AVATARS, avatars });
export const setConsent = (consent) => ({ type: SET_CONSENT, consent });
export const setFaveMode = (faveMode) => ({ type: SET_FAVE_MODE, faveMode });
export const setFocus = (focus) => ({ type: SET_FOCUS, focus });
export const setFeed = (key, feed) => ({ type: SET_FEED, key, feed });
export const setQuery = (query) => ({ type: SET_QUERY, query });
export const setQueryText = (query) => ({ type: SET_QUERY_TEXT, query });
