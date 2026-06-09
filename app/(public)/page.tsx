import PageControls from "@/components/link/PageControls";
import { Pagination } from "@/components/link/Pagination";
import { linkService } from "@/services/api/endpoints/link";
import { AllUserLinks } from "@/types/link";
import { Search } from "lucide-react";
import { Metadata } from "next";
import SearchForm from "@/components/link/SearchForm";
import { LinkCard } from "@/components/common/LinkCard";

export const metadata: Metadata = {
  title: "لینک هاب | اشتراک‌گذاری لینک‌های کاربران",
  description:
    "سکوی اشتراک‌گذاری لینک‌های کاربران. یک صفحه اختصاصی برای لینک‌های خود بسازید و با دیگران به اشتراک بگذارید.",
  keywords: "لینک, اشتراک گذاری, بیو لینک, صفحه شخصی",
  openGraph: {
    title: "لینک هاب",
    description: "صفحه اختصاصی برای لینک‌های شما",
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { page, limit, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const itemsPerPage = Number(limit) || 12;
  const searchQuery = search || "";

  const skip = (currentPage - 1) * itemsPerPage;

  const response: AllUserLinks = await linkService.getLinks({
    skip: skip,
    limit: itemsPerPage,
    search: searchQuery,
  });
  const allUsers = response.items;
  const total = response.total;
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="pb-10 min-h-screen dark:bg-gray-900">
      <section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-16 text-white dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">لینک هاب</h1>
          <p className="text-xl text-indigo-100 dark:text-indigo-200">
            لینک های خود را به اشتراک بگذارید
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-8">
        <SearchForm initialSearch={searchQuery} />

        <PageControls
          total={total}
          skip={skip}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalItems={allUsers.length}
        />

        {allUsers.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mb-4 flex items-center justify-center">
              <Search className="h-15 w-15 text-indigo-500 dark:text-indigo-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery
                ? "نتیجه‌ای یافت نشد"
                : "اولین نفری باشید که به جمع ما می‌پیوندد !"}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allUsers.map((user) => (
                <LinkCard
                  key={user.username}
                  type="user"
                  data={user}
                  href={`/${user.username}`}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={itemsPerPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
