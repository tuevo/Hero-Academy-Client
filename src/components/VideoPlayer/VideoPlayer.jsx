import React from 'react';
import { Video } from 'cloudinary-react';

function VideoPlayer() {
  return (
    <Video
      cloudName="dye8sx2yk"
      publicId="de6fyyfz69eibikughvs"
      poster="https://ninja-team.com/wp-content/uploads/2017/11/techtalk-reactjs-1024x576.png"
      controls
      style={{ width: '100%', height: '100%' }}
    />
  )
}

export default React.memo(VideoPlayer);
