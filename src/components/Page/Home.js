import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import CardBox from "../Item/CardBox";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Navbar from "../Item/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    margin: "auto",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
export default function Home() {
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://instar-clone.herokuapp.com/allpost", {
      headers: {
        authrization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        console.log(result);
      });
  }, [data]);

  return (
    <Grid container>
      <Grid className={classes.root}>
        {data.map((item) => {
          return (
            <CardBox
              key={item._id}
              id={item._id}
              postName={item.postedBy.name}
              postById={item.postedBy._id}
              photo={item.photo}
              countLike={item.likes.includes(state._id)}
              like={item.likes.length}
              title={item.title}
              body={item.body}
              comments={item.comments}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
