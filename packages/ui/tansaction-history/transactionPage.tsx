import { Tabs, Text, TextInput } from '@mantine/core';
import { HiOutlineSearch } from 'react-icons/hi';

import { OrderRow } from './orderComponent';
import { OrderRating } from './OrderRating';
import { StyledTable, Wrapper } from './style';

interface ICartProps {
  merchantName: string;
  items: number;
  productImg: string;
  productName: string;
  date: string;
  totalAmount: number;
}
export const TransactionHistory = ({
  merchantName,
  items = 0,
  productImg,
  productName,
  date,
  totalAmount,
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
                rightSection={
                  <HiOutlineSearch
                    style={{
                      width: '24px',
                      height: '24px',
                      color: '#FFC815',
                      paddingRight: '10px',
                    }}
                  />
                }
                placeholder="Search Transaction"
                rightSectionWidth={30}
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
                      date={date}
                      totalAmount={totalAmount}
                    />
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </Tabs.Panel>
          <Tabs.Panel value="ordered">To follow</Tabs.Panel>
          <Tabs.Panel value="shipped">To follow</Tabs.Panel>
          <Tabs.Panel value="delivered">
            <StyledTable>
              <thead>
                <tr>
                  <th colSpan={3}>
                    <Text fz="xl" fw={700}>
                      Delivered Order(s)
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
                    <OrderRating
                      merchantName={merchantName}
                      items={items}
                      productImg={productImg}
                      productName={productName}
                      date={date}
                      totalAmount={totalAmount}
                    />
                  </td>
                </tr>
              </tbody>
            </StyledTable>
          </Tabs.Panel>
        </Tabs>
      </Wrapper>
    </>
  );
};
