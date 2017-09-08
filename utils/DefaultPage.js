import React from 'react';
import Router from 'next/router';

import { Sidebar } from './../components';
import { CHANGE_USER_AUTH } from './../types';
import './../styles/globals';

import { AuthService, WithReduxSaga } from './';

import {
  MainWrapper,
  MainContainer,
} from './../styles/defaultPageStyles';

export default (Page) => {

  @WithReduxSaga
  class DefaultPage extends React.Component {

    componentWillMount() {
      if (process.browser) {
        this.props.dispatch({ type: CHANGE_USER_AUTH, payload: AuthService.isLogged() });
      }
    }

    render() {
      return (
        <MainContainer>
          <Sidebar />
          <MainWrapper>
            <Page {...this.props} />
          </MainWrapper>
        </MainContainer>
      );
    }
  }

  return DefaultPage;
};
