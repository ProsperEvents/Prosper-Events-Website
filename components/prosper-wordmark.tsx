import Image from "next/image";

type ProsperWordmarkProps = {
  className?: string;
  priority?: boolean;
};

export function ProsperWordmark({
  className = "h-12 w-40 sm:h-14 sm:w-48",
  priority = false,
}: ProsperWordmarkProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src="/assets/logos/prosper-events-wordmark-transparent.png"
        alt="Prosper Events"
        fill
        priority={priority}
        className="object-contain"
        sizes="(max-width: 640px) 160px, 220px"
      />
    </div>
  );
}
