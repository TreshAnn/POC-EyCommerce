import { Button } from '@mantine/core';
import { useState } from 'react';
import './header.css';

export const Header = () => {
  //Temp Conditional Statement for Logged In Navigation
  const [userStatus, setUserStatus] = useState<boolean>(false);
  return (
    <>
      <div className="header-overlay">
        <div className="flex-item">
          <p>EYCommerce</p>
        </div>
        <div className="flex-item-02">
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Services</a>
          <a href="#">FAQ</a>
        </div>
        <div className="flex-item-03 flex-extra">
          {userStatus ? (
            <p>Logged In</p>
          ) : (
            <div className="flex-extra">
              <Button radius="md" color="yellow" variant="filled" type="button">
                Login
              </Button>
              <Button
                radius="md"
                color="yellow"
                variant="outline"
                type="button"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// <div className="header-overlay">
//     <Container className="header-container" px={18}>
//         <Flex
//             justify="center"
//             align="center"
//             direction="row"
//             gap={32}
//         >
//             <Flex
//                 justify="flex-start"
//                 align="center"
//                 className='header-width'
//             >
//                 <p>
//                     EYCommerce
//                 </p>
//             </Flex>
//             <Flex
//                 className='header-width-02'
//                 justify="center"
//                 align="center"
//                 direction="row"
//                 gap={30}
//             >
//                 <a href='#'>Home</a>
//                 <a href='#'>About Us</a>
//                 <a href='#'>Services</a>
//                 <a href='#'>FAQ</a>
//             </Flex >
//             <Flex
//                 className='header-width'
//                 gap={10}
//                 justify="flex-end"
//                 align="center"
//             >
//                 {userStatus ? (
//                     <p>Logged In</p>
//                 ) : (
//                     <Container>
//                         <Button radius='md' color='yellow' variant='filled' type='button'>Login</Button>
//                         <Button radius='md' color='yellow' variant='outline' type='button'>Register</Button>
//                     </Container>
//                 )}
//             </Flex>
//         </Flex>
//     </Container>
// </div>
