import { Grid, Group, Progress, Rating, Text } from '@mantine/core';

import { Wrapper } from './style';

interface IRatingProps {
  reviewCount?: number;
  ratingValue?: number;
}

// xs = 576px
// sm = 768px
// md = 992px
// lg = 1200px
// xl = 1408px

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
                <Rating
                  emptySymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.5 12C2.5 6.48 6.97 2 12.49 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.49 22C6.97 22 2.5 17.52 2.5 12ZM12.5 15.45L15.72 17.39C16.1 17.62 16.56 17.28 16.46 16.85L15.61 13.18L18.44 10.73C18.78 10.44 18.6 9.89 18.16 9.85L14.42 9.53L12.96 6.09C12.79 5.68 12.21 5.68 12.04 6.09L10.58 9.54L6.84 9.86C6.4 9.9 6.22 10.45 6.55 10.74L9.38 13.19L8.53 16.85C8.43 17.28 8.9 17.62 9.28 17.39L12.5 15.45Z"
                        fill="#CCCCCC"
                      />
                    </svg>
                  }
                  fullSymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.5 12C2.5 6.48 6.97 2 12.49 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.49 22C6.97 22 2.5 17.52 2.5 12ZM12.5 15.45L15.72 17.39C16.1 17.62 16.56 17.28 16.46 16.85L15.61 13.18L18.44 10.73C18.78 10.44 18.6 9.89 18.16 9.85L14.42 9.53L12.96 6.09C12.79 5.68 12.21 5.68 12.04 6.09L10.58 9.54L6.84 9.86C6.4 9.9 6.22 10.45 6.55 10.74L9.38 13.19L8.53 16.85C8.43 17.28 8.9 17.62 9.28 17.39L12.5 15.45Z"
                        fill="#FFD500"
                      />
                    </svg>
                  }
                  value={ratingValue}
                  readOnly
                />
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
