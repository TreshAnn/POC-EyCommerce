import { Table } from '@mantine/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  justify-content: center;
  align-self: stretch;
  padding: 50px;
  gap: 10px;
  flex: 1 0 0;
  justify-content: center;
  flex-direction: column;
`;

export const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0;
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
  .td-footer {
    justify-content: flex-end;
    padding-right: 20px;
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
  }

  .btn {
    margin: 0;
    /* padding: 0; */
  }

  .rating-btn {
    margin-right: -50px;
  }
`;
