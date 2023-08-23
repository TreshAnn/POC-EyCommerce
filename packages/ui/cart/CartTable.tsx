import { Image, Text, DEFAULT_THEME, Grid } from '@mantine/core';
import { useState } from 'react';
import { TiTrash } from 'react-icons/ti';
import { Quantity } from '../quantity/Quantity';
import { StyledTable, StyledScrollArea } from './styles';
import { useMediaQuery } from '@mantine/hooks';
import { data } from './sample.data';
import { Cart, OrderedItems } from '../../../apps/web/src/views/cart/types';

interface ICartItem {
  id: number;
  imageSrc: string;
  merchant: string;
  productName: string;
  price: number;
  quantity: number;
}

interface ICartProps {
  item: OrderedItems;
  onQuantityChange: (newQuantity: number) => void;
}

interface Props {
  data: Cart;
}

const CartTable = ({ data: { orderedItems } }: Props) => {
  const [cartItems, setCartItems] = useState(orderedItems);
  // const { data: cartItems, isLoading, isError, error } = useGetCart({});

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
    <StyledScrollArea>
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
            {cartItems.map((item, index) => (
              <CartRow
                key={index}
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.quantity, newQuantity)
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
                  handleCartItemQuantityChange(item.quantity, newQuantity)
                }
              />
            ))}
          </tbody>
        </StyledTable>
      )}
    </StyledScrollArea>
  );
};

const CartRow: React.FC<ICartProps> = ({ item, onQuantityChange }) => {
  const web = useMediaQuery(`(min-width: ${DEFAULT_THEME.breakpoints.sm})`);

  return (
    <>
      {web ? (
        <>
          <tr key={item.productID}>
            <td>
              <Image
                width={120}
                height={120}
                src={item?.productImg?.ImgURL}
                alt="With default placeholder"
                withPlaceholder
              />
            </td>
            <td className="col-two">
              <Text align="start">{item.productName}</Text>
            </td>
            <td>₱{item.productPrice.toFixed(2)}</td>
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
                ₱{(item.quantity * item.productPrice).toFixed(2)}
              </Text>
            </td>
            <td>
              <TiTrash color="red" size={40} />
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr key={item.productID}>
            <td className="col-two">
              <Text fz="xs" align="start">
                {item.productName}
              </Text>
              <Image
                width={75}
                height={75}
                src={item?.productImg?.ImgURL}
                alt="With default placeholder"
                withPlaceholder
              />
            </td>
            <td>
              <Text fz="xs">₱{item.productPrice.toFixed(2)}</Text>
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
                    ₱{(item.quantity * item.productPrice).toFixed(2)}
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
