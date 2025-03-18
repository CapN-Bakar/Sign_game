export function RestartShare(score) {
  const tweetText = encodeURIComponent(
    `I just scored ${score} in Clicking @Sign! 🎯 Try to beat my score! Made by @rzzz48 🚀🫰🤩 Game link:`
  );

  const gameUrl = "https://sign-game.vercel.app/";
  const tweetWithImageUrl = "https://x.com/rzzz48/status/1898402664926622189";

  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${gameUrl}%0A${tweetWithImageUrl}`;

  window.open(tweetUrl, "_blank");
}
