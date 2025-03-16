import React from 'react';
import { useNavigate } from 'react-router-dom';

export function withRouter(Component) {
  return function WithRouterComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
} 