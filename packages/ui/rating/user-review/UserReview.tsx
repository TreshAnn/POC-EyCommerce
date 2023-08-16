import { Container, Flex, Grid, Text } from '@mantine/core';
import { StarRating } from './Rating';

interface CommentBody {
  comment: {
    rating: number;
    name: string;
    date: string;
    commentTitle: string;
    commentDescription: string;
  };
}

const UserReview = ({
  comment: { rating, name, date, commentTitle, commentDescription },
}: CommentBody) => {
  const commentStyle = {
    paddingRight: '5px',
    paddingLeft: '5px',
    paddingTop: '15px',
    paddingBottom: '15px',
  };
  const containerStyle = {
    borderTop: '1px solid #CCCCCC',
    // borderBottom: '1px solid #CCCCCC',
    marginBottom: '0px',
    marginTop: '0px',
  };

  return (
    <>
      <Container my="md" style={containerStyle}>
        <Grid>
          <Grid.Col xs={3}>
            <div style={commentStyle}>
              <StarRating rate={rating} />
              <Text fz="xl" fw={700} sx={{ marginTop: '3px' }}>
                {name}
              </Text>
              <Text fz="xs">{date}</Text>
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
      </Container>
    </>
  );
};

export default UserReview;
