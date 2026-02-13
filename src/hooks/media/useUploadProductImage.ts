import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { mediaApi } from "@/lib/api/media"

export function useUploadProductImage() {
  return useMutation({
    mutationFn: (file: File) => mediaApi.uploadProductImage(file),
    onError: (error: any) => {
      toast.error(error.message || "Failed to upload image")
    },
  })
}
