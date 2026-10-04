import { PHOTOS } from "@/lib/cloudinary";
import type { ServiceType } from "@/lib/services";

// TODO: move to Sanity `portfolioItem` once the Studio is wired up.
export type Project = {
  photo: string; // Cloudinary public ID
  title: string;
  service: ServiceType;
  alt: string;
  featured?: boolean; // shown on the home page
};

// Strongest first — the home page shows the `featured` ones, /portfolio shows them all.
export const PROJECTS: Project[] = [
  {
    photo: PHOTOS.archedInsert,
    title: "Arched gas insert in a brick fireplace",
    service: "fireplace_installation",
    alt: "Arched black gas insert with the fire lit, set into a red brick fireplace",
    featured: true,
  },
  {
    photo: PHOTOS.copperCapWhite,
    title: "Custom copper chimney cap",
    service: "chimney_cap",
    alt: "Copper chimney cap with cross-braced sides on a white chimney",
    featured: true,
  },
  {
    photo: PHOTOS.stoneLinearGas,
    title: "Linear gas fireplace in stacked stone",
    service: "fireplace_installation",
    alt: "Linear gas fireplace with a flame running, set in a stacked stone wall",
    featured: true,
  },
  {
    photo: PHOTOS.craneShroud,
    title: "Chimney shroud lifted into place by crane",
    service: "chimney_cap",
    alt: "Custom chimney shroud hanging from crane straps against a blue sky",
  },
  {
    photo: PHOTOS.poolPavilion,
    title: "Poolside pavilion fireplace",
    service: "fireplace_installation",
    alt: "White lattice pool pavilion with a fireplace and chimney, seen across the pool",
  },
  {
    photo: PHOTOS.traditionalMantel,
    title: "Gas insert in a traditional mantel",
    service: "hearth_mantel",
    alt: "Lit gas insert set in a carved white mantel with black stone surround",
  },
  {
    photo: PHOTOS.herringboneFirebrick,
    title: "Herringbone firebrick firebox",
    service: "fireplace_installation",
    alt: "Firebox lined with firebrick in a herringbone pattern, with a gas log set",
  },
  {
    photo: PHOTOS.deckOutdoor,
    title: "Outdoor fireplace on a covered deck",
    service: "fireplace_installation",
    alt: "Outdoor fireplace with gas logs in a framed surround on a covered wood deck",
  },
  {
    photo: PHOTOS.slateLinear,
    title: "Linear gas fireplace in slate tile",
    service: "fireplace_installation",
    alt: "Linear gas fireplace in a slate tile surround under a wood mantel",
  },
  {
    photo: PHOTOS.copperCapBrick,
    title: "Copper cap on a painted brick chimney",
    service: "chimney_cap",
    alt: "Copper chimney cap on a white painted brick chimney",
  },
  {
    photo: PHOTOS.whiteBrickChimney,
    title: "Painted brick chimney with custom shroud",
    service: "chimney_cap",
    alt: "Painted white brick chimney with a black metal shroud at dusk",
  },
  {
    photo: PHOTOS.woodStoveKitchen,
    title: "Wood stove with black stovepipe",
    service: "other_services",
    alt: "Black wood stove with stovepipe running up through the ceiling",
  },
  {
    photo: PHOTOS.tileRoofChimney,
    title: "Chimney top on a clay tile roof",
    service: "chimney_cap",
    alt: "White chimney with mesh openings and a clay tile cap on a tile roof",
  },
  {
    photo: PHOTOS.whiteMantelNewBuild,
    title: "Painted mantel and black hearth, new build",
    service: "hearth_mantel",
    alt: "White mantel and black hearth installed in a new-construction home",
  },
  {
    photo: PHOTOS.stoneLinearElectric,
    title: "Linear electric fireplace in stacked stone",
    service: "other_services",
    alt: "Linear electric fireplace with colored flames under a dark wood mantel in stacked stone",
  },
  {
    photo: PHOTOS.gasInsertLit,
    title: "Gas insert back up and running",
    service: "service_call",
    alt: "Gas fireplace insert lit and running behind a tile surround",
  },
  {
    photo: PHOTOS.blackShroudModern,
    title: "Modern black chimney shroud",
    service: "chimney_cap",
    alt: "Boxy black chimney shroud with open sides on a light chimney",
  },
  {
    photo: PHOTOS.commercialUnits,
    title: "Linear fireplaces in a commercial build",
    service: "fireplace_installation",
    alt: "Steel linear fireplace units framed in on an unfinished commercial floor",
  },
  {
    photo: PHOTOS.newbuildFraming,
    title: "Two-story fireplace framed in a new build",
    service: "fireplace_installation",
    alt: "Fireplace set at the base of a tall framed chase inside a new home",
  },
  {
    photo: PHOTOS.whiteMantelDark,
    title: "Painted mantel with black surround",
    service: "hearth_mantel",
    alt: "White painted mantel with a black surround and hearth on a light wood floor",
  },
  {
    photo: PHOTOS.woodStoveCabin,
    title: "Wood stove in a cabin",
    service: "other_services",
    alt: "Black wood stove with stovepipe in a pine-paneled cabin",
  },
  {
    photo: PHOTOS.rooftopShroud,
    title: "Stone chimney with decorative shroud",
    service: "chimney_cap",
    alt: "Stone chimney with a black decorative shroud on a commercial rooftop",
  },
  {
    photo: PHOTOS.commercialVenting,
    title: "Venting runs in a multi-story build",
    service: "fireplace_installation",
    alt: "Stainless steel vent pipes rising through an unfinished multi-story building",
  },
  {
    photo: PHOTOS.stoneChaseCover,
    title: "Stone chimney with stainless chase cover",
    service: "chimney_cap",
    alt: "Tall stone chimney topped with a stainless steel chase cover and cap",
  },
  {
    photo: PHOTOS.recessedLinear,
    title: "Recessed linear fireplace, ready for finish",
    service: "fireplace_installation",
    alt: "Linear fireplace set flush into a wall before the finish work",
  },
];
