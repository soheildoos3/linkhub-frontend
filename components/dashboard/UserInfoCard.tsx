"use client";

import { QRModal } from "@/components/link/QRModal";
import { User } from "@/types/user";
import {
  Calendar,
  Copy,
  Mail,
  QrCode,
  User as UserIcon,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface UserInfoCardProps {
  user: User;
}

export function UserInfoCard({ user }: UserInfoCardProps) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    setProfileUrl(`${window.location.origin}/${user.username}`);
  }, [user.username]);

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="mb-6 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">
              {user.namelink || user.name || user.username}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-indigo-100 dark:text-indigo-200">
              {user.name && (
                <div className="flex items-center gap-1.5">
                  <UserIcon size={14} />
                  <span>{user.name}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Mail size={14} />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{user.username}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>
                  عضو از {new Date(user.created_at).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white/20 px-4 py-2 text-center backdrop-blur-sm dark:bg-white/10">
            <p className="text-xs text-indigo-100 dark:text-indigo-200">
              آدرس صفحه عمومی
            </p>
            <div className="mt-1 flex items-center gap-1">
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[200px] truncate text-sm font-medium hover:underline md:max-w-none"
              >
                {profileUrl.replace(/^https?:\/\//, "")}
              </a>
              <Button
                onClick={handleCopyUrl}
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20 dark:hover:bg-white/10"
                title="کپی لینک"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-200" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button
                onClick={() => setShowQR(true)}
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white hover:bg-white/20 dark:hover:bg-white/10"
                title="QR کد"
              >
                <QrCode className="h-3.5 w-3.5" />
              </Button>
            </div>
            {copied && (
              <span className="mt-1 block text-xs text-green-200">
                لینک کپی شد!
              </span>
            )}
          </div>
        </div>
      </div>

      <QRModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        url={profileUrl}
        title="صفحه عمومی"
      />
    </>
  );
}
