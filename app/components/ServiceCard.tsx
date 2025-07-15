import Link from "next/link";

interface ServiceCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  apiExample: string;
  gradientFrom: string;
  gradientTo: string;
  hoverGradient: string;
}

export default function ServiceCard({ 
  href, 
  title, 
  description, 
  icon, 
  apiExample, 
  gradientFrom, 
  gradientTo, 
  hoverGradient 
}: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative p-10 rounded-3xl border border-border/30 hover:border-accent/40 transition-all duration-500 bg-background/40 backdrop-blur-sm hover:bg-accent/5 overflow-hidden transform hover:scale-105 hover:shadow-2xl">
        {/* Hover gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 left-6 w-1 h-1 bg-accent rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            {icon}
          </div>
          
          {/* Content */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="text-muted/80 leading-relaxed text-base">
              {description}
            </p>
            
            {/* API Example */}
            <div className="mt-6 p-4 bg-accent/10 rounded-xl border border-accent/20 group-hover:bg-accent/15 transition-colors duration-300">
              <code className="text-sm font-mono text-accent/90 break-all">
                {apiExample}
              </code>
            </div>
          </div>
          
          {/* Hover arrow */}
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 