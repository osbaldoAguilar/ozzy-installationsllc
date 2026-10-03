import type { ServiceType } from "@/lib/services";

// Cloudinary delivery. The cloud name is public (it's in every image URL),
// so it lives here instead of an env var. CLOUDINARY_URL stays server-only.
export const CLOUD_NAME = "gto-development";

export function cldUrl(publicId: string, transforms = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export function cldVideoUrl(publicId: string, transforms: string, ext = "mp4") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms}/${publicId}.${ext}`;
}

// Hero background: 52s, muted. The 1280px H.264 version is pre-generated on upload (~4.7MB vs 30MB).
export const HERO_VIDEO = {
  src: cldVideoUrl("site/hero-video", "w_1280,q_auto,vc_h264,ac_none"),
  poster: cldVideoUrl("site/hero-video", "so_0,w_1600,q_auto,f_auto", "jpg"),
};

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
  recessedLinear: "IMG_6360_pafhwj",
  stoneChaseCover: "IMG_7479_sdjngo",
  brickStainlessCap: "IMG_4714_lsj6xg",
  sidedChase: "IMG_4403_nhfdsc",
  shiplapInProgress: "IMG_7552_oi14mv",
} as const;

// One representative photo per service (home cards + /services).
export const SERVICE_PHOTOS: Record<ServiceType, { photo: string; alt: string }> = {
  fireplace_installation: {
    photo: PHOTOS.slateLinear,
    alt: "Linear gas fireplace in a slate tile surround under a wood mantel",
  },
  chimney_cap: {
    photo: PHOTOS.rooftopShroud,
    alt: "Stone chimney with a black decorative shroud on a commercial rooftop",
  },
  hearth_mantel: {
    photo: PHOTOS.whiteMantelNewBuild,
    alt: "White mantel and black hearth installed in a new-construction home",
  },
  service_call: {
    photo: PHOTOS.insertInstall,
    alt: "Gas fireplace insert being fitted with the surrounding wall opened up",
  },
  other_services: {
    photo: PHOTOS.linearElectric,
    alt: "Wall-mounted linear electric fireplace installed during construction",
  },
};
