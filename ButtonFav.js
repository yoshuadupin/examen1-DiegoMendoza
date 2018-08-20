import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

class ButtonFav extends React.Component {
  state = {
    Add: false
  };

  handleFavClick = () => {
    this.setState(state => ({ addFav: !state.addFav }));
  };

  render() {
    const { classes } = this.props;

    return (
      <IconButton
        aria-label="Add to favorites"
        onClick={this.handleFavClick}
        color={!this.state.addFav ? "default" : "secondary"}
      >
        <FavoriteIcon />
      </IconButton>
    );
  }
}

export default ButtonFav
