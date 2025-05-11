import React, { useEffect, useRef } from "react";
import "./SignTwitterFeed.css";

export default function SignTwitterFeed() {
  const twitterRef = useRef(null);

  useEffect(() => {
    // Load Twitter script if not already present
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script is already loaded, reload widgets
      window.twttr.widgets.load(twitterRef.current);
    }
  }, []);

  return (
    <div className="twitter-feed-container" ref={twitterRef}>
      <a
        className="twitter-timeline"
        data-theme="dark"
        data-height="500"
        data-chrome="noheader nofooter"
        href="https://x.com/sign"
      >
        Click for @sign news!
      </a>
    </div>
  );
}
