import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  line-height: 1%;
  height: 270px;

  .group {
    height: 32px;
  }

  .text-heading {
    font-size: 32px;
    font-weight: 900;

    @media (max-width: 768px) {
      font-size: 28px;
    }

    @media (max-width: 576px) {
      font-size: 24px;
    }

    @media (max-width: 452px) {
      font-size: 18px;
    }
  }

  .text-rating {
    font-size: 16px;
    color: #777;

    @media (max-width: 576px) {
      font-size: 12px;
    }

    @media (max-width: 452px) {
      font-size: 10px;
    }
  }

  .text-reviews-count {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    color: #777;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 576px) {
      font-size: 12px;
    }

    @media (max-width: 452px) {
      font-size: 10px;
    }
  }
`;
