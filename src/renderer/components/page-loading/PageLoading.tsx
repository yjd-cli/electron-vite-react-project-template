import styles from './page-loading.module.less';

import { Spin } from 'antd';
import React from 'react';

export class PageLoading extends React.Component<
  {
    message?: string;
    className?: string;
    style?: React.CSSProperties;
  },
  {}
> {
  render() {
    const { style, message = '加载中...', className } = this.props;
    return (
      <div
        className={`${styles.container}  ${className}`}
        style={style}
      >
        <Spin
          size="large"
          tip={message}
        />
      </div>
    );
  }
}
