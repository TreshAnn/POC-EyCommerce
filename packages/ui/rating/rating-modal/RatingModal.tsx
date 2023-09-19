import {
  Modal,
  Textarea,
  Button,
  Title,
  Rating,
  Flex,
  Text,
  Image,
  Divider,
  DEFAULT_THEME,
} from '@mantine/core';
import StarSVG from '../StarSVG';
import { StyledImageWrapper, StyledProductDiv } from './styles';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RatingModal = ({ isOpen, onClose }: RatingModalProps) => {
  const isMobile = useMediaQuery(
    `(max-width: ${DEFAULT_THEME.breakpoints.xs})`,
  );
  const [rating, setRating] = useState(0);

  return (
    <>
      <Modal opened={isOpen} onClose={onClose} size="80%">
        <Flex pb={10}>
          <StyledImageWrapper>
            <Image
              fit="contain"
              src={'https://placehold.co/540x540.png'}
              alt="Product Image"
            />
          </StyledImageWrapper>
          <StyledProductDiv>
            <Text size={isMobile ? 'sm' : undefined}>Product Name</Text>
            <Text size={isMobile ? 'sm' : undefined}>Product Description</Text>
          </StyledProductDiv>
        </Flex>
        <Divider my="sm" />

        <Flex py={20} align="center" justify="space-between">
          <Title order={isMobile ? 4 : 2}>Product Rating</Title>
          <Rating
            emptySymbol={
              <StarSVG
                isFilled={false}
                width={isMobile ? 25 : 40}
                height={isMobile ? 24 : 39}
              />
            }
            fullSymbol={
              <StarSVG
                isFilled={true}
                width={isMobile ? 25 : 40}
                height={isMobile ? 24 : 39}
              />
            }
            value={rating}
            onChange={setRating}
          />
        </Flex>

        <Textarea placeholder="Leave a message about the product..." />
        <Button style={{ color: 'black' }} fullWidth>
          Submit
        </Button>
      </Modal>
    </>
  );
};
