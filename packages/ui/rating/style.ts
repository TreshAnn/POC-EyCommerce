import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  line-height: 1%;
  height: 270px;

  .text-heading {
    font-size: 32px;
    font-weight: 900;
  }

  .text-rating {
    color: #777;
  }

  .text-reviews-count {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    color: #777;
  }
`;
