import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import DefaultPage from './DefaultPage';
import { AuthService } from './';

/**
 * HOC to protect secure page.
 * @description Check if user is loggedIn
 * @param {ReactComponent} Page 
 * @param {Object} options 
 */
const ProtectedPageHoc = (Page, options = {}) => {

  @DefaultPage
  class ProtectedPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = { isLoading: true };
    }

    componentDidMount() {
      const { redirectTo } = options;

      if (!AuthService.isLogged() && typeof redirectTo === 'string') {
        Router.push(redirectTo);
      }
      this.setState({ isLoading: false });
    }

    render() {
      const { isLoading } = this.state;
      if (isLoading) return <div>Loading...</div>
      if (!isLoading && !AuthService.isLogged()) return <div>secured page</div>
      return <Page {...this.props} />
    }
  };

  return ProtectedPage;
};

export default function (Page) {
  return typeof Page === 'function' ?
    ProtectedPageHoc(Page) :
    Page => ProtectedPageHoc(Page, arguments[0]);
}
