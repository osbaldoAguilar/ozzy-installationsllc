"use client";

import { useEffect, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, Image01Icon } from "@hugeicons/core-free-icons";

import { signPhotoUpload } from "@/app/(marketing)/contact/actions";
import { LEAD_PHOTO_MAX } from "@/lib/cloudinary";

type Photo = {
  id: string;
  preview: string; // local object URL for the thumbnail
  status: "uploading" | "done" | "error";
  url?: string; // Cloudinary secure_url once uploaded
};

const MAX_EDGE = 2400; // plenty for judging a fireplace, keeps uploads ~1MB
const CLOUDINARY_MAX_BYTES = 10 * 1024 * 1024; // free plan limit per image

// Shrinks big phone photos in the browser before upload. If the browser can't read the
// format (e.g. HEIC outside Safari), the original file is uploaded as-is.
async function shrink(file: File): Promise<Blob> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    return blob ?? file;
  } catch {
    return file;
  }
}

async function upload(file: File): Promise<string> {
  const signed = await signPhotoUpload();
  if (!signed) throw new Error("Uploads aren't configured.");
  const blob = await shrink(file);
  if (blob.size > CLOUDINARY_MAX_BYTES) throw new Error("Photo is too large.");

  const body = new FormData();
  body.append("file", blob, blob === file ? file.name : "photo.jpg");
  body.append("api_key", signed.apiKey);
  body.append("signature", signed.signature);
  for (const [k, v] of Object.entries(signed.params)) body.append(k, v);

  const res = await fetch(signed.uploadUrl, { method: "POST", body });
  const json = await res.json();
  if (!res.ok || !json.secure_url) throw new Error(json.error?.message ?? "Upload failed.");
  return json.secure_url as string;
}

export default function PhotoPicker({ onBusyChange }: { onBusyChange: (busy: boolean) => void }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [note, setNote] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The form keeps Send disabled while anything is still uploading.
  const busy = photos.some((p) => p.status === "uploading");
  useEffect(() => onBusyChange(busy), [busy, onBusyChange]);

  const update = (id: string, patch: Partial<Photo>) =>
    setPhotos((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const add = (files: FileList | null) => {
    if (!files?.length) return;
    const room = LEAD_PHOTO_MAX - photos.length;
    const picked = Array.from(files).slice(0, Math.max(room, 0));
    setNote(files.length > room ? `You can attach up to ${LEAD_PHOTO_MAX} photos.` : null);

    const added: Photo[] = picked.map((file) => ({
      id: crypto.randomUUID(),
      preview: URL.createObjectURL(file),
      status: "uploading",
    }));
    setPhotos((list) => [...list, ...added]);

    picked.forEach((file, i) => {
      upload(file)
        .then((url) => update(added[i].id, { status: "done", url }))
        .catch(() => update(added[i].id, { status: "error" }));
    });
    if (inputRef.current) inputRef.current.value = ""; // allow re-picking the same file
  };

  const remove = (id: string) =>
    setPhotos((list) => {
      const gone = list.find((p) => p.id === id);
      if (gone) URL.revokeObjectURL(gone.preview);
      return list.filter((p) => p.id !== id);
    });

  const failed = photos.some((p) => p.status === "error");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="photos" className="text-[15px] font-semibold">
        Photos of the space
        <span className="font-normal text-muted-foreground">
          {" "}
          (optional, up to {LEAD_PHOTO_MAX}, helps us quote faster)
        </span>
      </label>

      {photos.length > 0 && (
        <ul className="flex flex-wrap gap-2.5">
          {photos.map((photo) => (
            <li key={photo.id} className="relative size-20 overflow-hidden rounded-xl bg-section">
              {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the visitor's own file */}
              <img src={photo.preview} alt="" className="size-full object-cover" />
              {photo.status !== "done" && (
                <span
                  className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${
                    photo.status === "error"
                      ? "bg-destructive/80 text-white"
                      : "animate-pulse bg-deep-space-blue/60 text-vanilla-custard-900"
                  }`}
                >
                  {photo.status === "error" ? "Failed" : "Uploading…"}
                </span>
              )}
              <button
                type="button"
                onClick={() => remove(photo.id)}
                aria-label="Remove photo"
                className="absolute top-1 right-1 flex size-7 items-center justify-center rounded-full bg-deep-space-blue/85 text-vanilla-custard-900"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
              </button>
              {photo.url && <input type="hidden" name="photoUrls" value={photo.url} />}
            </li>
          ))}
        </ul>
      )}

      {photos.length < LEAD_PHOTO_MAX && (
        <label
          htmlFor="photos"
          className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-dashed border-border bg-section px-3.5 py-2.5 text-[15px] font-semibold has-focus-visible:ring-2 has-focus-visible:ring-vivid-tangerine/40"
        >
          <HugeiconsIcon icon={Image01Icon} size={20} />
          {photos.length ? "Add more photos" : "Add photos"}
          <input
            ref={inputRef}
            id="photos"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => add(e.target.files)}
            className="sr-only"
          />
        </label>
      )}

      {(note || failed) && (
        <p className="text-sm text-muted-foreground" role="status">
          {failed ? "Some photos didn't upload. Remove them and try again. " : ""}
          {note}
        </p>
      )}
    </div>
  );
}
