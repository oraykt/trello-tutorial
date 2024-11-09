"use client";

import { defaultImages } from "@/config/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[]> | undefined;
}


export const FormPicker = ({
  id,
  errors,
}: FormPickerProps) => {
  const { pending } = useFormStatus()
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectImageId, setSelectImageId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const apiRequest = await unsplash.photos.getRandom({
          count: 9,
          collectionIds: ["317099"]
        })

        if (apiRequest && apiRequest.response) {
          const newImages = (apiRequest.response as Array<Record<string, any>>);
          setImages(newImages)
        } else {
          throw new Error("Failed to get images from Unsplash")
        }
      } catch (error) {
        console.error(error)
        // toast.error("Error fetching images")
        setImages(defaultImages.slice(0, 9))
      } finally {
        setIsLoading(false)
      }
    };

    fetchImages();
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 m-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-80 transition bg-muted"
            )}
            onClick={() => {
              if (pending) return
              setSelectImageId(image.id)
            }}
          >
            <input type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectImageId === image.id}
              disabled={pending}
              onChange={() => setSelectImageId(image.id)}
              // value = id|thumb|full|html|name
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              alt="Unsplash Image"
              src={image.urls.small}
              className="object-cover rounded-sm"
            />
            {selectImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full
              bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 
              w-full text-[10px] truncate text-white 
              hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors
        id="image"
        errors={errors}
      />
    </div>
  )
}