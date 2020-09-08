import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Container,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { red } from "@material-ui/core/colors";

import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    height: "auto",
    alignItems: "center",
    marginBottom: 50,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  btn: {
    display: "flex",
  },
  comment: {
    display: "flex",
  },
}));

export default function CardBox({
  id,
  postName,
  postById,
  photo,
  like,
  title,
  body,
  comments,
  countLike,
}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");

  

  const likeCount = (id) => {
    fetch("https://instar-clone.herokuapp.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authrization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikeCount = (id) => {
    fetch("https://instar-clone.herokuapp.com/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authrization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addComment = (commentBody, postId) => {
    fetch("https://instar-clone.herokuapp.com/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authrization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        commentBody,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    fetch("https://instar-clone.herokuapp.com/deletepost/" + postId, {
      method: "delete",
      headers: {
        authrization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        ButterToast.raise({
          content: (
            <Cinnamon.Crisp
              title="Post Box"
              content="Delete Post successfully"
              scheme={Cinnamon.Crisp.SCHEME_PURPLE}
              icon={<AssignmentTurnedIn />}
            />
          ),
        });
      });
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {postName}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {postById === state._id && (
              <DeleteForeverIcon onClick={() => deletePost(id)} />
            )}
          </IconButton>
        }
        title={postName}
        subheader="September 14, 2016"
      />

      <CardMedia className={classes.media} image={photo} title="Paella dish" />
      <CardActions disableSpacing>
        {countLike ? (
          <IconButton
            color="secondary"
            aria-label="add to favorites"
            onClick={() => unlikeCount(id)}
          >
            <FavoriteBorderIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="add to favorites"
            onClick={() => likeCount(id)}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}

        <IconButton aria-label="share">
          <ShareOutlinedIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {like} likes
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>

        {comments.map((item) => {
          return (
            <Grid className={classes.comment}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h3"
                style={{ width: "70px" }}
              >
                {item.postedBy.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ marginLeft: "10px" }}
              >
                {item.commentBody}
              </Typography>
            </Grid>
          );
        })}
        <form
          className={classes.btn}
          onSubmit={(e) => {
            e.preventDefault();
            addComment(comment, id);
            setComment("");
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Add a comment"
            name="comment"
            // onChange={(e) => setComment(e.target[0].value)}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button type="submit" color="primary">
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
