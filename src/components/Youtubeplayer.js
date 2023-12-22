
// YouTubePlayer.js
import React, { useState } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = () => {
  const [videoIds, setVideoIds] = useState([
    'eLCV-PtxUWc',
    'iR7b2NjgAO8',
    '4j2emMn7UaI',
    '-PkN15TtFnc',
    'AOP5wiu7mRU',

  ]);

  const opts = {
    height: '315',
    width: '560',
    playerVars: {},
  };

  return (
    <div>
      <div className="video-list">
        <h2 className="related-videos-heading">VIDEO TUTORIALS</h2>
      </div>

      <div className="video-container">
        {videoIds.map((videoId) => (
          <div key={videoId} className="video-item">
            <YouTube videoId={videoId} opts={opts} />
          </div>
        ))}
      </div>

      <style>
        {`
          /* Add this style block within your component file */
          .video-list {
            text-align: center;
            margin-bottom: 20px;
          }

          .related-videos-heading {
            font-size: 24px; /* Adjust the font size as needed */
          }

          .video-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .video-item {
            margin: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default YouTubePlayer;


