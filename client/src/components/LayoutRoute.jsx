import React from 'react';
import { Route } from 'react-router-dom';
import PageLayout from "./layouts/PageLayout";

const LayoutRoute = ({component, exact = false, path, Layout = PageLayout}) => {
  return <Route exact={exact}
                path={path}
                render={props => <Layout component={React.createElement(component, props)}/>}
  />
}

export default LayoutRoute;
