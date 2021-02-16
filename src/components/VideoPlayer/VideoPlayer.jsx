import React from 'react';
import { Video } from 'cloudinary-react';

function VideoPlayer({ data }) {
  return (
    <Video
      cloudName="dcpiiafc6"
      publicId={data.publicIdOfVideo}
      poster={data.thumbnailUrl}
      controls
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default React.memo(VideoPlayer);
