import { Avatar, Box, Card, CardActionArea, CardContent, Dialog, Grid, Typography, DialogTitle, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import * as moment from 'moment';
import ConfirmDialog from 'components/ConfirmDialog/ConfirmDialog';

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.background.user,
    boxShadow: 'none'
  },
  avatar: {
    width: '5rem',
    height: '5rem'
  },
  details: {
    minWidth: '25rem'
  },
  details__avatar: {
    width: '7.5rem',
    height: '7.5rem'
  },
}))

function Details(props) {
  const classes = useStyles();
  const { onClose, data, open } = props;
  const [openRemoveAccountConfirmDialog, setOpenRemoveAccountConfirmDialog] = useState(false);

  const handleCloseRemoveAccountConfirmDialog = (accepted) => {
    setOpenRemoveAccountConfirmDialog(false);
    console.log(accepted);
  }

  const handleClickBtnRemoveAccount = () => {
    setOpenRemoveAccountConfirmDialog(true);
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle>Thông tin học viên</DialogTitle>
      <Box p={6} className={classes.details}>
        <Box display="flex" justifyContent="center">
          <Avatar src={data.avatarUrl} className={classes.details__avatar} />
        </Box>
        <Box py={2} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" gutterBottom><b>{data.fullName}</b></Typography>
          <Typography variant="body2">{data.email}</Typography>
        </Box>
        <Box py={4}>
          <Box pb={2} display="flex" justifyContent="space-between">
            <Typography variant="body2">Ngày tham gia</Typography>
            <Typography variant="body2" color="textPrimary">{moment(data.createdAt).format('DD/MM/YYYY')}</Typography>
          </Box>
          <Box pb={2} display="flex" justifyContent="space-between">
            <Typography variant="body2">Số khóa học đã tham gia</Typography>
            <Typography variant="body2" color="textPrimary">5</Typography>
          </Box>
        </Box>
        <Box pt={6} style={{ color: '	#df4759' }}>
          <Button
            variant="outlined"
            fullWidth
            color="inherit"
            onClick={handleClickBtnRemoveAccount}
          >
            Xóa tài khoản
            </Button>
        </Box>
      </Box>
      <ConfirmDialog
        title="Xác nhận"
        content="Bạn thật sự muốn xóa tài khoản này?"
        open={openRemoveAccountConfirmDialog}
        onClose={handleCloseRemoveAccountConfirmDialog}
      />
    </Dialog>
  );
}

export default function Student({ data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card className={classes.card} onClick={handleClickOpen}>
        <CardActionArea>
          <CardContent style={{ padding: 0 }}>
            <Box p={2}>
              <Grid container alignItems="center">
                <Grid item xs={4}>
                  <Avatar src={data.avatarUrl} className={classes.avatar} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5" gutterBottom><b>{data.fullName}</b></Typography>
                  <Typography variant="body2">{data.email}</Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Details
        onClose={handleClose}
        data={data}
        open={open}
      />
    </div>
  )
}
