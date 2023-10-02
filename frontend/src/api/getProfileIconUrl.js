export const getProfileIconUrl = (profileIconId) => {
  const profileIconBaseUrl = 'https://cdn.communitydragon.org/latest/profile-icon/';
  return `${profileIconBaseUrl}${profileIconId}.jpg`;
};