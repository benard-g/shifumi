import { Button, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../app/routes';

function HomePage() {
  const [showBigBlock, setShowBigBlock] = React.useState(true);

  return (
    <div>
      <h1>Shifumi - Home</h1>

      <Link to={routes.GAME_ROOM_CREATE}>Go to game creation</Link>

      <Button onClick={() => setShowBigBlock(!showBigBlock)}>
        {showBigBlock ? 'Hide block' : 'Reveal block'}
      </Button>

      {showBigBlock ? (
        <Flex alignItems="center" flexDirection="column">
          {[1, 2, 3, 4, 5].map((v) => (
            <Flex
              _first={{ marginTop: 0 }}
              alignItems="center"
              bgColor={'blue.300'}
              borderRadius={8}
              height={350}
              justifyContent="center"
              key={v}
              marginTop={'5'}
              width="80%"
            >
              Box
            </Flex>
          ))}
        </Flex>
      ) : null}
    </div>
  );
}

export default HomePage;
