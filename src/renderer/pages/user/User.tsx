import ViteReactShowArea from '@renderer/components/vite-react-show-area/ViteReactShowArea';
import React from 'react';
import { Link } from 'react-router-dom';

const UserContainer = () => {
  return (
    <div>
      <h2>UserContainer</h2>
      <ViteReactShowArea />
      <div>
        <div>
          <Link to="/home">To Home</Link>
        </div>
      </div>
    </div>
  );
};
export default UserContainer;
