import styled from 'react-emotion';
import Dropzone from 'react-dropzone';

export const EditorWrapper = styled('div')`
  position: relative;
  margin-bottom: 24px;
`;

export const EditorContent = styled('div')`
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 12px 12px 0 12px;
`;

export const H1 = styled('div')`
  font-size: 2em;
  margin-bottom: 12px;
`;

export const H2 = styled('div')`
  font-size: 1.5em;
  margin-bottom: 12px;
`;

export const H3 = styled('div')`
  font-size: 1.2em;
  margin-bottom: 12px;
`;

export const Quote = styled('div')`
  border-left: 5px solid #4ca8de;
  color: #555;
  margin: 0;
  padding: 10px 0 10px 20px;
  background-color: #e2f2ff;
  margin-bottom: 12px;
`;

export const Div = styled('div')`
  margin-bottom: 12px;
`;

export const SDropzone = styled(Dropzone)`
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  border-width: 2px;
  border-color: rgb(102, 102, 102);
  border-style: dashed;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
