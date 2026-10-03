export const SITE = {
  name: "Ozzy Installations",
  phone: { display: "(919) 000-0000", href: "tel:+19190000000" },
  email: "hello@example.com",
  serviceArea: ["Raleigh", "Durham", "Cary", "Wake Forest"],
  estimates: {
    coreArea: "Raleigh, Durham, Cary & Wake Forest",
    tripFee: 75,        // install estimates outside the core area
    diagnosticFee: 95,  // service calls
    creditedToJob: true,
  },
  foundedYear: 2023,
  experienceSince: 2008,
} as const;
