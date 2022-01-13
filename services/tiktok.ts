import tiktok from "tiktok-app-api";

export default async (username: string) => {
  console.log("tiktok");
  
  const tiktokClient = await tiktok();
  const user = await tiktokClient.getUserByName(username);
  console.log({ user });
  const iterator = tiktokClient.getUploadedVideos(user);
  const videosResult = await iterator.next();
  const uploadedVideos = videosResult.value;

  console.log(uploadedVideos);

  return uploadedVideos;
}