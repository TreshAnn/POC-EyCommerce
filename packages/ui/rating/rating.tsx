import { Grid, Group, Progress, Rating, Text } from '@mantine/core';

import { Wrapper } from './style';
import { StarRating } from './StarRating';
interface IRatingProps {
  reviewCount?: number;
  ratingValue?: number;
}

export const RatingComponent = ({
  ratingValue = 5,
  reviewCount = 3423,
}: IRatingProps) => {
  return (
    <>
      <Wrapper>
        <Grid className="grid">
          <Grid.Col lg={6} md={6} sm={12}>
            <div className="left-div">
              <Text className="text-heading">Customer reviews & ratings</Text>

              <Group className="group-left" spacing="xs">
                <StarRating rate={ratingValue} />
                <Text className="text-rating">
                  ({ratingValue.toFixed(1)} out of 5)
                </Text>
              </Group>
              <Text className="text-reviews-count">
                Based on {reviewCount.toLocaleString()} reviews
              </Text>
            </div>
          </Grid.Col>

          <Grid.Col lg={6} md={6} sm={12}>
            <div className="right-div">
              <Group className="group-right" spacing="xs">
                <Text className="text-progress">5 stars</Text>
                <Progress
                  className="progress"
                  value={100}
                  color="#FFE600"
                  size="md"
                  radius="md"
                />
                <Text className="text-progress">{reviewCount}</Text>
              </Group>

              <Group className="group-right" spacing="xs">
                <Text className="text-progress">4 stars</Text>
                <Progress
                  className="progress"
                  value={0}
                  color="#FFE600"
                  size="md"
                  radius="md"
                />
                <Text className="text-progress">0</Text>
              </Group>

              <Group className="group-right" spacing="xs">
                <Text className="text-progress">3 stars</Text>
                <Progress
                  className="progress"
                  value={0}
                  color="#FFE600"
                  size="md"
                  radius="md"
                />
                <Text className="text-progress">0</Text>
              </Group>

              <Group className="group-right" spacing="xs">
                <Text className="text-progress">2 stars</Text>
                <Progress
                  className="progress"
                  value={0}
                  color="#FFE600"
                  size="md"
                  radius="md"
                />
                <Text className="text-progress">0</Text>
              </Group>

              <Group className="group-right" spacing="xs">
                <Text className="text-progress">1 star</Text>
                <Progress
                  className="progress one-star"
                  value={0}
                  color="#FFE600"
                  size="md"
                  radius="md"
                />
                <Text className="text-progress">0</Text>
              </Group>
            </div>
          </Grid.Col>
        </Grid>
      </Wrapper>
    </>
  );
};
