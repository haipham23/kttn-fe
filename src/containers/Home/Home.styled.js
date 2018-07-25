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
  cursor: pointer;

  td {
    vertical-align: middle;
  }
`;

export const Td = styled('td')`
  width: 70%;
  text-transform: uppercase;
`;
