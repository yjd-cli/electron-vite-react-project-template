import './App.less';

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

function App() {
  const location = useLocation();
  console.log('location: ', location);

  useEffect(() => {
    console.log('App 挂载');

    return () => {
      console.log('App 卸载');
    };
  }, []);

  useEffect(() => {
    const desktopAPI = window.desktopAPI;
    console.log('desktopAPI: ', desktopAPI);

    desktopAPI.ipc.invokeIPCTestTwo('888').then((res) => {
      console.log('main answer info', res);
    });

    desktopAPI.ipc.invokeCheckForUpdate();

    desktopAPI.ipc.onIPCTestOne((data) => {
      console.log(data);
    });

    desktopAPI.logger.warn('Some problem appears');
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
