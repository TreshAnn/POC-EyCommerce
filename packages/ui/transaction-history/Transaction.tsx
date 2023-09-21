import { Tabs, Text, TextInput } from '@mantine/core';
import { HiOutlineSearch } from 'react-icons/hi';

import { IOrder } from '../../../apps/web/src/views/user-transaction/types';
import { Order } from './Order';
import { StyledTable, Wrapper } from './style';
import OrderTableHead from './OrderTableHead';
export const Transaction = ({ data }: { data: IOrder[] }) => {
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
              <OrderTableHead />
              <tbody>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td colSpan={6}>
                        <Order data={item} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No ordered items available.</td>
                  </tr>
                )}
              </tbody>
            </StyledTable>
          </Tabs.Panel>
          <Tabs.Panel value="ordered">To follow</Tabs.Panel>

          <Tabs.Panel value="shipped">To follow</Tabs.Panel>
          <Tabs.Panel value="delivered">
            <StyledTable>
              <OrderTableHead />
              <tbody>
                {data && data.length > 0 ? (
                  data
                    .filter((item) => item.status === 'delivered')
                    .map((item, index) => (
                      <tr key={index}>
                        <td colSpan={6}>
                          <Order data={item} />
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={6}>No delivered items available.</td>
                  </tr>
                )}
              </tbody>
            </StyledTable>
          </Tabs.Panel>
        </Tabs>
      </Wrapper>
    </>
  );
};
