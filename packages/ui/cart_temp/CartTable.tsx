import { Table, Image } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function CartTable() {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>
        <Image
          width={120}
          height={120}
          src={''}
          alt="With default placeholder"
          withPlaceholder
        />
      </td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Table withBorder>
      <thead>
        <tr>
          <th>Cart</th>
          <th>Product Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default CartTable;
