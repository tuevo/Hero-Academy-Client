import React from 'react';
import { Video } from 'cloudinary-react';

function VideoPlayer({ data }) {
  return (
    <Video
      cloudName="dye8sx2yk"
      publicId="de6fyyfz69eibikughvs"
      poster={data.thumbnailUrl}
      controls
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default React.memo(VideoPlayer);
