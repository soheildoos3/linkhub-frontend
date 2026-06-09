import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-muted/20 mt-auto border-t dark:border-gray-800 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground text-xs sm:text-sm dark:text-gray-400">
          &copy; {currentYear} LinkHub. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
