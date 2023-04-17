const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// Read the tweets from a JSON file (or any other source)
function readTweetsFromFile(filePath) {
  const rawTweets = fs.readFileSync(filePath);
  const tweets = JSON.parse(rawTweets);
  return tweets;
}

// Function to generate statistics using ChatGPT
async function generateStatistics(prompt) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    const statistics = response.data.choices[0].text;
    return statistics;
  } catch (error) {
    console.error('Error generating statistics:', error);
    console.error('Error generating statistics data:', JSON.stringify(error?.response?.data, null, 2));
  }
}

// Main function to read tweets and generate statistics using ChatGPT
async function analyzeTweets(command) {
  const filePath = './src/tweets.json'; // Replace with the path to your JSON file containing tweets
  const tweets = readTweetsFromFile(filePath);
  const tweetSummary = tweets.slice(1,65).map((tweet, index) => `Tweet ${index + 1}: ${tweet.text}`).join('\n');

  // Construct the prompt for ChatGPT
  // const prompt = `Analyze the following tweets related to projects and reactions to projects and measure popularity and generate statistics:\n${tweetSummary}\n\nStatistics:`;
  const prompt = `Analyze the following for projects ${command} \n${tweetSummary}\n\nStatistics:`;

  const statistics = await generateStatistics(prompt);
  return statistics
}

module.exports = {
  analyzeTweets
}
