import type { ServiceType } from "@/lib/services";

// Cloudinary delivery. The cloud name is public (it's in every image URL),
// so it lives here instead of an env var. CLOUDINARY_URL stays server-only.
export const CLOUD_NAME = "gto-development";

export function cldUrl(publicId: string, transforms = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

// White logo (site/watermark) in the bottom-right corner, 16% of the image width.
// Applied on delivery, so the originals in Cloudinary stay clean.
export const WATERMARK =
  "l_site:watermark,w_0.16,fl_relative,o_80,e_shadow:30/fl_layer_apply,g_south_east,x_0.04,y_0.03";

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
  // Uploaded from the job photo drive as JPEGs (originals were too big for the free plan).
  shiplapSurround: "jobs/shiplap-1-surround",
  shiplapBrick: "jobs/shiplap-2-brick",
  shiplapFraming: "jobs/shiplap-3-framing",
  shiplapShiplap: "jobs/shiplap-4-shiplap",
  shiplapFinished: "jobs/shiplap-5-finished",
  crewFraming: "jobs/crew-framing",
  crewCopperCap: "jobs/crew-copper-cap",
  crewInsert: "jobs/crew-insert",
  crewBellCap: "jobs/crew-bell-cap",
  poolPavilion: "jobs/pool-pavilion",
  copperCapWhite: "jobs/copper-cap-white",
  copperCapBrick: "jobs/copper-cap-brick",
  tileRoofChimney: "jobs/tile-roof-chimney",
  craneShroud: "jobs/crane-shroud",
  archedInsert: "jobs/arched-insert",
  stoneLinearGas: "jobs/stone-linear-gas",
  stoneLinearElectric: "jobs/stone-linear-electric",
  gasInsertLit: "jobs/gas-insert-lit",
  woodStoveKitchen: "jobs/wood-stove-kitchen",
  woodStoveCabin: "jobs/wood-stove-cabin",
  deckOutdoor: "jobs/deck-outdoor",
  herringboneFirebrick: "jobs/herringbone-firebrick",
  commercialVenting: "jobs/commercial-venting",
  commercialUnits: "jobs/commercial-units",
  newbuildFraming: "jobs/newbuild-framing",
  whiteMantelDark: "jobs/white-mantel-dark",
  blackShroudModern: "jobs/black-shroud-modern",
} as const;

// One representative photo per service (home cards + /services).
export const SERVICE_PHOTOS: Record<
  ServiceType,
  { photo: string; alt: string; gravity?: "center" | "south" }
> = {
  fireplace_installation: {
    photo: PHOTOS.stoneLinearGas,
    alt: "Linear gas fireplace with a flame running, set in a stacked stone wall",
  },
  chimney_cap: {
    photo: PHOTOS.copperCapWhite,
    alt: "Custom copper chimney cap on a white chimney against a blue sky",
  },
  hearth_mantel: {
    photo: PHOTOS.whiteMantelNewBuild,
    alt: "White mantel and black hearth installed in a new-construction home",
  },
  service_call: {
    photo: PHOTOS.gasInsertLit,
    alt: "Gas fireplace insert lit and running behind a tile surround",
  },
  other_services: {
    photo: PHOTOS.woodStoveKitchen,
    alt: "Black wood stove with stovepipe running up through the ceiling",
    gravity: "south",
  },
};
