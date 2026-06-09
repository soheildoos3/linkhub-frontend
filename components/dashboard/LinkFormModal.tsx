"use client";

import { LinkCreate, LinkItem, LinkUpdate, Platform } from "@/types/link";
import { X, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const platforms: {
  value: Platform;
  label: string;
  example: string;
  hint: string;
}[] = [
  {
    value: "soroush",
    label: "سروش",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "aparat",
    label: "آپارات",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "eitaa",
    label: "ایتا",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "bale",
    label: "بله",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "rubika",
    label: "روبیکا",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "instagram",
    label: "اینستاگرام",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "whatsapp",
    label: "واتساپ",
    example: "09123456789",
    hint: "شماره تلفن همراه را وارد کنید",
  },
  {
    value: "telegram",
    label: "تلگرام",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "twitter",
    label: "توییتر",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "linkedin",
    label: "لینکدین",
    example: "username",
    hint: "نام کاربری خود را وارد کنید",
  },
  {
    value: "github",
    label: "گیت‌هاب",
    example: "username",
    hint: "نام کاربری خود را وارد کنید",
  },
  {
    value: "youtube",
    label: "یوتیوب",
    example: "@username",
    hint: "نام کاربری خود را با @ وارد کنید",
  },
  {
    value: "facebook",
    label: "فیسبوک",
    example: "username",
    hint: "نام کاربری خود را وارد کنید",
  },
  {
    value: "tiktok",
    label: "تیک‌تاک",
    example: "@username",
    hint: "نام کاربری خود را با @ وارد کنید",
  },
  {
    value: "spotify",
    label: "اسپاتفای",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "discord",
    label: "دیسکورد",
    example: "username",
    hint: "نام کاربری خود را وارد کنید (بدون @)",
  },
  {
    value: "website",
    label: "وبسایت",
    example: "example.com",
    hint: "آدرس وبسایت خود را وارد کنید",
  },
  {
    value: "phone",
    label: "شماره تلفن",
    example: "09123456789",
    hint: "با کلیک، شماره گیری باز می‌شود",
  },
  {
    value: "email",
    label: "ایمیل",
    example: "info@example.com",
    hint: "با کلیک، ایمیل‌خوان باز می‌شود",
  },
  {
    value: "location",
    label: "موقعیت مکانی",
    example: "تهران، میدان آزادی",
    hint: "آدرس یا نام مکان را وارد کنید",
  },
  {
    value: "link",
    label: "سایر",
    example: "https://example.com",
    hint: "آدرس کامل لینک را وارد کنید",
  },
];

interface LinkFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingLink?: LinkItem | null;
  onCreate: (data: LinkCreate) => Promise<void>;
  onUpdate: (id: number, data: LinkUpdate) => Promise<void>;
}

export function LinkFormModal({
  isOpen,
  onClose,
  editingLink,
  onCreate,
  onUpdate,
}: LinkFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<LinkCreate>({
    title: "",
    url: "",
    icon: "soroush",
    order: 0,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const selectedPlatform = platforms.find((p) => p.value === formData.icon);

  useEffect(() => {
    if (editingLink) {
      let displayUrl = editingLink.url;
      if (displayUrl.startsWith("tel:")) {
        displayUrl = displayUrl.replace("tel:", "");
      } else if (displayUrl.startsWith("mailto:")) {
        displayUrl = displayUrl.replace("mailto:", "");
      } else if (displayUrl.startsWith("https://wa.me/")) {
        displayUrl = displayUrl.replace("https://wa.me/", "");
      } else if (displayUrl.startsWith("https://instagram.com/")) {
        displayUrl = displayUrl.replace("https://instagram.com/", "");
      } else if (displayUrl.startsWith("https://t.me/")) {
        displayUrl = displayUrl.replace("https://t.me/", "");
      } else if (displayUrl.startsWith("https://twitter.com/")) {
        displayUrl = displayUrl.replace("https://twitter.com/", "");
      } else if (displayUrl.startsWith("https://github.com/")) {
        displayUrl = displayUrl.replace("https://github.com/", "");
      } else if (displayUrl.includes("youtube.com/@")) {
        displayUrl = displayUrl.replace(
          /https?:\/\/(www\.)?youtube\.com\/@/,
          "@",
        );
      } else if (displayUrl.startsWith("https://facebook.com/")) {
        displayUrl = displayUrl.replace("https://facebook.com/", "");
      } else if (displayUrl.includes("tiktok.com/@")) {
        displayUrl = displayUrl.replace(
          /https?:\/\/(www\.)?tiktok\.com\/@/,
          "@",
        );
      } else if (displayUrl.includes("maps.google.com")) {
        const match = displayUrl.match(/query=([^&]+)/);
        if (match) {
          displayUrl = decodeURIComponent(match[1]);
        }
      } else if (displayUrl.includes("open.spotify.com/user/")) {
        displayUrl = displayUrl.replace("https://open.spotify.com/user/", "");
      }

      setFormData({
        title: editingLink.title,
        url: displayUrl,
        icon: editingLink.icon as Platform,
        order: editingLink.order,
      });
    } else {
      setFormData({
        title: "",
        url: "",
        icon: "soroush",
        order: 0,
      });
    }
    setError("");
  }, [editingLink, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("عنوان لینک الزامی است");
      return;
    }
    if (!formData.url.trim()) {
      setError("آدرس لینک الزامی است");
      return;
    }

    let formattedUrl = formData.url.trim();

    switch (formData.icon) {
      case "phone":
        const cleanNumber = formattedUrl.replace(/[\s\-]/g, "");
        formattedUrl = `tel:${cleanNumber}`;
        break;
      case "email":
        if (!formattedUrl.includes("@")) {
          setError("آدرس ایمیل نامعتبر است");
          return;
        }
        formattedUrl = `mailto:${formattedUrl}`;
        break;
      case "whatsapp":
        const cleanWaNumber = formattedUrl.replace(/[\s\-]/g, "");
        formattedUrl = `https://wa.me/${cleanWaNumber}`;
        break;
      case "instagram":
        const instaUser = formattedUrl.replace(/^@/, "");
        formattedUrl = `https://instagram.com/${instaUser}`;
        break;
      case "telegram":
        const teleUser = formattedUrl.replace(/^@/, "");
        formattedUrl = `https://t.me/${teleUser}`;
        break;
      case "twitter":
        const twitterUser = formattedUrl.replace(/^@/, "");
        formattedUrl = `https://twitter.com/${twitterUser}`;
        break;
      case "github":
        const githubUser = formattedUrl.replace(/^@/, "");
        formattedUrl = `https://github.com/${githubUser}`;
        break;
      case "youtube":
        let youtubeUrl = formattedUrl;
        if (formattedUrl.startsWith("@")) {
          youtubeUrl = `https://youtube.com/${formattedUrl}`;
        } else if (
          !formattedUrl.includes("youtube.com") &&
          !formattedUrl.includes("youtu.be")
        ) {
          youtubeUrl = `https://youtube.com/@${formattedUrl}`;
        }
        formattedUrl = youtubeUrl;
        break;
      case "spotify":
        let spotifyUrl = formattedUrl;
        if (!spotifyUrl.includes("open.spotify.com")) {
          spotifyUrl = `https://open.spotify.com/user/${spotifyUrl}`;
        }
        formattedUrl = spotifyUrl;
        break;
      case "facebook":
        const fbUser = formattedUrl.replace(/^@/, "");
        formattedUrl = `https://facebook.com/${fbUser}`;
        break;
      case "tiktok":
        const tiktokUser = formattedUrl.replace(/^@/, "");
        formattedUrl = `https://tiktok.com/@${tiktokUser}`;
        break;
      case "location":
        formattedUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedUrl)}`;
        break;
      case "website":
      case "link":
      default:
        if (
          !formattedUrl.startsWith("http://") &&
          !formattedUrl.startsWith("https://")
        ) {
          formattedUrl = `https://${formattedUrl}`;
        }
        break;
    }

    setIsLoading(true);

    try {
      if (editingLink) {
        await onUpdate(editingLink.id, {
          title: formData.title,
          url: formattedUrl,
          icon: formData.icon,
          order: formData.order,
        });
      } else {
        await onCreate({
          title: formData.title,
          url: formattedUrl,
          icon: formData.icon,
          order: formData.order,
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "خطا در ذخیره لینک");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputType = () => {
    if (formData.icon === "phone") return "tel";
    if (formData.icon === "email") return "email";
    return "text";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="border-border bg-card max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <div className="border-border bg-card sticky top-0 flex items-center justify-between border-b p-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-foreground text-lg font-bold dark:text-white">
            {editingLink ? "ویرایش لینک" : "لینک جدید"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="dark:text-gray-400 dark:hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="dark:text-gray-300">
              عنوان لینک <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="مثال: اینستاگرام من"
              className="dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon" className="dark:text-gray-300">
              نوع لینک
            </Label>
            <Select
              value={formData.icon}
              onValueChange={(value) =>
                setFormData({ ...formData, icon: value as Platform, url: "" })
              }
            >
              <SelectTrigger className="dark:border-gray-600 dark:bg-gray-900 dark:text-white">
                <SelectValue placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent className="dark:border-gray-700 dark:bg-gray-800">
                {platforms.map((p) => (
                  <SelectItem
                    key={p.value}
                    value={p.value}
                    className="dark:text-white"
                  >
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="dark:text-gray-300">
              {selectedPlatform?.label || "مقدار"}
              <span className="text-destructive">*</span>
            </Label>

            <div className="rounded-lg bg-blue-50 p-3 text-sm dark:bg-blue-950/30">
              <div className="flex items-start gap-2">
                <Info
                  size={16}
                  className="mt-0.5 text-blue-600 dark:text-blue-400"
                />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    {selectedPlatform?.hint || "مقدار مورد نظر را وارد کنید"}
                  </p>
                  <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                    مثال: {selectedPlatform?.example}
                  </p>
                </div>
              </div>
            </div>

            <Input
              id="url"
              type={getInputType()}
              required
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder={selectedPlatform?.example}
              dir="ltr"
              className="dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading
                ? "در حال ذخیره..."
                : editingLink
                  ? "ویرایش"
                  : "افزودن"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              انصراف
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
