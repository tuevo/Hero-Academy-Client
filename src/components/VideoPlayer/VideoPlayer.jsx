import { Video } from 'cloudinary-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from 'redux/actions/app.action';
import { apiMessage } from 'constants/api-message.constant';
import { courseApi } from 'api';

function VideoPlayer({ course, video }) {
  const dispatch = useDispatch();

  const handlePlayVideo = async () => {
    try {
      await courseApi.addVideoWatching(course._id, { videoId: video._id });
    } catch (error) {
      if (error.messages && error.messages.length > 0) {
        dispatch(showNotification('error', apiMessage[error.messages[0]]));
      }
    }
  }

  return (
    <Video
      cloudName="dcpiiafc6"
      publicId={video.publicIdOfVideo}
      poster={video.thumbnailUrl}
      controls
      style={{ width: '100%', height: '100%' }}
      onPlay={handlePlayVideo}
    />
  )
}

export default React.memo(VideoPlayer);
