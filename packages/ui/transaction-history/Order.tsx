import {
  Card,
  CardSection,
  Divider,
  Group,
  Image,
  Menu,
  Text,
  Button,
} from '@mantine/core';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import { IOrder } from '../../../apps/web/src/views/user-transaction/types';
import { StyledTable } from './style';

export const Order = ({ data }: { data: IOrder }) => {
  return (
    <Card
      withBorder
      style={{
        marginTop: '25px',
      }}
    >
      <CardSection
        withBorder
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: '1',
          height: '48px',
          background: 'rgba(218, 218, 218, 0.26)',
          padding: '10px 20px',
        }}
      >
        <div>
          <Text fw={700} size={20}>
            {data.merchantName} ({2})
          </Text>
        </div>
        <div>
          <Menu position="bottom-end">
            <Menu.Target>
              <HiOutlineDotsVertical />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>View Details</Menu.Item>
              <Menu.Item>Contact Seller</Menu.Item>
              <Menu.Item>Cancel Order</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </CardSection>
      <br />
      <CardSection>
        <StyledTable>
          <tbody>
            {data.orderedItems.map((item, index) => (
              <tr key={index}>
                <td colSpan={3}>
                  <Group>
                    <Image
                      width={50}
                      height={50}
                      src={item.productImg}
                      style={{ paddingLeft: '20px' }}
                    />
                    <Text fw={700} size={16} style={{ paddingLeft: '20px' }}>
                      {item.productName}
                    </Text>
                  </Group>
                </td>

                {/* Conditionally render this button */}
                {data.status === 'delivered' && (
                  <td>
                    <Button fz="md" style={{ color: 'black' }}>
                      Rate Item
                    </Button>
                  </td>
                )}
                <td>
                  <Text size={16} fw={400}>
                    {data.timestamp.orderedAt}
                  </Text>
                </td>
                <td>
                  <Text fw={700} color="#A6A6A6">
                    x{item.quantity}
                  </Text>
                </td>
                <td>
                  <Text fw={700} color="#000">
                    ₱{item.price.toFixed(2)}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
          <br />
          <tfoot>
            <tr>
              <td colSpan={3}>
                <Group>
                  <Text
                    fz="sm"
                    fw={100}
                    color="black"
                    style={{ display: 'inline-block', marginLeft: '10px' }}
                  >
                    Status
                  </Text>
                  <Divider orientation="vertical" />
                  <Text
                    fz="sm"
                    fw={700}
                    color="#FFC815"
                    style={{ display: 'inline-block' }}
                  >
                    To Ship
                  </Text>
                </Group>
              </td>
              <td colSpan={3}>
                <Group className="td-footer">
                  <Text
                    fz="sm"
                    fw={100}
                    color="black"
                    style={{ display: 'inline-block', marginLeft: '10px' }}
                  >
                    Ordered Total:
                  </Text>
                  <Divider orientation="vertical" />
                  <Text
                    fw={700}
                    color="#FFC815"
                    style={{ display: 'inline-block' }}
                  >
                    &#8369; {data.totalAmount}
                  </Text>
                </Group>
              </td>
            </tr>
          </tfoot>
        </StyledTable>
      </CardSection>
    </Card>
  );
};
