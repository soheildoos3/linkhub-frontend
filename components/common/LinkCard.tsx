"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { ArrowLeft, LinkIcon } from "lucide-react";

interface BaseLink {
  id?: number;
  title?: string;
  url?: string;
  icon?: string;
  namelink?: string;
  username?: string;
  items?: any[];
}

interface LinkCardProps {
  type: "user" | "link";
  data: BaseLink;
  href: string;
  target?: "_blank" | "_self";
}

const truncateUrl = (url: string, maxLength: number = 40): string => {
  if (!url) return "";

  let cleanUrl = url.replace(/^https?:\/\/(www\.)?/, "");

  if (cleanUrl.length <= maxLength) return cleanUrl;

  return cleanUrl.slice(0, maxLength) + "...";
};

const truncateTitle = (title: string, maxLength: number = 50): string => {
  if (!title) return "";
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength) + "...";
};

export function LinkCard({
  type,
  data,
  href,
  target = "_self",
}: LinkCardProps) {
  if (type === "user") {
    const user = data as any;
    const initial =
      user.namelink?.charAt(0).toUpperCase() ||
      user.username?.charAt(0).toUpperCase() ||
      "?";
    const displayName = truncateTitle(user.namelink || user.username, 30);
    const linksCount = user.items?.length || 0;

    return (
      <Link href={href} target={target} className="group block">
        <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900">
          <CardContent className="px-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg dark:from-indigo-600 dark:to-indigo-700">
                <span className="text-lg font-bold text-white">{initial}</span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
                  {displayName}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <LinkIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>
                    {linksCount} {linksCount === 1 ? "لینک" : "لینک"}
                  </span>
                </div>
              </div>

              <div className="shrink-0 transform rounded-full bg-gray-50 p-1.5 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-gray-700 dark:text-gray-500 dark:group-hover:bg-indigo-900 dark:group-hover:text-indigo-400">
                <ArrowLeft className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  if (type === "link") {
    const link = data as any;
    const displayUrl = truncateUrl(link.url || "", 45);
    const displayTitle = truncateTitle(link.title, 50);

    return (
      <Link href={href} target={target} className="group block">
        <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-gray-900">
          <CardContent className="px-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <SocialIcon name={link.icon || "link"} className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400">
                  {displayTitle}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className="truncate break-all" dir="ltr">
                    {displayUrl}
                  </span>
                </div>
              </div>

              <div className="shrink-0 transform rounded-full bg-gray-50 p-1.5 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:bg-gray-700 dark:text-gray-500 dark:group-hover:bg-indigo-900 dark:group-hover:text-indigo-400">
                <ArrowLeft className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return null;
}
