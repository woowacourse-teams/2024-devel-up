const extractMissionName = (url: string) => {
  const match = url.match(/^https:\/\/github\.com\/[^\/]+\/([^\/]+)\/pull\/\d+$/);
  return match ? match[1] : '';
};

export default extractMissionName;
