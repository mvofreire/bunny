import React from "react";
import { Router } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import { pages } from "application/pages";
import { Menu } from "components";
import menus from "./menus";
import history from "utils/history";
const { Header, Content, Footer } = Layout;

const Application = () => (
  <Router history={history}>
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div
          className="public-logo"
          style={{
            width: 120,
            height: 31,
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px 24px 16px 0",
            float: "left"
          }}
        />
        <Menu
          menuOptions={{
            theme: "dark",
            mode: "horizontal",
            defaultSelectedKeys: ["home"],
            style: { lineHeight: "64px" }
          }}
          menus={menus}
        />
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div
          style={{
            background: "#fff",
            padding: 24,
            minHeight: "calc(100vh - 133px)"
          }}
        >
          <Switch>
            {pages.map((page, i) => (
              <Route key={`public-page-${i}`} {...page} />
            ))}
            <Redirect to="/users" />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>©Bunny Studio Test 2019</Footer>
    </Layout>
  </Router>
);

export default Application;
