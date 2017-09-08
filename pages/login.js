import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Link from 'next/link';
import Router from 'next/router';

import { HeaderText } from './../components';
import {
  MainFormWrapper,
  InputWrapper,
  Button,
  InlineRow,
  NavLink,
  TextDescription,
  AuthContainer,
  FormTitle,
} from './../styles/defaultPageStyles';
import { DefaultPage, WithReduxSaga, AuthService } from './../utils';
import { login } from './../actions';

@DefaultPage
@reduxForm({ form: 'login' })
@connect(
  state => ({ auth: state.auth }),
  dispatch => ({ actions: bindActionCreators({ login }, dispatch) })
)
export default class Login extends React.Component {

  componentWillMount() {
    if (this.props.auth.isAuth) {
      Router.replace('/');
    }
  }

  onSuccess = () => Router.push('/');
  onSubmit = values => this.props.actions.login(values, this.onSuccess);

  render() {
    const { handleSubmit, auth: { loginError, processing } } = this.props;
    return (
      <AuthContainer>
        <MainFormWrapper onSubmit={handleSubmit(this.onSubmit)}>
          <FormTitle>Log In</FormTitle>
          <InputWrapper>
            <Field name="email" component="input" type="email" placeholder="Email" />
          </InputWrapper>
          <InputWrapper>
            <Field name="password" component="input" type="password" />
          </InputWrapper>
          <InlineRow>
            <Button type="submit">Log in</Button>
            <TextDescription>
              Don’t have an account?
              <Link prefetch href={'/signup'}>
                <NavLink>Create an account</NavLink>
              </Link>
            </TextDescription>
          </InlineRow>
        </MainFormWrapper>
      </AuthContainer>
    );
  }
}
