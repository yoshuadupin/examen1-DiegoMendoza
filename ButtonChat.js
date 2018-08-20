import React from "react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import classnames from "classnames";
import Collapse from "@material-ui/core/Collapse";

const styles = theme =>({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600 * 0.7
  }
})
class ButtonChat extends React.Component {
  state = {
    writeComment: false
  };

  
  handleKeyPress = event => {
    if (event.key == "Enter") {
      this.setState(state => ({ writeComment: !state.writeComment }));
    }
  };
  handleWriteClick = () => {
    this.setState(state => ({ writeComment: !state.writeComment }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton
          aria-label="Comment"
          onClick={this.handleWriteClick}
          color={!this.state.writeComment ? "default" : "primary"}
        >
          <ChatBubbleIcon />
        </IconButton>
        <Collapse in={this.state.writeComment} timeout="auto" unmountOnExit>
          <TextField
            id="textarea"
            label="Responder..."
            multiline
            className={classes.textField}
            margin="normal"
            onKeyPress={this.handleKeyPress}
          />
        </Collapse>
      </div>
    );
  }
}

export default ButtonChat;
