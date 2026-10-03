"use client";

import Image, { type ImageProps } from "next/image";
import { cldUrl } from "@/lib/cloudinary";

// next/image with Cloudinary doing the resizing + format (WebP/AVIF) instead of Next.
// `src` is a Cloudinary public ID, e.g. PHOTOS.afterShiplap.
export default function CloudinaryImage({ alt, ...props }: Omit<ImageProps, "loader">) {
  return (
    <Image
      {...props}
      alt={alt}
      loader={({ src, width, quality }) =>
        cldUrl(src, `f_auto,c_limit,w_${width},q_${quality ?? "auto"}`)
      }
    />
  );
}
