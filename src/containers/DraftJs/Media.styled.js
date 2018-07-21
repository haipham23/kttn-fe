import styled from 'react-emotion';

export const ImageWrapper = styled('img')`
  max-height: 300px;
  border-radius: 4px;
`;

export const AudioWrapper = styled('div')`
  background-color: #f1f3f4;
  width: 300px;
  border-radius: 4px;
`;

export const Audio = styled('audio')`
  height: 55px;
`;

export const AudioDesc = styled('p')`
  padding: 0 12px 12px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
