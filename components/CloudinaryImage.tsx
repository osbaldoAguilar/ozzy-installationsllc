"use client";

import Image, { type ImageProps } from "next/image";
import { cldUrl } from "@/lib/cloudinary";

// next/image with Cloudinary doing the resizing + format (WebP/AVIF) instead of Next.
// `src` is a Cloudinary public ID, e.g. PHOTOS.afterShiplap.
// A ~1KB blurred copy paints behind the photo so the space is never empty while it loads.
export default function CloudinaryImage({ alt, src, style, ...props }: Omit<ImageProps, "loader">) {
  const id = String(src);

  return (
    <Image
      {...props}
      src={id}
      alt={alt}
      loader={({ src, width, quality }) =>
        cldUrl(src, `f_auto,c_limit,w_${width},q_${quality ?? "auto"}`)
      }
      style={{
        backgroundImage: `url(${cldUrl(id, "f_auto,q_10,w_32,e_blur:400")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    />
  );
}
