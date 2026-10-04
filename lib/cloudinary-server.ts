import "server-only";

import { createHash } from "node:crypto";

import { LEAD_PHOTO_FOLDER } from "@/lib/cloudinary";

// Customer photos from the estimate form. The browser uploads straight to Cloudinary
// (phone photos are bigger than a Server Action body allows), using a signature from here.

function credentials() {
  const match = process.env.CLOUDINARY_URL?.trim().match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!match) return null;
  const [, apiKey, apiSecret, cloudName] = match;
  return { apiKey, apiSecret, cloudName };
}

/**
 * Signs an upload restricted to the leads folder and image formats.
 * Cloudinary rejects a signature after an hour, and any upload whose params don't match it.
 */
export function signLeadPhotoUpload() {
  const creds = credentials();
  if (!creds) return null;

  const params = {
    allowed_formats: "jpg,jpeg,png,webp,heic,heif",
    folder: LEAD_PHOTO_FOLDER,
    tags: "lead",
    timestamp: String(Math.floor(Date.now() / 1000)),
  };
  // Cloudinary signature: sha1 of the params sorted by key, as a query string, plus the secret.
  const toSign = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  const signature = createHash("sha1").update(toSign + creds.apiSecret).digest("hex");

  return {
    uploadUrl: `https://api.cloudinary.com/v1_1/${creds.cloudName}/image/upload`,
    apiKey: creds.apiKey,
    signature,
    params,
  };
}
