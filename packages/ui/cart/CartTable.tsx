import { Image, Text, DEFAULT_THEME, Grid } from '@mantine/core';
import { useState } from 'react';
import { TiTrash } from 'react-icons/ti';
import { Quantity } from '../quantity/Quantity';
import { StyledTable, StyledScrollArea } from './styles';
import { useMediaQuery } from '@mantine/hooks';
import { data } from './sample.data';

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
  const [cartItems, setCartItems] = useState(data);

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
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = calculateSubtotal(cartItems);

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
            {cartItems.map((item) => (
              <CartRow
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.id, newQuantity)
                }
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={5} style={{ textAlign: 'right' }}>
                <Text fz="sm" fw={100} c="black">
                  Total ({totalItems} items):{' '}
                  <Text fz="sm" fw={700}>
                    ₱{subtotal.toFixed(2)}
                  </Text>
                </Text>
              </th>
              <th colSpan={1}>
                <button
                  style={{
                    marginLeft: '20px',
                    backgroundColor: '#FFD500',
                    color: 'black',
                  }}
                >
                  Checkout
                </button>
              </th>
            </tr>
          </tfoot>
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
    </StyledScrollArea>
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
            <td className="col-two">
              <Text fz="xs" align="start">
                {item.productName}
              </Text>
              <Image
                width={75}
                height={75}
                src={item.imageSrc}
                alt="With default placeholder"
                withPlaceholder
              />
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
