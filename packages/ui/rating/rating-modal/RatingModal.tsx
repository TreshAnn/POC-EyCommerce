import {
  Button,
  DEFAULT_THEME,
  Divider,
  Flex,
  Image,
  Rating,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ChangeEvent, useEffect, useState } from 'react';

import { IOrder } from '../../../../apps/web/src/views/user-transaction/types';
import StarSVG from '../StarSVG';
import {
  StyledImageWrapper,
  StyledModal,
  StyledProductDiv,
  StyledTextarea,
} from './styles';
interface RatingModalProps {
  onRatingSubmit: (rating: RatingData) => void;
  isOpen: boolean;
  onClose: () => void;
  data: IOrder;
}

interface RatingData {
  rating: number;
  title: string;
  description: string;
  productId: string;
}

export const RatingModal = ({
  isOpen,
  onClose,
  data,
  onRatingSubmit,
}: RatingModalProps) => {
  const isMobile = useMediaQuery(
    `(max-width: ${DEFAULT_THEME.breakpoints.xs})`,
  );

  const productRating = {
    rating: 0,
    title: '',
    description: '',
    productId: '',
  };
  const [rating, setRating] = useState(0);
  const [ratingData, setRatingData] = useState<RatingData>(productRating);

  const handleRatingSubmit = async () => {
    // Update the ratingData with the selected rating
    const updatedRatingData = {
      ...ratingData,
      rating: rating,
    };

    // eslint-disable-next-line no-console
    console.log('Rating data:', updatedRatingData);
    onRatingSubmit(updatedRatingData);
  };

  const handleDataChange = (
    property: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = event.currentTarget.value;

    setRatingData({
      ...ratingData,
      [property]: newValue,
    });
  };

  return (
    <>
      <StyledModal opened={isOpen} onClose={onClose} size="80%">
        <Flex pb={10}>
          <StyledImageWrapper>
            {data.orderedItems.map((item, index) => (
              <Image
                key={index}
                fit="contain"
                src={item.productImg}
                alt="Product Image"
              />
            ))}
          </StyledImageWrapper>
          <StyledProductDiv>
            {data.orderedItems.map((item, index) => (
              <Text key={index} size={isMobile ? 'sm' : undefined}>
                {item.productName}
              </Text>
            ))}
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

        <StyledTextarea
          placeholder="Leave a message about the product..."
          label="Product Description"
          value={ratingData.description}
          onChange={(event) => handleDataChange('description', event)}
          withAsterisk
        />
        <Button
          style={{ color: 'black' }}
          fullWidth
          onClick={handleRatingSubmit}
        >
          Submit
        </Button>
      </StyledModal>
    </>
  );
};
