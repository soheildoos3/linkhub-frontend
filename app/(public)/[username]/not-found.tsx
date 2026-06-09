import Link from "next/link";
import { UserX, Home } from "lucide-react";

export default function UserNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 py-16 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
            <UserX size={64} className="text-gray-400 dark:text-gray-500" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          کاربری با این نام یافت نشد
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          ممکن است این کاربر حذف شده باشد یا نام کاربری را اشتباه وارد کرده
          باشید.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <Home size={20} />
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
