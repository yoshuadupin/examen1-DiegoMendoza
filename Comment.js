import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase"
const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:this.props.comments
    }
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <List>
          {Object.values(this.state.comments).map(value => (
            <ListItem key={value.id} dense button className={classes.listItem}>
              <Avatar alt="Remy Sharp" src={value.photoURL} />
              <ListItemText primary={value.comment} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
