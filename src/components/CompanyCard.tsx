// components/CompanyCard.tsx
import Link from "next/link";
import { Company } from "@/lib/types";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/business/${company.id}`}>
      <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {company.profileImage && (
          <img src={company.profileImage} alt={company.name} className="w-full h-40 object-cover rounded-t-lg" />
        )}
        <h2 className="text-xl font-bold mt-4">{company.name}</h2>
        <p className="text-gray-600">{company.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {company.interests?.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}