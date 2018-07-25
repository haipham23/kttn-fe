import styled from 'react-emotion';

export const Wrapper = styled('div')`
  min-height: calc(100vh - 256px);
`;

export const TableWrapper = styled('div')`
  padding: 60px;
`;

export const Tr = styled('tr')`
  background-color: ${props => props['data-is-selected'] ? '#d2f0fd' : 'transparent'};
  height: 50px;

  td {
    vertical-align: middle;
  }
`;

export const Td = styled('td')`
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 480px;
`;

export const Column = styled('div')`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
`;

export const ModalText = styled('div')`
  margin-bottom: 10px;
  text-align: center;
`;

export const ActionHead = styled('th')`
  width: 200px;
  text-align: center !important;
`;
