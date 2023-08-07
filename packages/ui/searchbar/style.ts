import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

export const ComponentWrapper = styled.div`
  width: 65%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .search-input {
    border-bottom: 1px solid #00000040;
    border-radius: 20px;
    width: calc(100% - 42px);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;

  label {
    width: 70px;
    display: inline-block;
    margin-left: 10px;
    font-size: 15px;
    line-height: 24px;
    text-align: center;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;

  .select {
    margin-right: 5px;
    border-bottom: 1px solid #00000040;
    border-radius: 20px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  }

  .select-sort {
    width: 100px;
  }

  .select-order {
    width: 90px;
  }
`;
