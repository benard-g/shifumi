import { Flex, FlexProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import NavBar from './components/NavBar';

interface Props extends FlexProps {}

function AppLayout(props: PropsWithChildren<Props>) {
  const { children, ...rest } = props;

  return (
    <Flex
      bgGradient="linear(to-b, purple.300, purple.600)"
      flexDirection="column"
      flexGrow={1}
      {...rest}
    >
      <NavBar />

      {children}
    </Flex>
  );
}

export default AppLayout;
