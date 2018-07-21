import React from 'react';

const Image = ({ src, alt }) => {
	return <img style={{ maxHeight: '300px', borderRadius: '4px' }} src={src} alt={alt} />;
};

const AudioPlayer = ({ src, name }) => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', width: '300px', borderRadius: '4px' }}>
      <audio style={{ height: '55px' }} src={src} controls />
      <p style={{ padding: '0 0 12px 12px' }}>{name}</p>
    </div>
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

  return <div>{format}</div>;
};

export default Media;
