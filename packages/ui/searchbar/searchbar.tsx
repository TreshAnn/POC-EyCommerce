import { ActionIcon, Center, Select, TextInput } from '@mantine/core';
import { HiOutlineSearch } from 'react-icons/hi';

export const Searchbar = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}
    >
      <div
        style={{
          width: '60%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextInput
          radius="xl"
          style={{
            borderBottom: '1px solid #00000040',
            borderRadius: '20px',
            width: 'calc(100% - 42px)',
            boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
          }}
          rightSection={
            <ActionIcon size={32} radius="xl">
              <HiOutlineSearch />
            </ActionIcon>
          }
          placeholder="Ask me anything..."
          rightSectionWidth={42}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label
            style={{
              width: '70px',
              display: 'inline-block',
              marginLeft: '10px',
              fontSize: '16px',
              lineHeight: '24px',
              textAlign: 'center',
            }}
          >
            Sort By:
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Select
            radius="xl"
            style={{
              marginRight: '5px',
              width: '100px',
              borderBottom: '1px solid #00000040',
              borderRadius: '20px',
              boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
            }}
            data={[
              { value: 'latest', label: 'Latest' },
              { value: 'oldest', label: 'Oldest' },
              { value: 'highP', label: 'Highest' },
              { value: 'lowP', label: 'Lowest' },
              { value: 'cuisine', label: 'Cuisine' },
            ]}
          />
          <Select
            radius="xl"
            style={{
              marginRight: '5px',
              width: '90px',
              borderBottom: '1px solid #00000040',
              borderRadius: '20px',
              boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
            }}
            data={[
              { value: 'asc', label: 'Asc' },
              { value: 'desc', label: 'Desc' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
