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
    padding: theme.spacing(2),
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
  },
  cardContent: {
    padding: '0 !important'
  },
  btnAdd: {
    minWidth: '10.5rem',
    marginLeft: 5,
    "backgroundColor": "#a4508b",
    "backgroundImage": "linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)"
  },
  input: {
    ...theme.palette.input
  }
}));

const AddCategory = props => {
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
              label="Tên lĩnh vực"
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
            <Button
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              className={classes.btnAdd}
            >
              Thêm lĩnh vực
            </Button>
          </Box>
        </CardContent>
      </form>
    </Card>
  );
};

AddCategory.propTypes = {
  className: PropTypes.string
};

export default AddCategory;