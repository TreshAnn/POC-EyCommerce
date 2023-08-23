import styled from 'styled-components';
import { Menu, Table, DEFAULT_THEME, ScrollArea } from '@mantine/core';

export const StyledMenuDropdown = styled(Menu.Dropdown)`
  max-height: 575px;
  overflow-y: auto;
`;

export const StyledMenuLabel = styled(Menu.Label)`
  background: #fff;
  z-index: 2;
  padding: 10px 5px;
`;

export const StyledQuantityWrapper = styled.div`
  margin-left: -35px;
`;

export const StyledTableDiv = styled.div`
  overflow-y: auto;
  height: 200px;
`;

export const StyledScrollArea = styled(ScrollArea)`
  height: 65vh;
`;

export const StyledTable = styled(Table)`
  padding: 30px;
  border-spacing: 0px;
  border-collapse: separate;

  thead tr th {
    color: black;
  }

  thead {
    position: sticky;
    top: -1px;
    background-color: white;
    z-index: 2;
  }

  td {
    background-color: white;
    padding: 10px;
  }

  .col-two {
    width: 40%;
  }

  thead tr th:not(:first-child),
  tbody tr td {
    text-align: center;
  }

  tbody tr td:first-child {
    width: 100px;
  }

  th:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  th:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  tbody:before {
    content: '-';
    display: block;
    line-height: 7px;
    color: transparent;
  }

  td:first-child,
  th:first-child {
    margin-top: 20px;
    padding-left: 20px;
  }

  td:last-child,
  th:last-child {
    margin-top: 20px;
    padding-right: 20px;
  }

  @media (min-width: ${DEFAULT_THEME.breakpoints.md}) {
    td:first-child,
    th:first-child {
      padding-left: 100px;
    }

    td:last-child,
    th:last-child {
      padding-right: 100px;
    }
  }
`;
