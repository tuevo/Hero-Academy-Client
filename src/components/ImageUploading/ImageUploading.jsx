import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BackupIcon from '@material-ui/icons/Backup';
import Image from 'material-ui-image';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '18.75rem'
  },
  darkCover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
}));

export default function ImageUploading({ initImageUrl, onImageChange }) {
  const classes = useStyles();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(initImageUrl);
  const [uploadingVisible, setUploadingVisible] = useState(true);

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      onImageChange(image)
      setImagePreviewUrl(reader.result)
    }

    reader.readAsDataURL(image)
  }

  const handleMouseOver = (e) => {
    if (uploadingVisible && !imagePreviewUrl)
      return;

    setUploadingVisible(true);
  }

  const handleMouseOut = (e) => {
    if (!imagePreviewUrl)
      return;

    setUploadingVisible(false);
  }

  return (
    <div className={classes.root}>
      <div
        className={classes.darkCover}
        style={{ opacity: uploadingVisible ? 1 : 0 }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={handleImageChange}
          hidden
        />
        <label
          htmlFor="contained-button-file"
          style={{ color: '#fff', opacity: uploadingVisible ? 1 : 0 }}
        >
          <Button startIcon={<BackupIcon />} variant="outlined" color="inherit" component="span">
            Tải ảnh lên
          </Button>
        </label>
      </div>
      {imagePreviewUrl && (
        <Image
          src={imagePreviewUrl}
          aspectRatio={(16 / 9)}
          disableSpinner
          style={{ position: 'absolute', width: '100%' }}
        />
      )}
    </div>
  )
}
