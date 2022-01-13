import axios from 'axios';

export const services = {
  youtube: async (metadata: { username: String, internalRefId: String }) => {

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
  },
  twitter: async (username: String) => {
    const twitter = axios.create({
      baseURL: 'https://api.twitter.com/2/',
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    })

    const {
      data: { data: user },
    } = await twitter.get(
      `users/by/username/${username}`
    )

    const {
      data: { data: tweets },
    } = await twitter.get(
      `/users/${user.id}/tweets?max_results=20&tweet.fields=created_at`
    )

    // @ts-ignore
    return tweets.map((node) => ({
      ...node,
      type: 'twitter',
      timestamp: new Date(node.created_at).getTime() / 1000,
      date: new Date(node.created_at).toLocaleDateString(),
    })
    )
  },
  instagram: async (username: String) => {
    const instagram = axios.create({
      baseURL: 'https://instagram.com/',
    })

    const { data: profile } = await instagram.get(
      `${username}?__a=1`
    )

    if (!profile.graphql) {
      return [];
    }

    return profile.graphql.user.edge_owner_to_timeline_media.edges.map(
      // @ts-ignore
      (edge) => ({
        ...edge.node,
        type: 'instagram',
        timestamp: edge.node.taken_at_timestamp,
        date: new Date(
          edge.node.taken_at_timestamp * 1000
        ).toLocaleDateString(),
      })
    )
  }
}

export function getHandles(profile: String, extras: any) {

  try {
    const staticCached = require(`~/data/${profile}/metadata.json`)
    return staticCached
  } catch (error) {
    const metadata = {
      "handles": {
        "twitter": extras.twitter || profile,
        "github": extras.github || profile,
        "linkedin": extras.linkedin || profile,
        "instagram": extras.instagram || profile,
        "facebook": extras.facebook || profile,
        "pinterest": extras.pinterest || profile,
        "tumblr": extras.tumblr || profile,
        "tiktok": extras.tiktok || profile,
        "reddit": extras.reddit || profile,
        "youtube": {},
      }
    }

    if (extras.youtubeId) {
      metadata.handles = {
        ...metadata.handles,
        youtube: {
          "username": extras.youtube || profile,
          "internalRefId": extras.youtubeId,
        }
      }
    }
    return metadata;
  }
}