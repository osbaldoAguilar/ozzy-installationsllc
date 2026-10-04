import { SITE } from "@/lib/site";
import { PHOTOS, cldUrl } from "@/lib/cloudinary";

// Structured data so Google can show the business (name, phone, service area) in results.
// Service-area business: no street address on purpose.
export default function BusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phone.href.replace("tel:", ""),
    image: cldUrl(PHOTOS.stoneLinearGas, "f_jpg,q_auto,w_1200"),
    logo: `${SITE.url}/icon.png`,
    foundingDate: String(SITE.foundedYear),
    areaServed: SITE.serviceArea.map((city) => ({ "@type": "City", name: `${city}, NC` })),
    sameAs: [SITE.instagram.href],
    description: `Family-owned fireplace and hearth installers in the Triangle, NC, installing fireplaces since ${SITE.experienceSince}.`,
  };

  return (
    <script
      type="application/ld+json"
      // JSON from our own constants, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
