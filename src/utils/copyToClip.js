export async function copyToClip() {
    //console.log(location.href);
  await navigator.clipboard.writeText(location.href);
}

export const ShareLink = () => {
  const link = location.protocol + "//" + location.host + location.pathname;
  return link
}

export const copyProfileLink = async (id) => {
  const profileLink = location.protocol + "//" + location.host + '/user/' + id;
  await navigator.clipboard.writeText(profileLink);
}