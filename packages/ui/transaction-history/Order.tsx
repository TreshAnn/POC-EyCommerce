import {
  Button,
  Card,
  CardSection,
  Divider,
  Group,
  Image,
  Menu,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

import { Rating } from '../../../apps/web/src/views/rating/types';
import { IOrder } from '../../../apps/web/src/views/user-transaction/types';
import { RatingModal } from '../rating/rating-modal/RatingModal';
import { StyledTable } from './style';

interface OrderComponentProps {
  data: IOrder;
  onRatingSubmit: (data: Rating) => void;
}

export const Order: React.FC<OrderComponentProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

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
            {data.merchantName} ({data.orderedItems.length})
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
                    <Button
                      fz="md"
                      style={{ color: 'black' }}
                      onClick={handleOpenModal}
                    >
                      Rate Item
                    </Button>
                    <RatingModal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      data={data}
                    />
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
                    &#8369;{' '}
                    {item.price.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </td>
              </tr>
            ))}
          </tbody>
          <br />
          <tfoot>
            <tr>
              <td colSpan={4}>
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
                    {data.status}
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
                    &#8369;{' '}
                    {data.totalAmount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
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
