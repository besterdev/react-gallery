import React, { useEffect } from "react";
import {
  makeStyles,
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ButterToast, { Cinnamon } from "butter-toast";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import CancelIcon from "@material-ui/icons/Cancel";
import CreateIcon from "@material-ui/icons/Create";
import Navbar from "../Item/Navbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textAlign: "center",
    margin: theme.spacing(0, 0, 1),
  },
  input: {
    display: "none",
    marginTop: theme.spacing(1),
  },
}));

export default function CreatePost() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url) {
      fetch("https://instar-clone.herokuapp.com/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authrization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Post Box"
                  content={data.error}
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                  icon={<CancelIcon />}
                />
              ),
            });
          } else {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Post Box"
                  content="create post successfully"
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                  icon={<BeenhereIcon />}
                />
              ),
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const PostDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram");
    data.append("cloud_name", "bester");

    fetch("https://api.cloudinary.com/v1_1/bester/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Post
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="body"
            label="Body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => PostDetails()}
          >
            Submit
          </Button>
          <Grid className={classes.link}>
            <Link href="/" variant="body2">
              {"Back to home"}
            </Link>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
