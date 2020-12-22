import React from 'react';
import { withRouter } from 'react-router-dom';

import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';
import { FormContainer } from '../../components/FormContainer';

const SignInScreen = ({ history }) => (
  <FormContainer>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </FormContainer>
);

export default withRouter(SignInScreen);
