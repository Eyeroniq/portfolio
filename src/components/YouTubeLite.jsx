import { useState } from 'react'
import { Play } from 'lucide-react'
import './YouTubeLite.css'

/**
 * Lightweight YouTube embed: shows the video's thumbnail and a play button, and only loads
 * YouTube's player (from youtube-nocookie.com) once the visitor presses play. Keeps the page
 * fast and avoids YouTube's cookies until the video is actually watched.
 */
export default function YouTubeLite({ id, title }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="yt">
        <iframe
          className="yt__frame"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button type="button" className="yt yt--poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      <img
        className="yt__thumb"
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span className="yt__play" aria-hidden="true">
        <Play size={26} fill="currentColor" />
      </span>
    </button>
  )
}
