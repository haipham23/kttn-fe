import axios from 'axios';

export const getAllChapters = (limit = 100, page = 0) => {
  return axios.get(`https://api.tinlanhtre.com/chapters/${limit}/${page}`);
};

export const deleteChapter = (chapterId, token) => {
  return axios.delete(
    `https://api.tinlanhtre.com/chapter/${chapterId}`,
    { data: { sessionToken: token } }
  );
};
