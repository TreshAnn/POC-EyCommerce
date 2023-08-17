import styled from 'styled-components';

export const Wrapper = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: space-between; */
  padding: 0;
  margin: 0 20px 0 20px;
  line-height: 1%;
  height: 270px;

  .group-left {
    height: 32px;
  }

  .grid {
    padding: 0;
    margin: 0;
  }

  .left-div {
    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
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

  .right-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    @media (max-width: 991px) {
      display: none;
    }
  }

  .group-right {
    width: 375px;
    height: 20px;
  }

  .progress {
    width: 277px;
    margin-top: -3px;
  }

  .one-star {
    margin-left: 10px;
  }

  .text-progress {
    font-size: 14px;
  }
`;
