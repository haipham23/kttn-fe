import React from 'react';
import YouTube from 'react-youtube';

import {
  ImageWrapper,
  AudioWrapper,
  Audio,
  AudioDesc
} from './Media.styled';

const Image = ({ src, alt }) => {
	return <ImageWrapper src={src} alt={alt} />;
};

const AudioPlayer = ({ src, name }) => {
  return (
    <AudioWrapper>
      <Audio src={src} controls />
      <AudioDesc>{name}</AudioDesc>
    </AudioWrapper>
  );
};

const Media = ({ block }) => {
  const blockData = block.getData();
  const format = blockData.get('format');
  const src = blockData.get('src');
  const name = blockData.get('name');

	if (format === 'jpg' || format === 'png') {
		return <Image src={src} alt={name} />;
  }
  
  if (format === 'mp3') {
    return <AudioPlayer src={src} name={name} />;
  }

  if (format === 'youtube') {
    console.log(name);
    return (
      <YouTube
        videoId={name}
        opts={{
          height: '390',
          width: '640'
        }}
      />
    );
  }

  return <div>{format}</div>;
};

export default Media;
