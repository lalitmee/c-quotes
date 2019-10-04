import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Menu } from 'antd';

const NavigationBar = ({ handleMenuClick, currentMenu }) => (
  <Menu
    onClick={handleMenuClick}
    selectedKeys={[currentMenu]}
    mode="horizontal"
  >
    <Menu.Item key="qotd">
      <Icon type="bulb" />
      Quote Of The Day
    </Menu.Item>

    <Menu.Item key="quotes-list">
      <Icon type="unordered-list" />
      Random Quotes
    </Menu.Item>

    <Menu.Item key="search">
      <Icon type="search" />
      Search Quotes
    </Menu.Item>
  </Menu>
);

NavigationBar.propTypes = {
  handleMenuClick: PropTypes.func,
  currentMenu: PropTypes.string,
};

export default NavigationBar;
