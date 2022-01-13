import axios from 'axios';

export default async (metadata: { username: String, internalRefId: String }) => {

  if (!metadata.internalRefId) {
    return [];
  }

  const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
  })
  const ytUrl = `search?order=date&part=snippet&channelId=${metadata.internalRefId}&maxResults=100&key=${process.env.YOUTUBE_API_KEY}`

  const {
    data: { items: videos },
  } = await youtube.get(ytUrl)

  // @ts-ignore
  return videos.map(node => ({
    ...node.id,
    type: 'youtube',
    id: node.id.videoId,
    timestamp: new Date(node.snippet.publishTime).getTime() / 1000,
    date: new Date(node.snippet.publishTime).toLocaleDateString(),
  }))
}