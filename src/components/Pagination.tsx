"use client";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({ totalItems, itemsPerPage }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i} className="px-3 py-1 bg-gray-200 rounded-lg">
          {i + 1}
        </button>
      ))}
    </div>
  );
}
