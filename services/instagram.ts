import axios from 'axios';

export default async (username: String) => {
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