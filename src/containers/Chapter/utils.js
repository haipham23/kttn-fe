import axios from 'axios';

export const saveChapter = (data) => {
  return axios.post(
    'https://api.tinlanhtre.com/chapter',
    data,
  );
};

export const updateChapter = (data) => {
  return axios.put(
    `https://api.tinlanhtre.com/chapter/${data.chapterId}`,
    data,
  );
};

export const getOneChapter = (chapterId) => {
  return axios.get(`https://api.tinlanhtre.com/chapter/${chapterId}`);
};
