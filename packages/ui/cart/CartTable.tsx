import { Button, DEFAULT_THEME, Grid, Image, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { TbTrashX } from 'react-icons/tb';

import { Cart, OrderedItems } from '../../../apps/web/src/views/cart/types';
import { Quantity } from '../quantity/Quantity';
import { StyledScrollArea, StyledTable } from './styles';

interface ICartProps {
  item: OrderedItems;
  onQuantityChange: (newQuantity: number) => void;
  deleteRowItem: (key: string) => void;
  inventory: number;
}
interface Props {
  data: Cart;
  totalCartItemAmount: number;
  totalAmountHandler: (value: number) => void;
  updateToCartHandler: (id: string, quantity?: number) => void;
  deleteItem: (key: string) => void;
}
const CartTable = ({
  data: { orderedItems, totalAmount },
  totalCartItemAmount,
  totalAmountHandler,
  updateToCartHandler,
  deleteItem,
}: Props) => {
  const [cartItems, setCartItems] = useState(orderedItems);
  const [itemId, setItemId] = useState<string>('');

  useEffect(() => {
    setCartItems(orderedItems);
  }, [orderedItems]);
  const calculateSubtotal = (items: OrderedItems[]) => {
    return items.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0,
    );
  };
  const handleCartItemQuantityChange = (
    itemId: string,
    newQuantity: number,
  ) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItemId(itemId);
    setCartItems(updatedCartItems);
    const newSubtotal = calculateSubtotal(updatedCartItems);
  };
  const web = useMediaQuery(`(min-width: ${DEFAULT_THEME.breakpoints.sm})`);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = calculateSubtotal(cartItems);

  useEffect(() => {
    const count = setTimeout(() => {
      totalAmountHandler(subtotal);
    }, 500);
    return () => {
      clearTimeout(count);
    };
  }, [subtotal]);
  useEffect(() => {
    const count = setTimeout(() => {
      const cartItemFiltered = cartItems.filter(
        (item) => item.productId === itemId,
      );
      updateToCartHandler(itemId, cartItemFiltered[0]?.quantity);
    }, 300);
    return () => {
      clearTimeout(count);
    };
  }, [subtotal]);
  const formattedTotalAmount = totalCartItemAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleCheckoutButtonClick = () => {
    window.location.href = '/checkout';
  };
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
                key={item.productId}
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.productId, newQuantity)
                }
                deleteRowItem={deleteItem}
                inventory={item.productInventory}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={5}
                style={{ textAlign: 'right', alignItems: 'center' }}
              >
                <Text
                  fz="sm"
                  fw={100}
                  color="black"
                  style={{ display: 'inline-block', marginLeft: '10px' }}
                >
                  Total ({totalItems} items):
                </Text>{' '}
                <Text fz="sm" fw={700} style={{ display: 'inline-block' }}>
                  &#8369;{formattedTotalAmount}
                </Text>
              </td>
              <td colSpan={1}>
                <Button
                  fz="md"
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    marginTop: 0,
                  }}
                  onClick={handleCheckoutButtonClick}
                >
                  Checkout
                </Button>
              </td>
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
                key={item.productId}
                item={item}
                onQuantityChange={(newQuantity: number) =>
                  handleCartItemQuantityChange(item.productId, newQuantity)
                }
                deleteRowItem={deleteItem}
                inventory={item.productInventory}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={2}
                style={{ textAlign: 'right', alignItems: 'center' }}
              >
                <Text
                  fz="sm"
                  fw={100}
                  color="black"
                  style={{ display: 'inline-block', marginLeft: '10px' }}
                >
                  Total ({totalItems} items):
                </Text>{' '}
                <Text fz="sm" fw={700} style={{ display: 'inline-block' }}>
                  &#8369;{formattedTotalAmount}
                </Text>
              </td>
              <td colSpan={2}>
                <Button
                  fz="md"
                  style={{
                    color: 'black',
                    alignItems: 'center',
                    marginTop: 0,
                  }}
                  onClick={handleCheckoutButtonClick}
                >
                  Checkout
                </Button>
              </td>
            </tr>
          </tfoot>
        </StyledTable>
      )}
    </StyledScrollArea>
  );
};
const CartRow: React.FC<ICartProps> = ({
  item,
  onQuantityChange,
  deleteRowItem,
  inventory,
}) => {
  const handleDeleteItem = () => {
    deleteRowItem(item.productId);
  };
  const web = useMediaQuery(`(min-width: ${DEFAULT_THEME.breakpoints.sm})`);
  return (
    <>
      {web ? (
        <>
          <tr key={item.productId}>
            <td>
              <Image
                width={120}
                height={120}
                src={item?.productImg}
                alt="With default placeholder"
                withPlaceholder
              />
            </td>
            <td className="col-two">
              <Text align="start">{item.productName}</Text>
            </td>
            <td>
              &#8369;{' '}
              {item.productPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </td>
            <td>
              <Quantity
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => {
                  onQuantityChange(newQuantity);
                }}
                maxQty={inventory}
              />
            </td>
            <td>
              <Text size="lg" fw={700} color="yellow">
                &#8369;{' '}
                {(item.quantity * item.productPrice).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </td>
            <td>
              <Button
                onClick={handleDeleteItem}
                color="red"
                style={{ width: '40px', padding: '0' }}
              >
                <TbTrashX
                  color="white"
                  size={20}
                  style={{
                    width: '30px',
                    height: '30px',
                  }}
                />
              </Button>
              {/* <Button onClick={() => testIncrease(item.productID, 1)}>+</Button> */}
            </td>
          </tr>
        </>
      ) : (
        <>
          <tr key={item.productId}>
            <td className="col-two">
              <Text fz="xs" align="start">
                {item.productName}
              </Text>
              <Image
                width={75}
                height={75}
                src={item?.productImg}
                alt="With default placeholder"
                withPlaceholder
              />
            </td>
            <td>
              <Text fz="xs">
                &#8369;{' '}
                {item.productPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </td>
            <td>
              <Quantity
                quantity={item.quantity}
                onQuantityChange={(newQuantity) => {
                  onQuantityChange(newQuantity);
                }}
                maxQty={inventory}
              />
            </td>
            <td>
              <Grid>
                <Grid.Col span={8}>
                  <Text fz="xs" fw={700} c="brand">
                    <Text fz="xs">
                      &#8369;{' '}
                      {item.productPrice.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button
                    onClick={handleDeleteItem}
                    color="red"
                    style={{ width: '40px', padding: '0' }}
                  >
                    <TbTrashX
                      color="white"
                      size={14}
                      style={{ width: '30px', height: '30px' }}
                    />
                  </Button>
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
