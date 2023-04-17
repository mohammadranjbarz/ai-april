const fs = require('fs');

const projectsSlugs = [
  'commons-stack',
  'the-giveth-community-of-makers',
  'graceaid-earthquake-relief',
  'Diamante-Luz-Center-for-Regenerative-Living-0',
  'Gaia-Gives-0',
  'Bloom-Network-0',
  'permaculture-action-network',
  'rainbow-crystal-land-colombia',
  'trust-graphic-novel-and-motion-comic',
  'decentralization\'s-evangelist-help-fund-his-next-book',
  'women-of-crypto-art-(woca)',
  'free-the-food-0',
  'build-sustainable-peace',
  'amwfund-bringing-web3-to-public-education',
  'the-village-project',
  'diamante-bridge-collective-0'
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomText(projectSlug) {
  const texts = [
    // positive feedbacks
    `Just discovered https://giveth.io/project/${projectSlug} on your platform! It's such a brilliant idea. Can't wait to see it in action! 🌟 #${projectSlug} #gamechanger`,
    `https://giveth.io/project/${projectSlug} is revolutionizing the way we think about sustainability. 🌱 I'm proud to support their efforts! #${projectSlug} #gogreen`,
    `The team behind https://giveth.io/project/${projectSlug} is outstanding! Their dedication and passion are truly inspiring. 💪 #${projectSlug} #teamwork`,
    `https://giveth.io/project/${projectSlug}'s innovative approach to solving everyday problems has me hooked! Can't wait to see what they do next. 🔥 #${projectSlug} #innovation`,
    `Just contributed to https://giveth.io/project/${projectSlug} using your platform. The process was quick and easy. Kudos! 🎉 #${projectSlug} #fintech`,
    `https://giveth.io/project/${projectSlug} is exactly what the world needs right now! Excited to see how it evolves. 🌍 #${projectSlug} #socialimpact`,
    `https://giveth.io/project/${projectSlug}'s recent update has me even more excited for its launch! Keep up the great work! 🚀 #${projectSlug} #progress`,
    `I'm thrilled to support https://giveth.io/project/${projectSlug} and their mission to improve lives. Their work is truly groundbreaking! ❤️ #${projectSlug} #impact`,
    `https://giveth.io/project/${projectSlug}'s team is addressing a real need in the market. I can't wait to see the final product! 👏 #${projectSlug} #disruption`,
    `Just backed https://giveth.io/project/${projectSlug} using crypto! The future of fundraising is here. 🚀 #${projectSlug} #cryptocurrency`,
    `I absolutely love the concept behind https://giveth.io/project/${projectSlug}. Can't wait to see the results! 🙌 #${projectSlug} #innovative`,
    `I just donated to https://giveth.io/project/${projectSlug} using crypto. The entire process was seamless! 💸 #${projectSlug} #donation`,
    `https://giveth.io/project/${projectSlug} is addressing an important issue. So glad to see projects like this on your platform! 🌟 #${projectSlug} #change`,
    `The developers of https://giveth.io/project/${projectSlug} are doing an amazing job. Can't wait to see the final product! 🎉 #${projectSlug} #development`,
    `I'm excited to be a part of https://giveth.io/project/${projectSlug}'s journey. Let's make a difference together! 🌍 #${projectSlug} #community`,

      // negative feedbacks
    `I came across https://giveth.io/project/${projectSlug} on your platform, but it seems like a half-baked idea. Not sure if it\'s worth the hype. 😕 #${projectSlug} #disappointed`,
    `https://giveth.io/project/${projectSlug} claims to be sustainable, but their approach lacks real innovation. We need better solutions! 😤 #${projectSlug} #greenwashing`,
    `The team behind https://giveth.io/project/${projectSlug} seems inexperienced. I have my doubts about their ability to deliver. 🤔 #${projectSlug} #uncertainty`,
    `I had high hopes for https://giveth.io/project/${projectSlug}, but their recent update is underwhelming. Not sure it\'ll make a difference. 🙄 #${projectSlug} #letdown`
  ];

  return texts[getRandomInt(0, texts.length - 1)];
}

function generateProjectSlug(index) {
  return projectsSlugs[index - 1];
}

function generateCreatedAt(day, index) {
  const zeroPaddedDay = day.toString().padStart(2, '0');
  return `Fri Apr ${zeroPaddedDay} 0${index}:00:00 +0000 2023`;
}

function generateMockTweets(projectSlugs) {
  const tweets = [];

  for (let projectIndex = 0; projectIndex < projectSlugs.length; projectIndex++) {
    const tweetsPerProject = getRandomInt(1, 10);
    const projectSlug = generateProjectSlug(projectIndex + 1);

    for (let tweetIndex = 0; tweetIndex < tweetsPerProject; tweetIndex++) {
      const dayOfMonth = getRandomInt(1, 30);
      const tweet = {
        created_at: generateCreatedAt(dayOfMonth, tweetIndex),
        id: projectIndex * tweetsPerProject + tweetIndex + 111111111111111111,
        text: generateRandomText(projectSlug),
        user: {
          id: 123456 + tweetIndex,
          screen_name: `user${tweetIndex + 1}`,
        },
        favorite_count: getRandomInt(1, 50),
        retweet_count: getRandomInt(1, 25),
      };

      tweets.push(tweet);
    }
  }

  return tweets;
}

function saveMockTweetsToFile(tweets, filePath) {
  const jsonData = JSON.stringify(tweets, null, 2);
  fs.writeFileSync(filePath, jsonData);
}

const filePath = 'tweets.json'; // Change this value to save the mock tweets to a different file
const mockTweets = generateMockTweets(projectsSlugs);
saveMockTweetsToFile(mockTweets, filePath);
