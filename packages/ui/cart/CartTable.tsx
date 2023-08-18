import {
  Image,
  Text,
  DEFAULT_THEME,
  Group,
  ScrollArea,
  Grid,
} from '@mantine/core';
import { useState } from 'react';
import { TiTrash } from 'react-icons/ti';
import { Quantity } from '../quantity/Quantity';
import { StyledTable } from './styles';
import { useMediaQuery } from '@mantine/hooks';

interface ICartItem {
  id: number;
  imageSrc: string;
  merchant: string;
  productName: string;
  price: number;
  quantity: number;
}

interface ICartProps {
  item: ICartItem;
  onQuantityChange: (newQuantity: number) => void;
}

const CartTable = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      imageSrc:
        'https://retailminded.com/wp-content/uploads/2016/03/EN_GreenOlive-1.jpg',
      merchant: 'Sample Merchant 1',
      productName: 'Product 1',
      price: 200.0,
      quantity: 4,
    },
    {
      id: 2,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 2',
      productName: 'Product 2',
      price: 150.0,
      quantity: 2,
    },
    {
      id: 3,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 4,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 5,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 6,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 7,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 8,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 9,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 10,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },
    {
      id: 11,
      imageSrc: 'path-to-image-2.jpg',
      merchant: 'Sample Merchant 3',
      productName: 'Product 2',
      price: 250.0,
      quantity: 2,
    },

    // Add more items as needed to test
  ]);

  const calculateSubtotal = (items: ICartItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCartItemQuantityChange = (
    itemId: number,
    newQuantity: number,
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    const newSubtotal = calculateSubtotal(updatedCartItems);
  };

  const web = useMediaQuery(`(min-width: ${DEFAULT_THEME.breakpoints.sm})`);

  return (
    <ScrollArea h={650}>
      {web ? (
        <StyledTable fontSize="md">
          <thead>
            <tr>
              <th colSpan={2}>
                <Text fz="xl" fw={700}>
                  Cart
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Product Price
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Quantity
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Total Price
                </Text>
              </th>
              <th>
                <Text fz="md" fw={100}>
                  Action
                </Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <CartRow
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.id, newQuantity)
                }
              />
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th colSpan={2}>
                <Text fz="md" fw={700}>
                  Cart
                </Text>
              </th>
              <th></th>
              <th>
                <Text fz="sm" fw={100}>
                  Total Price
                </Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <CartRow
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.id, newQuantity)
                }
              />
            ))}
          </tbody>
        </StyledTable>
      )}
    </ScrollArea>
  );
};

const CartRow: React.FC<ICartProps> = ({ item, onQuantityChange }) => {
  const web = useMediaQuery(`(min-width: ${DEFAULT_THEME.breakpoints.sm})`);

  return (
    <>
      {web ? (
        <>
          <tr key={item.id}>
            <td>
              <Image
                width={120}
                height={120}
                src={item.imageSrc}
                alt="With default placeholder"
                withPlaceholder
              />
            </td>
            <td className="col-two">
              <Text align="start">{item.productName}</Text>
            </td>
            <td>₱{item.price.toFixed(2)}</td>
            <td>
              <Quantity
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => {
                  onQuantityChange(newQuantity);
                }}
              />
            </td>
            <td>
              <Text fz="xl" fw={700} c="brand">
                ₱{(item.quantity * item.price).toFixed(2)}
              </Text>
            </td>
            <td>
              <TiTrash color="red" size={40} />
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr key={item.id}>
            {/* <td> TO DO - remove once approved
            <Image
              width={120}
              height={120}
              src={item.imageSrc}
              alt="With default placeholder"
              withPlaceholder
            />
          </td> */}
            <td className="col-two">
              <Text fz="xs" align="start">
                {item.productName}
              </Text>
            </td>
            <td>
              <Text fz="xs">₱{item.price.toFixed(2)}</Text>
            </td>
            <td>
              <Quantity
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => {
                  onQuantityChange(newQuantity);
                }}
              />
            </td>
            <td>
              <Grid>
                <Grid.Col span={8}>
                  <Text fz="xs" fw={700} c="brand">
                    ₱{(item.quantity * item.price).toFixed(2)}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <TiTrash color="red" size={14} />
                </Grid.Col>
              </Grid>
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default CartTable;
