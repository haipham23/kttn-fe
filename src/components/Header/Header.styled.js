import styled from 'react-emotion';

export const Column = styled('div')`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
`;

export const ErrorText = styled('p')`
  display: flex;
  align-items: center;
  margin-left: 12px;
  over-flow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const GroupField = styled('div')`
  display: flex;
`;

export const BrandImg = styled('img')`
  max-height: 64px !important;
  padding-left: 10px;
  padding-right: 10px;
`;
