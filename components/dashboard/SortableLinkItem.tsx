"use client";

import { SocialIcon } from "@/components/icons/SocialIcon";
import { QRModal } from "@/components/link/QRModal";
import { LinkItem } from "@/types/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ExternalLink,
  GripVertical,
  Pencil,
  QrCode,
  Trash2,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SortableLinkItemProps {
  link: LinkItem;
  username: string;
  onEdit: (link: LinkItem) => void;
  onDelete: (id: number) => void;
}

export function SortableLinkItem({
  link,
  username,
  onEdit,
  onDelete,
}: SortableLinkItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const displayUrl = link.url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 50);

  useEffect(() => {
    setQrUrl(`${window.location.origin}/${username}/${link.id}`);
  }, [username, link.id]);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="group border-border bg-card relative divide-y-4 rounded-lg  border transition-all hover:shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex items-center gap-3 p-4">
          <div
            {...attributes}
            {...listeners}
            className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing dark:text-gray-500 dark:hover:text-gray-300"
          >
            <GripVertical size={20} />
          </div>

          <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full dark:bg-gray-700">
            <SocialIcon name={link.icon} className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-foreground font-medium dark:text-white">
                {link.title}
              </h3>
              <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                <Eye size={12} />
                <span>{link.clicks || 0}</span>
              </div>
            </div>
            <p
              className="text-muted-foreground truncate text-sm dark:text-gray-400"
              dir="ltr"
            >
              {displayUrl}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              onClick={() => setShowQR(true)}
              variant="ghost"
              size="icon"
              className="text-muted-foreground h-8 w-8 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
              title="QR کد"
            >
              <QrCode size={18} />
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-muted-foreground h-8 w-8 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              title="باز کردن لینک"
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={18} />
              </a>
            </Button>
            <Button
              onClick={() => onEdit(link)}
              variant="ghost"
              size="icon"
              className="text-muted-foreground h-8 w-8 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
              title="ویرایش"
            >
              <Pencil size={18} />
            </Button>
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="ghost"
              size="icon"
              className="text-muted-foreground h-8 w-8 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              title="حذف"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent className="dark:border-gray-700 dark:bg-gray-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="dark:text-white">
              آیا مطمئن هستید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="dark:text-gray-400">
              آیا از حذف &quot;{link.title}&quot; اطمینان دارید؟
              <br />
              این عمل غیرقابل بازگشت است.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              انصراف
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(link.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {qrUrl && (
        <QRModal
          isOpen={showQR}
          onClose={() => setShowQR(false)}
          url={qrUrl}
          title={link.title}
        />
      )}
    </>
  );
}