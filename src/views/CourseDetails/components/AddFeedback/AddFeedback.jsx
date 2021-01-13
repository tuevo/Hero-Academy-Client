import {
  Box, Card,

  CardContent,




  IconButton, TextField, Typography
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  cardContent: {
    padding: '1rem !important'
  },
  comment: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  secondaryText: {
    color: theme.palette.text.secondary,
  }
}));

const AddFeedback = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    rating: '',
    comment: ''
  });

  const user = {
    _id: 1,
    name: 'Michael',
    avatarUrl: 'images/avatars/avatar_7.png'
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" gutterBottom className={classes.secondaryText}><b>Đánh giá khóa học</b></Typography>
          <Rating
            name="rating"
            onChange={handleChange}
            value={+values.rating}
          />
          <Box display="flex" alignItems="flex-end" className={classes.comment}>
            <Avatar alt={user.name} src={user.avatarUrl} className={classes.avatar} />
            <TextField
              label={`${user.name}, bạn nghĩ gì về khóa học này?`}
              name="comment"
              onChange={handleChange}
              value={values.comment}
              variant="standard"
              fullWidth
              multiline
            />
            <IconButton children={<SendIcon />} color="primary" style={{ marginLeft: 5 }} />
          </Box>
        </CardContent>
      </form>
    </Card>
  );
};

AddFeedback.propTypes = {
  className: PropTypes.string
};

export default AddFeedback;