import { Card, Container } from '@mantine/core';
import { RatingComponent } from './rating';
import UserReview from './user-review/UserReview';
import { CommentBody } from '../rating/types/Rating-types';

interface Props {
  reviews: CommentBody[];
  reviewCount: number;
  ratingValue: number;
}

export const RatingModule = ({ reviews, reviewCount, ratingValue }: Props) => {
  return (
    <Container>
      <RatingComponent reviewCount={reviewCount} ratingValue={ratingValue} />
      <Card
        padding="lg"
        style={{
          maxHeight: '50vh',
          overflowY: 'auto',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <UserReview comment={reviews} />
      </Card>
    </Container>
  );
};
