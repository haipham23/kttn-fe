import axios from 'axios';

export const getAllChapters = (limit = 100, page = 0) => {
  return axios.get(`https://api.tinlanhtre.com/chapters/${limit}/${page}`);
};

export const getOneChapter = (chapterId) => {
  return axios.get(`https://api.tinlanhtre.com/chapter/${chapterId}`);
};
