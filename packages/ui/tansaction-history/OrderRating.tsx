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
import { MenuTarget } from '@mantine/core/lib/Menu/MenuTarget/MenuTarget';
import { useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { HiBuildingStorefront } from 'react-icons/hi2';

import { RatingModal } from '../rating/rating-modal/RatingModal';
import { StyledTable } from './style';

interface IOrderProps {
  merchantName: string;
  items: number;
  productImg: string;
  productName: string;
  date: string;
  totalAmount: number;
}

export const OrderRating: React.FC<IOrderProps> = ({
  merchantName,
  items = 0,
  productImg,
  productName,
  date,
  totalAmount,
}) => {
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
        <div
          style={{
            display: 'flex',
          }}
        >
          <HiBuildingStorefront
            style={{
              marginRight: '10px',
              marginTop: '4px',
              fontSize: '18px',
            }}
          />
          <Text fw={700} size={20}>
            {merchantName} ({items})
          </Text>
        </div>
        <div>
          <Menu position="bottom-end">
            <Menu.Target>
              <HiOutlineDotsVertical />
            </Menu.Target>
            <Menu.Dropdown>
              {/* will be changed */}
              <Menu.Item>View Details</Menu.Item>
              <Menu.Item>Contact Seller</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </CardSection>
      <br />
      <CardSection>
        <StyledTable>
          <tbody>
            <tr>
              <td colSpan={3}>
                <Group>
                  <Image
                    width={50}
                    height={50}
                    src={productImg}
                    style={{ paddingLeft: '20px' }}
                  />
                  <Text fw={700} size={16} style={{ paddingLeft: '20px' }}>
                    {productName}
                  </Text>
                </Group>
              </td>
              <td>
                <Text fw={400} size={16}>
                  {date}
                </Text>
              </td>
              <td>
                <Text fw={700} color="#A6A6A6">
                  x1
                </Text>
              </td>
              <td>
                <Text fw={700} color="#000">
                  &#8369;190.00
                </Text>
              </td>
            </tr>
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
                    style={{
                      display: 'inline-block',
                    }}
                  >
                    Delivered
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
                    &#8369; {totalAmount}
                  </Text>
                </Group>
              </td>
            </tr>
          </tfoot>
        </StyledTable>
        <Group className="btn-group">
          <tr>
            <Button onClick={handleOpenModal} className="btn rating-btn">
              Rate
            </Button>
            <RatingModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </tr>
          <tr>
            <Button className="btn buy-again-btn">Buy Again</Button>
          </tr>
        </Group>
      </CardSection>
    </Card>
  );
};
