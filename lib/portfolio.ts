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

export const PROJECTS: Project[] = [
  {
    photo: PHOTOS.slateLinear,
    title: "Linear gas fireplace in slate tile",
    service: "fireplace_installation",
    alt: "Linear gas fireplace in a slate tile surround under a wood mantel",
    featured: true,
  },
  {
    photo: PHOTOS.traditionalMantel,
    title: "Gas insert in a traditional mantel",
    service: "hearth_mantel",
    alt: "Lit gas insert set in a carved white mantel with black stone surround",
    featured: true,
  },
  {
    photo: PHOTOS.whiteBrickChimney,
    title: "Painted brick chimney with custom shroud",
    service: "chimney_cap",
    alt: "Painted white brick chimney with a black metal shroud at dusk",
    featured: true,
  },
  {
    photo: PHOTOS.afterShiplap,
    title: "Whitewashed brick, shiplap & beam mantel",
    service: "fireplace_installation",
    alt: "Finished fireplace with whitewashed brick, beam mantel, sconces and shiplap wall",
  },
  {
    photo: PHOTOS.whiteMantelNewBuild,
    title: "Painted mantel and black hearth, new build",
    service: "hearth_mantel",
    alt: "White mantel and black hearth installed in a new-construction home",
  },
  {
    photo: PHOTOS.rooftopShroud,
    title: "Stone chimney with decorative shroud",
    service: "chimney_cap",
    alt: "Stone chimney with a black decorative shroud on a commercial rooftop",
  },
  {
    photo: PHOTOS.recessedLinear,
    title: "Recessed linear fireplace, ready for finish",
    service: "fireplace_installation",
    alt: "Linear fireplace set flush into a wall before the finish work",
  },
  {
    photo: PHOTOS.stoneChaseCover,
    title: "Stone chimney with stainless chase cover",
    service: "chimney_cap",
    alt: "Tall stone chimney topped with a stainless steel chase cover and cap",
  },
  {
    photo: PHOTOS.linearElectric,
    title: "Wall-mounted linear electric fireplace",
    service: "other_services",
    alt: "Linear electric fireplace installed in a wall during construction",
  },
  {
    photo: PHOTOS.brickStainlessCap,
    title: "Brick chimney with stainless cap",
    service: "chimney_cap",
    alt: "Light brick chimney with a stainless steel chimney cap",
  },
  {
    photo: PHOTOS.insertInstall,
    title: "Gas insert going into an opened wall",
    service: "fireplace_installation",
    alt: "Gas fireplace insert being fitted with the surrounding wall opened up",
  },
  {
    photo: PHOTOS.sidedChase,
    title: "Sided chimney chase with new cap",
    service: "chimney_cap",
    alt: "Gray sided chimney chase with a metal cap against a cloudy sky",
  },
];
