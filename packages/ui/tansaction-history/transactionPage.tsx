import {
  Card,
  CardSection,
  Divider,
  Image,
  Menu,
  rem,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import { HiOutlineDotsVertical, HiOutlineSearch } from 'react-icons/hi';

import { StyledTable, Wrapper } from './style';
interface ICartProps {
  merchantName: string;
  items: number;
  productImg: string;
  productName: string;
}
export const TransactionHistory = ({
  merchantName,
  items = 0,
  productImg,
  productName,
}: ICartProps) => {
  return (
    <>
      <Wrapper>
        <Text size={48} fw={600}>
          Transactions
        </Text>
        <Tabs color="yellow" defaultValue="all">
          <Tabs.List style={{ marginBottom: '25px' }}>
            <Tabs.Tab value="all">All</Tabs.Tab>
            <Tabs.Tab value="ordered">Ordered</Tabs.Tab>
            <Tabs.Tab value="processing">Processing</Tabs.Tab>
            <Tabs.Tab value="shipped">Shipped</Tabs.Tab>
            <Tabs.Tab value="delivered">Delivered</Tabs.Tab>
            <Tabs.Tab value="cancelled">Cancelled</Tabs.Tab>
            <Tabs.Tab value="searchbar" ml="auto">
              <TextInput
                className="search-input"
                radius="xl"
                leftSection={
                  <HiOutlineSearch
                    style={{ width: rem(18), height: rem(18) }}
                  />
                }
                placeholder="Search Transaction"
                rightSectionWidth={334}
                color="none"
              />
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all">
            <StyledTable>
              <thead>
                <tr>
                  <th colSpan={3}>
                    <Text fz="xl" fw={700}>
                      Product(s)
                    </Text>
                  </th>
                  <th>
                    <Text fw={700}>Date</Text>
                  </th>
                  <th>
                    <Text fw={700}>Quantity</Text>
                  </th>
                  <th>
                    <Text fw={700}>Amount</Text>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan={6}>
                    <OrderRow
                      merchantName={merchantName}
                      items={items}
                      productImg={productImg}
                      productName={productName}
                    />
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </Tabs.Panel>
          <Tabs.Panel value="ordered">To follow</Tabs.Panel>
          <Tabs.Panel value="shipped">To follow</Tabs.Panel>
        </Tabs>
      </Wrapper>
    </>
  );
};
const OrderRow: React.FC<ICartProps> = ({
  merchantName,
  items = 0,
  productImg,
  productName,
}) => {
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
            {merchantName} ({items})
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
            <tr>
              <td colSpan={3}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image width={50} height={50} src={productImg} />
                  <Text fw={700} size={16} style={{ paddingLeft: '20px' }}>
                    {productName}
                  </Text>
                </div>
              </td>
              <td>
                <Text size={16} fw={400}>
                  20 Sept 2023
                </Text>
              </td>
              <td>
                <Text fw={700} color="#A6A6A6">
                  x1
                </Text>
              </td>
              <td>
                <Text fw={700} color="#000">
                  ₱190.00
                </Text>
              </td>
            </tr>
          </tbody>
          <br />
          <tfoot>
            <tr>
              <td colSpan={3}>
                <div>
                  <Text>Status</Text>
                  <Divider size="xl" orientation="vertical" color="black" />
                  <Text> To Ship</Text>
                </div>
              </td>
              <td
                colSpan={3}
                style={{ textAlign: 'right', alignItems: 'center' }}
              >
                <Text
                  fz="sm"
                  fw={100}
                  color="black"
                  style={{ display: 'inline-block', marginLeft: '10px' }}
                >
                  Total items:
                </Text>{' '}
                <Text fz="sm" fw={700} style={{ display: 'inline-block' }}>
                  &#8369; Amount
                </Text>
              </td>
            </tr>
          </tfoot>
        </StyledTable>
      </CardSection>
    </Card>
  );
};
