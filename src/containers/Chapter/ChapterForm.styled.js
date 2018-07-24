import styled from 'react-emotion';
import { ToastContainer } from 'react-toastify';

export const Wrapper = styled('div')`
  min-height: calc(100vh - 256px);
  padding-top: 60px;
`;

export const EditorWrapper = styled('div')`
  margin-top: 60px;
`;

export const NumberColumn = styled('div')`
  flex: none;
  width: 150px;
`;

export const FloatNotif = styled('div')`
  position: fixed;
  width: 100px;
  right: 20px;
  top: 20px;
`;

export const Toast = styled(ToastContainer)`
  width: 200px;
  top: 5em;
  font-weight: 700;

  .Toastify__toast {
    min-height: 40px;
    background-color: #4caf50;
    color: #fff;
  }
`;
