import { LinkCard } from "@/components/common/LinkCard";
import { linkService } from "@/services/api/endpoints/link";
import { API_URL } from "@/services/config";
import { LinkItem, UserLinks } from "@/types/link";
import { LinkIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  try {
    const links = await linkService.getLink(username);
    const itemsCount = links.items?.length || 0;

    return {
      title: `${links.namelink || username} | لینک هاب`,
      description: `صفحه شخصی ${links.namelink || username} با ${itemsCount} لینک`,
      openGraph: {
        title: `${links.namelink || username} | لینک هاب`,
        description: `مشاهده لینک‌های ${links.namelink || username}`,
        type: "profile",
      },
    };
  } catch {
    return {
      title: "کاربر یافت نشد | لینک هاب",
      description: "این کاربر در لینک هاب وجود ندارد",
    };
  }
}

export default async function UserLink({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  try {
    const links: UserLinks = await linkService.getLink(username);
    const items: LinkItem[] = links.items || [];
    console.log(items);

    return (
      <div className="min-h-dvh px-4 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {links.namelink}
            </h1>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <LinkIcon className="h-4 w-4" />
              <span>{items.length} links</span>
            </div>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <LinkCard
                key={item.id}
                type="link"
                data={item}
                href={`${API_URL}/links/${username}/${item.id}`}
                target="_blank"
              />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
