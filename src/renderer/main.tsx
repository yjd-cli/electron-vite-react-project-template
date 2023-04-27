// 不要全局引入该样式，请通过按需加载的方式引入
// import 'antd/dist/antd.css';
import './index.less';

import { InspectorWrapper } from '@renderer/components/inspector/InspectorWrapper';
import { routesConfig } from '@renderer/routes/routes-config';
import store from '@renderer/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter, useRoutes } from 'react-router-dom';

function RouteElement() {
  const element = useRoutes(routesConfig);
  return element;
}

function RootContainer() {
  return (
    <InspectorWrapper>
      <Provider store={store}>
        <HashRouter>
          <RouteElement />
        </HashRouter>
      </Provider>
    </InspectorWrapper>
  );
}

ReactDOM.render(<RootContainer />, document.getElementById('root'));
