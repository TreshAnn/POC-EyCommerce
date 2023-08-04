import { ActionIcon, Center, Select, TextInput } from '@mantine/core';
import { HiOutlineSearch } from 'react-icons/hi';

import { orderData, sortData } from './data.sample';
import {
  ComponentWrapper,
  LabelWrapper,
  SelectWrapper,
  Wrapper,
} from './style';

export const Searchbar = () => {
  return (
    <Wrapper>
      <ComponentWrapper>
        <TextInput
          className="search-input"
          radius="xl"
          rightSection={
            <ActionIcon size={32} radius="xl">
              <HiOutlineSearch />
            </ActionIcon>
          }
          placeholder="Ask me anything..."
          rightSectionWidth={42}
        />
        <LabelWrapper style={{ display: 'flex', alignItems: 'center' }}>
          <label>Sort By:</label>
        </LabelWrapper>
        <SelectWrapper>
          <Select className="select select-sort" radius="xl" data={sortData} />
          <Select
            className="select select-order"
            radius="xl"
            data={orderData}
          />
        </SelectWrapper>
      </ComponentWrapper>
    </Wrapper>
  );
};
