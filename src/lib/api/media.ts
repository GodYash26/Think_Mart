import apiClient from "@/lib/axios"

export interface MediaAsset {
  _id: string
  url: string
  fileName?: string
}

export const mediaApi = {
  async uploadProductImage(file: File): Promise<MediaAsset> {
    const formData = new FormData()
    formData.append("image", file)

    const response = await apiClient.post("/media/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data?.media ?? response.data
  },
}
