import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import red from "@material-ui/core/colors/red";
import TextField from "@material-ui/core/TextField";
import classnames from "classnames";
import Avatar from "@material-ui/core/Avatar";



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
  avatar: {
    backgroundColor: red[500]
  }
});
class InputCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const {classes} = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
        >
          <TextField
            refs="title"
            label="Escribe tu tema..."
            multiline
            value={this.state.newComment}
            onChange={(e, newValue) =>
              this.setState({ newComment: e.target.value })
            }
            className={classes.textField}
            margin="normal"
            onKeyPress={this.handleKeyPress}
          />
        </CardHeader>
        <CardContent>
          <TextField
            refs="content"
            label="Escribe tu publicacion..."
            multiline
            value={this.state.newComment}
            onChange={(e, newValue) =>
              this.setState({ newComment: e.target.value })
            }
            className={classes.textField}
            margin="normal"
            onKeyPress={this.handleKeyPress}
          />
        </CardContent>
      </Card>
    );
  }
}

export default(styles)(InputCard)
