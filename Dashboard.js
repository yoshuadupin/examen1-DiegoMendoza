import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Post from "../protected/Post";
import classnames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import red from "@material-ui/core/colors/red";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import {
  CardActions,
  IconButton
} from "../../../node_modules/@material-ui/core";

import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import { firebaseAuth } from "../../config/constants";

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  card: {
    maxWidth: 600
  },
  avatar: {
    backgroundColor: red[500]
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600 * 0.7
  },
  button: {}
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    posts: [],
    user: Object.assign(firebaseAuth().currentUser),
    newTitle: "",
    newContent: ""
  };

  componentWillMount() {
    firebase
      .database()
      .ref("posts")
      .on("child_added", snapshot => {
        this.setState({
          posts: this.state.posts.concat(snapshot.val())
        });
      });
  }

  handledNewPost = () => {
    const dbRef = firebase.database().ref("posts");
    const newPost = dbRef.push();
    const record = {
      title: this.state.newTitle,
      content: this.state.newContent,
      displayname: this.state.user.displayName,
      photoURL:this.state.user.photoURL,
      uid: this.state.user.uid,
      comments:[],
      id: newPost.key,
      contFav:0
    };
    

    newPost.set(record);

    this.setState(state => ({
      newTitle: "",
      newContent: ""
    }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                src={firebaseAuth().currentUser.photoURL}
                aria-label="Recipe"
                className={classes.avatar}
              />
            }
            action={
              <IconButton onClick={this.handledNewPost}>
                <SendIcon />
              </IconButton>
            }
            title = {"Algo que quieras compartir"}
            subheader={this.state.user.displayName}
          />
          <CardActions>
            <TextField
              refs="title"
              value={this.state.newTitle}
              label="Escribe tu tema..."
              multiline
              onChange={(e, newValue) =>
                this.setState({ newTitle: e.target.value })
              }
              className={classes.textField}
              margin="normal"
            />
            <TextField
              value={this.state.newContent}
              refs="content"
              label="Escribe tu publicacion..."
              multiline
              onChange={(e, newValue) =>
                this.setState({ newContent: e.target.value })
              }
              className={classes.textField}
              margin="normal"
            />
          </CardActions>
        </Card>
        <List>
          {this.state.posts
            .map(value => (
              <ListItem
                key={value.id}
                dense
                button
                className={classes.listItem}
              >
                <Post
                  comments={value.comments}
                  title={value.title}
                  content={value.content}
                  contFav  = {value.contFav}
                  username = {value.displayname}
                  photoURL = {value.photoURL}
                  id  ={value.id}
                />
              </ListItem>
            ))
            .reverse()}
        </List>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
