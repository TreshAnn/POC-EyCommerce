import { Table } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  //display: flex;
  /* width: 100%;
  height: auto; */
  justify-content: center;
  align-self: stretch;
  padding: 50px;
  gap: 10px;
  flex: 1 0 0;
  /* border: 1px solid black; */
  justify-content: center;
  flex-direction: column;
`;

export const StyledTable = styled(Table)`
  //padding: 0px;
  thead tfoot tr th {
    color: black;
  }
  thead {
    position: sticky;
    top: -1px;
    background-color: #e6e6e6;
    z-index: 2;
    height: 52px;
  }
  tbody {
    background-color: white;
    height: auto;
    position: sticky;
    border: 1px solid #f2f4f6;
  }
  tr {
    padding: 15px 20px;
    margin: 0px;
  }
  th,
  td {
    width: 190px;
    text-align: center !important;
  }
  td:first-child {
    padding: 0px;
  }

  th:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    text-align: left !important;
    padding-left: 20px;
  }
  th:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
