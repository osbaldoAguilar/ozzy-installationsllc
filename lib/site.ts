// Public business info shown on the site. Not secrets — keep env vars for those.
export const SITE = {
  name: "Ozzy Installations",
  owner: "Osbaldo",
  phone: { display: "(919) 816-6563", href: "tel:+19198166563" },
  email: "hello@example.com",
  instagram: {
    handle: "@ozzyinstallationsllc",
    href: "https://www.instagram.com/ozzyinstallationsllc/",
  },
  serviceArea: ["Raleigh", "Durham", "Cary", "Wake Forest"],
  estimates: {
    coreArea: "Raleigh, Durham, Cary & Wake Forest",
    tripFee: 75,        // install estimates outside the core area ("from" — scales with distance)
    diagnosticFee: 95,  // service calls
    creditedToJob: true,
  },
  foundedYear: 2023,
  experienceSince: 2008,
  // Pre-winter "book a service call" bar at the top of every page.
  seasonBanner: true,
} as const;

export const yearsInTrade = () => new Date().getFullYear() - SITE.experienceSince;
