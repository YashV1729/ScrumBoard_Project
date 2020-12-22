import React from 'react';

import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpLink;
