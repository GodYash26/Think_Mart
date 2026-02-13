import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUploadProductImage } from "@/hooks/media/useUploadProductImage"

interface MediaUploadFieldProps {
  label?: string
  value?: string
  initialUrl?: string
  onChange: (value: string | undefined) => void
}

export function MediaUploadField({
  label = "Product Image",
  value,
  initialUrl,
  onChange,
}: MediaUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [hasClearedInitial, setHasClearedInitial] = useState(false)
  const uploadMutation = useUploadProductImage()

  useEffect(() => {
    if (initialUrl) {
      setPreviewUrl(initialUrl)
      setHasClearedInitial(false)
    }
  }, [initialUrl])

  useEffect(() => {
    if (!previewUrl && initialUrl && !hasClearedInitial) {
      setPreviewUrl(initialUrl)
    }
  }, [hasClearedInitial, initialUrl, previewUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    uploadMutation.mutate(file, {
      onSuccess: (media) => {
        setPreviewUrl(media.url)
        onChange(media._id)
      },
    })
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">{label}</div>
      <div className="flex flex-col gap-3">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploadMutation.isPending}
        />
        {uploadMutation.isPending && (
          <div className="text-sm text-muted-foreground">Uploading...</div>
        )}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="h-32 w-32 rounded-md object-cover"
          />
        )}
        {!previewUrl && value && (
          <div className="text-sm text-muted-foreground">Media linked</div>
        )}
        {(previewUrl || value) && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setPreviewUrl(null)
              setHasClearedInitial(true)
              onChange(undefined)
            }}
          >
            Remove image
          </Button>
        )}
      </div>
    </div>
  )
}
