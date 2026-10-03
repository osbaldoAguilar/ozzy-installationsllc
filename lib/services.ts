export const installationType = {
  nc: "new_construction",
  rm: "remodel",
  cm: "commercial_construction",
} as const;
export const SERVICE_CATEGORIES = {
  fireplace_installation: {
    label: "Fireplace Installation",
    subtypes: {
      direct_vent: "Direct Vent",
      thru_roof: "Thru-Roof",
      thru_chase: "Thru-Chase",
      vent_free: "Vent-Free",
      brick_mortar: "Firebrick & Mortar",
    },
    installationType: installationType,
  },
  chimney_cap: {
    label: "Chimney Cap",
    subtypes: null,
    installationType: installationType,
  },
  hearth_mantel: {
    label: "Hearth & Mantel",
    subtypes: null,
    installationType: installationType,
  },
  service_call: {
    label: "Service Call",
    subtypes: null,
    installationType: installationType,
  },
  other_services: {
    label: "Other Services",
    subtypes: null,
    installationType: installationType,
  },
} as const;

export type ServiceType = keyof typeof SERVICE_CATEGORIES;

// every subtype key across all categories, as flat union + array (for DB enum)
export type ServiceSubtype = {
  [K in ServiceType]: (typeof SERVICE_CATEGORIES)[K]["subtypes"] extends null
    ? never
    : keyof NonNullable<(typeof SERVICE_CATEGORIES)[K]["subtypes"]>;
}[ServiceType];

export const SERVICE_TYPES = Object.keys(SERVICE_CATEGORIES) as ServiceType[];
export const SERVICE_SUBTYPES = Object.values(SERVICE_CATEGORIES).flatMap(
  (c) => (c.subtypes ? Object.keys(c.subtypes) : []),
) as ServiceSubtype[];

export type InstallationType = (typeof installationType)[keyof typeof installationType];

export const INSTALLATION_TYPE_LABELS: Record<InstallationType, string> = {
  new_construction: "New construction",
  remodel: "Remodel",
  commercial_construction: "Commercial construction",
};
