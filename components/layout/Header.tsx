"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import { authStore } from "@/stores/authStore";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, user } = authStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const navigation = [
    { name: "خانه", href: "/" },
    ...(isLoggedIn ? [{ name: "داشبورد", href: "/dashboard" }] : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-border/50 bg-background/95 border-b backdrop-blur dark:border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <div className="hidden items-center gap-1 rounded-full bg-gray-100/50 px-2 py-1 md:flex dark:bg-gray-800/50">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-white text-indigo-600 shadow-sm dark:bg-gray-700 dark:text-indigo-400"
                    : "text-gray-600 hover:bg-white/60 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700/60 dark:hover:text-indigo-400"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            {isLoggedIn ? (
              <UserMenu getInitial={getInitial} />
            ) : (
              <div className="\ flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="rounded-full"
                >
                  <button onClick={() => router.push("/login")}>ورود</button>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                >
                  <button onClick={() => router.push("/register")}>
                    شروع کنید
                  </button>
                </Button>
              </div>
            )}

            {isLoggedIn && (
              <MobileMenu
                isLoggedIn={isLoggedIn}
                isActive={isActive}
                getInitial={getInitial}
                onClose={() => {}}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
