import React from 'react';

import AuthUserContext from '../utils/AuthUserContext';
import AuthorizedNavigation from './AuthorizedNavigation';
import UnauthorizedNavigation from './UnauthorizedNavigation';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <AuthorizedNavigation /> : <UnauthorizedNavigation />
    }
  </AuthUserContext.Consumer>
);

export default Navigation;
