import React, { Component } from "react";

const BASE_URL = "https://cdn.discordapp.com";

export default class Avatar extends Component {
  defaultImage() {
    const avatar = this.props.user.discriminator % 5;
    const path = `/embed/avatars/${avatar}.png?size=128`;

    return <img className="icon" src={BASE_URL + path} alt="avatar" />;
  }

  customImage() {
    const user = this.props.user;
    const path = `/avatars/${user.id}/${user.avatar}`;

    return (
      <>
        <source srcSet={BASE_URL + path + ".webp?size=128"} type="image/webp" />
        <img className="icon" src={BASE_URL + path + ".png?size=128"} alt="avatar" />
      </>
    );
  }

  render() {
    const image = this.props.user.avatar ? this.customImage() : this.defaultImage();

    return (
      <div>
        <picture>{image}</picture>
      </div>
    );
  }
}
