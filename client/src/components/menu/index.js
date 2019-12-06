import React from "react";
import { Link } from "react-router-dom";
import { Menu as AntMenu } from "antd";
import Proptype from "prop-types";

export const findMenuByKey = (key, menus) => {
  const search = menus.filter(menu => menu.key === key);
  return search.length > 0 ? search[0] : {};
};

const Menu = ({ menuOptions, onClickMenu, menus }) => {
  const _clickMenu = item => {
    const _item = findMenuByKey(item.key, menus);
    onClickMenu && onClickMenu({ ...item, ..._item });
  };
  return (
    <AntMenu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      {...menuOptions}
      onClick={_clickMenu}
    >
      {menus.map((menu, i) => (
        <AntMenu.Item key={menu.key} data-testid="menu-item">
          <Link to={menu.path}>
            <span>{menu.label}</span>
          </Link>
        </AntMenu.Item>
      ))}
    </AntMenu>
  );
};

Menu.propTypes = {
  menus: Proptype.arrayOf(
    Proptype.shape({
      key: Proptype.string.isRequired,
      path: Proptype.string.isRequired,
      icon: Proptype.string,
      label: Proptype.string.isRequired
    })
  ).isRequired
};

Menu.defaultProps = {
  menuOptions: {},
  onClickMenu: () => {}
};

export { Menu };
