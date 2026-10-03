"use client";

import Image, { type ImageProps } from "next/image";
import { cldUrl, WATERMARK } from "@/lib/cloudinary";

// next/image with Cloudinary doing the resizing + format (WebP/AVIF) instead of Next.
// `src` is a Cloudinary public ID, e.g. PHOTOS.afterShiplap.
// A ~1KB blurred copy paints behind the photo so the space is never empty while it loads.
// `aspect` (e.g. "4:5") has Cloudinary crop to the frame's shape first, so a `watermark` always
// lands in the visible corner. `gravity` picks which part to keep (center by default; "south"
// when the subject sits low). Watermark is skipped on thumbnails under 480px.
export default function CloudinaryImage({
  alt,
  src,
  style,
  watermark = false,
  aspect,
  gravity = "center",
  ...props
}: Omit<ImageProps, "loader"> & {
  watermark?: boolean;
  aspect?: `${number}:${number}`;
  gravity?: "center" | "north" | "south";
}) {
  const id = String(src);

  return (
    <Image
      {...props}
      src={id}
      alt={alt}
      loader={({ src, width, quality }) => {
        const crop = aspect ? `c_fill,g_${gravity},ar_${aspect}` : "c_limit";
        const size = `f_auto,${crop},w_${width},q_${quality ?? "auto"}`;
        return cldUrl(src, watermark && width >= 480 ? `${size}/${WATERMARK}` : size);
      }}
      style={{
        backgroundImage: `url(${cldUrl(id, "f_auto,q_10,w_32,e_blur:400")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    />
  );
}
