import React from 'react';

import { byPropKey } from '../../utils';
import { Form, Icon, Input } from 'antd';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import { FormButton } from '../../components/FormButton';
import { ErrorMessage } from '../../components/ErrorMessage';
import { FormContainer } from '../../components/FormContainer';

const FormItem = Form.Item;

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

class SignInForm extends React.Component {
  state = { ...INITIAL_STATE };

  async onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const { history } = this.props;

    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(routes.BOARDS);
      })
      .catch(error => {
        this.setState(byPropKey('error', error.message));
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={event => this.onSubmit(event)}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
                onChange={event =>
                  this.setState(byPropKey('email', event.target.value))
                }
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                onChange={event =>
                  this.setState(byPropKey('password', event.target.value))
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <FormButton type="primary" htmlType="submit">
              Log in
            </FormButton>
          </FormItem>
          <ErrorMessage>{error}</ErrorMessage>
        </Form>
      </FormContainer>
    );
  }
}

const WrappedSignInForm = Form.create()(SignInForm);

export default WrappedSignInForm;
