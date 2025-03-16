import Link from "next/link";
import { Company } from "@/lib/types";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const tags = company.interests?.slice(0, 3) || []; // Begrens til 3 tagger

  return (
    <Link href={`/business/${company.id}`}>
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-[400px] w-[300px] flex flex-col items-center">
        <div className="flex items-center mb-4">
          {company.profileImage ? (
            <img
              src={company.profileImage}
              alt={company.name}
              className="w-20 h-20 object-cover rounded-full mr-4"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full mr-4" />
          )}
          <h2 className="text-xl font-bold">{company.name}</h2>
        </div>
        <p className="text-gray-600 text-center flex-grow">{company.description}</p>
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}