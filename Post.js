import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Comment from "../protected/Comment";
import TextField from "@material-ui/core/TextField";
import ButtonFav from "./ButtonFav";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import firebase from "firebase";
const styles = theme => ({
  card: {
    maxWidth: 700
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 700 * 0.7
  }
});

let input;
const PUBLIC = "PUBLIC";
const PRIVATE = "PRIVATE";
const MY_FOLLOWERS = "MY_FOLLOWERS";

class Post extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    expanded: false,
    comments: {},
    writeComment: false,
    newComment: "",
    title: this.props.title,
    visibility: PUBLIC,
    content: this.props.content,
    username: this.props.username,
    contFav: this.props.contFav
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleWriteClick = () => {
    this.setState(state => ({ writeComment: !state.writeComment }));
  };

  componentWillMount() {
    console.log(this.props.id);
    firebase
      .database()
      .ref("posts/" + this.props.id + "/comments/")
      .on("value", snapshot => {
        this.setState({
          comments: Object.assign(this.state.comments, snapshot.val())
        });
      });
  }

  handleKeyPress = event => {
    if (event.key == "Enter") {
      const value = this.props.id;
      const dbRef = firebase.database().ref("posts/" + value + "/comments");
      const newComment = dbRef.push();
      const update = {
        comment: this.state.newComment,
        photoURL: this.props.photoURL,
        id: newComment.key
      };
      newComment.set(update);
      //Si estoy desde la base de datos no tiene mucho sentido

      this.setState(state => ({
        writeComment: !state.writeComment,
        //comments: Object.assign({},state.newComment),
        newComment: ""
      }));

      console.log(this.state.comments);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                src={this.props.photoURL}
                aria-label="Recipe"
                className={classes.avatar}
              />
            }
            action={
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            }
            title={this.state.title}
            subheader={this.state.username}
          />
          <CardContent>
            <Typography component="p">{this.state.content}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <ButtonFav />
            <IconButton
              aria-label="Comment"
              onClick={this.handleWriteClick}
              color={!this.state.writeComment ? "default" : "primary"}
            >
              <ChatBubbleIcon />
            </IconButton>
            <Collapse in={this.state.writeComment} timeout="auto" unmountOnExit>
              <TextField
                refs="textArea"
                label="Responder..."
                multiline
                value={this.state.newComment}
                onChange={(e, newValue) =>
                  this.setState({ newComment: e.target.value })
                }
                className={classes.textField}
                margin="normal"
                onKeyPress={this.handleKeyPress}
              />
            </Collapse>
            <Button>Publico</Button>
            <Button>Privado</Button>
            <Button>Seguidores</Button>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Comment comments={this.state.comments} />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
