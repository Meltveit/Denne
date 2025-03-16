interface AdBannerProps {
    className?: string;
  }
  
  export default function AdBanner({ className = "" }: AdBannerProps) {
    return (
      <div className={`p-4 bg-gray-200 rounded-lg ${className}`}>
        <p>Ad: B2B Finance Solution</p>
      </div>
    );
  }