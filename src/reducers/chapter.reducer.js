import initialState from './initialState';

export default function chapterReducer(state = initialState.chapter, action) {
  switch (action.type) {
    case 'LOAD_CHAPTERS':
      return {
        ...state,
        chapters: action.payload.chapters,
        limit: action.payload.limit || initialState.chapter.limit,
        page: action.payload.page || initialState.chapter.page
      };

    default:
      return state;
  }
}
