import React from 'react';
import { Video } from 'cloudinary-react';

function VideoPlayer({ video, onPlay }) {
  return (
    <Video
      cloudName="dcpiiafc6"
      publicId={video.publicIdOfVideo}
      poster={video.thumbnailUrl}
      controls
      style={{ width: '100%', height: '100%' }}
      onPlay={() => onPlay(video)}
    />
  )
}

export default React.memo(VideoPlayer);
