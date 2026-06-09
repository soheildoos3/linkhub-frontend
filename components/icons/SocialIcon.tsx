import Image from "next/image";

export interface SocialIconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
}

const backgroundColors: Record<string, string> = {
  soroush: "bg-[#00ADE5]/10 hover:bg-[#00ADE5]/20",
  aparat: "bg-[#ED1C24]/10 hover:bg-[#ED1C24]/20",
  eitaa: "bg-[#28A745]/10 hover:bg-[#28A745]/20",
  bale: "bg-[#2D9CDB]/10 hover:bg-[#2D9CDB]/20",
  rubika: "bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20",
  instagram: "bg-[#E4405F]/10 hover:bg-[#E4405F]/20",
  whatsapp: "bg-[#25D366]/10 hover:bg-[#25D366]/20",
  telegram: "bg-[#26A5E4]/10 hover:bg-[#26A5E4]/20",
  twitter: "bg-[#000000]/10 hover:bg-[#000000]/20",
  linkedin: "bg-[#0077B5]/10 hover:bg-[#0077B5]/20",
  github: "bg-[#181717]/10 hover:bg-[#181717]/20",
  youtube: "bg-[#FF0000]/10 hover:bg-[#FF0000]/20",
  facebook: "bg-[#1877F2]/10 hover:bg-[#1877F2]/20",
  tiktok: "bg-[#000000]/10 hover:bg-[#000000]/20",
  spotify: "bg-[#1DB954]/10 hover:bg-[#1DB954]/20",
  discord: "bg-[#5865F2]/10 hover:bg-[#5865F2]/20",
  website: "bg-gray-100 hover:bg-gray-200",
  phone: "bg-gray-100 hover:bg-gray-200",
  email: "bg-gray-100 hover:bg-gray-200",
  location: "bg-gray-100 hover:bg-gray-200",
  link: "bg-gray-100 hover:bg-gray-200",
};

const iconPaths: Record<string, string> = {
  soroush: "/icons/soroush.png",
  aparat: "/icons/aparat.png",
  eitaa: "/icons/eitaa.png",
  bale: "/icons/bale.png",
  rubika: "/icons/rubika.png",
  instagram: "/icons/instagram.png",
  whatsapp: "/icons/whatsapp.png",
  telegram: "/icons/telegram.png",
  twitter: "/icons/twitter.png",
  linkedin: "/icons/linkedin.png",
  github: "/icons/github.png",
  youtube: "/icons/youtube.png",
  facebook: "/icons/facebook.png",
  tiktok: "/icons/tiktok.png",
  spotify: "/icons/spotify.png",
  discord: "/icons/discord.png",
  website: "/icons/website.png",
  phone: "/icons/phone.png",
  email: "/icons/email.png",
  location: "/icons/location.png",
  link: "/icons/link.png",
};

export const SocialIcon = ({
  name,
  size = 20,
  className = "",
}: SocialIconProps) => {
  const iconKey = name.toLowerCase();
  const iconPath = iconPaths[iconKey];

  const bgClass = backgroundColors[iconKey] || "bg-gray-100 hover:bg-gray-200";

  if (!iconPath) {
    return (
      <div
        className={`${bgClass} rounded-full p-2 transition-all duration-300 group-hover:scale-110`}
      >
        <div
          className="flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <span className="text-xs font-bold">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${bgClass} rounded-full p-2 transition-all duration-300 group-hover:scale-110`}
    >
      <Image
        src={iconPath}
        alt={`${name} icon`}
        width={typeof size === "number" ? size : parseInt(size as string)}
        height={typeof size === "number" ? size : parseInt(size as string)}
        className={`${className} object-contain`}
      />
    </div>
  );
};
