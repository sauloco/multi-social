import axios from 'axios';

export default async (username: String) => {
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
}