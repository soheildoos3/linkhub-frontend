export interface LinkItem {
  id: number;
  user_id: number;
  title: string;
  url: string;
  icon: string;
  order: number;
  clicks: number;
  created_at: string;
  updated_at: string | null;
}

export interface UserLinks {
  namelink: string;
  username: string;
  items: LinkItem[];
}

export interface AllUserLinks {
  total: number;
  skip: number;
  limit: number;
  items: UserLinks[];
}

export type Platform =
  | "soroush"
  | "aparat"
  | "eitaa"
  | "bale"
  | "rubika"
  | "instagram"
  | "whatsapp"
  | "telegram"
  | "twitter"
  | "linkedin"
  | "github"
  | "youtube"
  | "facebook"
  | "tiktok"
  | "spotify"
  | "discord"
  | "website"
  | "phone"
  | "email"
  | "location"
  | "link"


export interface LinkCreate {
  title: string;
  url: string;
  icon?: Platform;
  order?: number;
}

export interface LinkUpdate {
  title?: string;
  url?: string;
  icon?: Platform;
  order?: number;
}

