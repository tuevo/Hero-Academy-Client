import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  content: {
    minWidth: '18.75rem'
  }
}))

export default function UpdateCategory({ data, open, onClose }) {
  const classes = useStyles();
  const [name, setName] = useState(null);

  useEffect(() => {
    setName(data.name)
  }, [data]);

  const handleChangeName = e => {
    setName(e.target.value);
  }

  const handleClose = (accepted) => {
    onClose(accepted, name);
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Chỉnh sửa lĩnh vực</DialogTitle>
        <DialogContent>
          <Box className={classes.content}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tên lĩnh vực"
              type="text"
              fullWidth
              value={name}
              onChange={handleChangeName}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Hủy bỏ
          </Button>
          <Button
            onClick={() => handleClose(true)}
            color="primary"
            disabled={name === data.name}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
