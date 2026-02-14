
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export interface CategoryCardProps {
    name: string
    itemCount: number
    image: string
}

export function CategoryCard({ name, itemCount, image }: CategoryCardProps) {
    return (
        <Card className="relative overflow-hidden pt-0 hover:shadow-lg transition-shadow">
            <CardHeader className="mt-0">
                <div className="flex flex-col items-center justify-between gap-1 mt-3">
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <p className="text-xs text-primary font-medium">
                        {itemCount} items
                    </p>
                </div>
            </CardHeader>
            {image ? (
                <img
                    src={image}
                    alt={name}
                    className="relative z-20 aspect-video w-full object-cover hover:scale-105 transition-transform duration-300"
                />
            ) : (
                <div className="relative z-20 aspect-video w-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
                    No Image
                </div>
            )}


        </Card>
    )
}
