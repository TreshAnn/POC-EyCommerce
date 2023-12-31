import { Grid, Text } from '@mantine/core';
import { StarRating } from '../StarRating';
import { StyledContainer, commentStyle } from './style';
import { CommentBody } from '../types/Rating-types';

interface Props {
  comment: CommentBody[];
}

const UserReview = ({ comment }: Props) => {
  const displayComment = ({
    rating,
    name,
    date,
    commentTitle,
    commentDescription,
  }: CommentBody) => {
    return (
      <StyledContainer>
        <Grid>
          <Grid.Col xs={3}>
            <div style={commentStyle}>
              <StarRating rate={rating} />
              <Text fz="xl" fw={700} sx={{ marginTop: '3px' }}>
                {name}
              </Text>
              <Text fz="xs" style={{ color: '#777' }}>
                {date}
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col xs={9}>
            <div style={commentStyle}>
              <Text fz="md" fw={700}>
                {commentTitle}
              </Text>
              <Text fz="xs" sx={{ marginTop: '5px' }}>
                {commentDescription}
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </StyledContainer>
    );
  };

  return <>{comment.map(displayComment)}</>;
};

export default UserReview;
