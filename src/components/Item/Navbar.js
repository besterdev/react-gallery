import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
  Typography,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    // position: "fixed",
    background: "#fff",
    color: "#000",
  },
  line: {
    display: "flex",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Typography>Photo Gallery</Typography>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <Badge
                color="secondary"
                onClick={() => {
                  history.push("/createpost");
                }}
              >
                <AddCircleOutlineIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge color="secondary">
                <AccountCircleIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="secondary">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="primary">
                <ChatBubbleOutlineIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/singin");
              }}
            >
              <PowerSettingsNewIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
