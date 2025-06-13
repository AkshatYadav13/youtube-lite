const ApiKey = import.meta.env.VITE_API_KEY;
const SearchApiKey = import.meta.env.VITE_SEARCH_API_KEY;

export const BaseUrl = "https://www.googleapis.com/youtube/v3";
export const BaseYtVideoApi = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${ApiKey}`
export const YtVideoApi = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&key=${ApiKey}`;
export const CommentsAPi = `https://www.googleapis.com/youtube/v3/commentThreads?&part=snippet&key=${ApiKey}`
export const LiveChatIdAPi = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&key=${ApiKey}&id=`
export const LiveChatApi = `https://www.googleapis.com/youtube/v3/liveChat/messages?&part=snippet,authorDetails&maxResults=1&key=${ApiKey}`
export const RelatedVideoApi = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&regionCode=IN&videoDuration=long&key=${ApiKey}&videoCategoryId=`
export const ChannelVideoApi =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=${ApiKey}`
export const CategoryVideosApi =`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&type=video&key=${ApiKey}`


export function formatNumber(num) {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M"; // Millions
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K"; // Thousands
    } else {
      return num.toString(); // Less than a thousand, no formatting
    }
}

export function daysAgo(Time){
    const createdAt = new Date(Time)
    const currentTime = new Date()
    const diffTime = currentTime - createdAt
    return  Math.floor(diffTime/(1000*24*60*60))
}

export const StaticSuggestions = [
  "Virat Kohli",
  "MS Dhoni",
  "India vs Pakistan",
  "React Tutorial",
  "JavaScript ES6",
  "Cricket Highlights",
  "Motivational Speech",
  "Top 10 Goals",
  "Live Coding",
  "Frontend Developer",
  "How to make money online",
  "Best Coding Practices",
  "Learn Redux Toolkit",
  "IPL Highlights",
  "Next.js vs React",
  "ChatGPT Tutorial",
  "Netflix Clone",
  "Machine Learning Basics",
  "Startup Ideas",
  "Vlogging Camera Review"
];


