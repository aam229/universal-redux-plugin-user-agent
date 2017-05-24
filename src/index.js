import React, { Component, PropTypes } from 'react'
import { hooks, environments, positions, register } from 'universal-redux';

class UserAgentProvider extends Component {
  static childContextTypes = {
    userAgent: PropTypes.string
  };

  getChildContext() {
    const userAgent = this.props.headers ? this.props.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    return this.props.children;
  }
}

register(hooks.CREATE_ROOT_COMPONENT, function(promise, {headers}){
  return promise.then((props) => ({
    ...props,
    root: <UserAgentProvider headers={headers}>
      {props.root}
    </UserAgentProvider>
  }));
}, {
  environments: [
    environments.SERVER,
    environments.CLIENT
  ],
  position: positions.AFTER
});


