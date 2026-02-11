import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ActiveFilter {
    id: string;
    label: string;
    onRemove: () => void;
}

interface ActiveFiltersProps {
    filters: ActiveFilter[];
    onClearAll: () => void;
}

export function ActiveFilters({ filters, onClearAll }: ActiveFiltersProps) {
    if (filters.length === 0) {
        return null;
    }

    return (
        <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                    Active Filters <span className="text-gray-500">({filters.length})</span>
                </h3>
                <Button
                    onClick={onClearAll}
                    className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                    ✕ Clear All
                </Button>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
                {filters.map(filter => (
                    <Badge
                        key={filter.id}
                        className="bg-green-100 text-green-800 hover:bg-green-200 text-xs px-3 py-1 flex items-center gap-2 cursor-pointer transition-colors"
                        onClick={filter.onRemove}
                    >
                        {filter.label}
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                filter.onRemove();
                            }}
                            className="ml-1 hover:text-green-900"
                            aria-label={`Remove ${filter.label} filter`}
                        >
                            <X size={14} />
                        </Button>
                    </Badge>
                ))}
            </div>

            {/* Info Text */}
            <p className="text-xs text-gray-500 mt-3">
                Click the ✕ to remove individual filters or "Clear All" to reset
            </p>
        </div>
    );
}
