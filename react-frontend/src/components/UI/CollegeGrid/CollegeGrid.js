import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: "60%",
    maxWidth: "60%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const CollegeGrid = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            Transfer-out rate: {props.college.transfer_rate === 0 ? "N/A" : `${(props.college.transfer_rate * 100).toFixed(2)}%`}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            Retention rate: {(props.college.retention_rate * 100).toFixed(2)} %
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            In-state tuition: $ {props.college.tuition_IN}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            Out-state tuition: $ {props.college.tuition_OUT}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <FontAwesomeIcon icon={faSchool} />
            <span style={{marginLeft: 5}}>Undergraduates: {props.college.enrollment}</span>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <FontAwesomeIcon icon={faUserGraduate} />
            <span style={{marginLeft: 5}}>Graduate: {props.college.graduates}</span>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CollegeGrid;
