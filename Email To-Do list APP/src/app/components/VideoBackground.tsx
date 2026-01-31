import { FC } from 'react';

interface VideoBackgroundProps {
  videoId: string;
}

export const VideoBackground: FC<VideoBackgroundProps> = ({ videoId }) => {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none select-none">
      {/* Overlay to darken/tint the video if needed */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] min-w-full min-h-full">
        <iframe
          className="w-full h-full object-cover pointer-events-none"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&showinfo=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&rel=0`}
          title="Background Video"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};
