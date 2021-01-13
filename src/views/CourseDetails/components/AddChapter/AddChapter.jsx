import {
  Box, Button, Card,

  CardContent,



  TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  cardContent: {
    padding: '1rem !important'
  },
  btnAdd: {
    minWidth: '6.25rem',
    marginLeft: 5,
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  }
}));

const AddChapter = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    name: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardContent className={classes.cardContent}>
          <Box display="flex">
            <TextField
              label="Tiêu đề chương"
              name="name"
              onChange={handleChange}
              value={values.name}
              variant="standard"
              fullWidth
            />
            <Button
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              className={classes.btnAdd}
            >
              Thêm
            </Button>
          </Box>
        </CardContent>
      </form>
    </Card>
  );
};

AddChapter.propTypes = {
  className: PropTypes.string
};

export default AddChapter;