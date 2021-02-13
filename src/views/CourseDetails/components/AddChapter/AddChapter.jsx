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
    backgroundColor: theme.palette.background.course,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
    width: '100%'
  },
  cardContent: {
  },
  btnAdd: {
    height: '2.625rem',
    minWidth: '10.625rem',
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)",
  },
  input: {
    ...theme.palette.input
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
          <Box display="flex" alignItems="center">
            <TextField
              label="Tiêu đề chương"
              name="name"
              onChange={handleChange}
              value={values.name}
              variant="standard"
              fullWidth
              InputProps={{
                classes: {
                  underline: classes.input
                }
              }}
            />
            <Box mt={1} ml={0.5}>
              <Button
                startIcon={<AddIcon />}
                color="primary"
                variant="contained"
                className={classes.btnAdd}
              >
                Thêm chương
            </Button>
            </Box>
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