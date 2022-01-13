import youtube from './youtube';
import twitter from './twitter';
import instagram from './instagram';
import tiktok from './tiktok';


export const services = {
  youtube,
  twitter,
  instagram,
  // tiktok,
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