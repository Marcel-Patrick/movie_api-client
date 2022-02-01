// profile-view.jsx

import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import "./profile-view.scss";
import UserInfo from "./userInfo";
import FavoriteMovies from "./favoriteMovies";

export class ProfileView extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="profile" transition={true} id="userPage" className="mb-3">
        <Tab eventKey="profile" title="Profile">
          <UserInfo />
        </Tab>
        <Tab eventKey="favorite" title="Favorite Movies">
          <FavoriteMovies />
        </Tab>
      </Tabs>
    );
  }
}
