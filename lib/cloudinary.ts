// Cloudinary delivery. The cloud name is public (it's in every image URL),
// so it lives here instead of an env var. CLOUDINARY_URL stays server-only.
export const CLOUD_NAME = "gto-development";

export function cldUrl(publicId: string, transforms = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

// Public IDs of photos used on the site.
export const PHOTOS = {
  beforeShiplap: "7757083843514528746_bzhyjo",
  afterShiplap: "IMG_7729_uiuxs9",
  slateLinear: "IMG_7650_t5aha7",
  traditionalMantel: "IMG_9096_ov0bl5",
  whiteBrickChimney: "IMG_5109_amhddo",
  onTheRoof: "IMG_7422_batool",
  rooftopShroud: "IMG_4704_pakbms",
  whiteMantelNewBuild: "IMG_5983_qsjml9",
  insertInstall: "IMG_8884_fgzutf",
  linearElectric: "IMG_5868_bsj9em",
} as const;
