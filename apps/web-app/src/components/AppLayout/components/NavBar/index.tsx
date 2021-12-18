import { Flex, FlexProps, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import routes from '../../../../app/routes';
import { useAuthentication } from '../../../../hooks/authentication';

interface Props extends FlexProps {}

function NavBar(props: Props) {
  const [{ isAuthenticated }] = useAuthentication();

  return (
    <Flex alignItems="center" as="header" height="10" {...props}>
      <Flex as="nav" flexGrow={1} justifyContent="center">
        <Link as={RouterLink} to={routes.HOME}>
          <h1>Shifumi</h1>
        </Link>
      </Flex>

      {isAuthenticated ? <p>Profile</p> : null}
    </Flex>
  );
}

export default NavBar;
