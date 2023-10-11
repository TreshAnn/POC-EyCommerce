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
import { ChangeEvent, useState } from 'react';

import { IOrder } from '../../../../apps/web/src/views/user-transaction/types';
import StarSVG from '../StarSVG';
import {
  StyledImageWrapper,
  StyledModal,
  StyledProductDiv,
  StyledTextarea,
  StyledTitleArea,
} from './styles';
interface RatingModalProps {
  onRatingSubmit: (rating: RatingData) => void;
  isOpen: boolean;
  onClose: () => void;
  data: IOrder;
  productId: string;
  selectedProduct: IOrderItem;
}

interface RatingData {
  rating: number;
  title: string;
  description: string;
  productId: string;
}

interface IOrderItem {
  productId: string;
  productName: string;
  productImg: string;
}

export const RatingModal = ({
  isOpen,
  onClose,
  data,
  onRatingSubmit,
  productId,
  selectedProduct,
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
      productId: productId,
    };
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
      <StyledModal opened={isOpen} onClose={onClose} size="50%">
        <Flex pb={10}>
          <StyledImageWrapper>
            <Image
              fit="contain"
              src={selectedProduct.productImg}
              alt="Product Image"
            />
          </StyledImageWrapper>
          <StyledProductDiv>
            <Text size={isMobile ? 'sm' : undefined}>
              {selectedProduct.productName}
            </Text>
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

        <StyledTitleArea
          placeholder="Rating Title"
          label="Rating Title"
          value={ratingData.title}
          onChange={(event) => handleDataChange('title', event)}
          withAsterisk
        />

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
