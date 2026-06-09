"use client";

import { authStore } from "@/stores/authStore";
import { linkService } from "@/services/api/endpoints/link";
import { LinkCreate, LinkItem, LinkUpdate } from "@/types/link";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteAccountModal } from "@/components/dashboard/DeleteAccountModal";
import { EditProfileModal } from "@/components/dashboard/EditProfileModal";
import { LinkFormModal } from "@/components/dashboard/LinkFormModal";
import { ChangePasswordModal } from "@/components/dashboard/ChangePasswordModal";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { UserInfoCard } from "@/components/dashboard/UserInfoCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { authService } from "@/services/api/endpoints/auth";

export default function DashboardPage() {
  const router = useRouter();
  const { user, , isLoading: authLoading } = authStore();

  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [isReordering, setIsReordering] = useState(false);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await linkService.getLink(user?.username || "");
      setLinks(response.items || []);
    } catch (err: any) {
      setError(err.detail || "خطا در دریافت لینک‌ها");
    } finally {
      setIsLoading(false);
    }
  };

  const reorderLinks = async (newLinks: LinkItem[]) => {
    setLinks(newLinks);
    setIsReordering(true);

    try {
      for (let i = 0; i < newLinks.length; i++) {
        await linkService.updateLink(newLinks[i].id, { order: i });
      }
    } catch (err) {
      console.error("خطا در ذخیره ترتیب:", err);
      setError("خطا در ذخیره ترتیب لینک‌ها");
      await fetchLinks();
    } finally {
      setIsReordering(false);
    }
  };

  const createLink = async (data: LinkCreate): Promise<void> => {
    try {
      const newLink = await linkService.createLink(data);
      setLinks((prev) => [...prev, newLink]);
    } catch (err: any) {
      throw new Error(err.detail || "خطا در ایجاد لینک");
    }
  };

  const updateLink = async (id: number, data: LinkUpdate): Promise<void> => {
    try {
      const updatedLink = await linkService.updateLink(id, data);
      setLinks((prev) =>
        prev.map((link) => (link.id === id ? updatedLink : link)),
      );
    } catch (err: any) {
      throw new Error(err.detail || "خطا در ویرایش لینک");
    }
  };

  const deleteLink = async (id: number) => {
    try {
      await linkService.deleteLink(id);
      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err: any) {
      throw new Error(err.detail || "خطا در حذف لینک");
    }
  };

  const deleteAllLinks = async () => {
    try {
      await linkService.deleteLinks();
      setLinks([]);
      setIsDeleteAllDialogOpen(false);
    } catch (err: any) {
      setError(err.detail || "خطا در حذف لینک‌ها");
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    router.push("/");
  };

  const handleEditLink = (link: LinkItem) => {
    setEditingLink(link);
    setIsLinkModalOpen(true);
  };

  const handleCloseLinkModal = () => {
    setEditingLink(null);
    setIsLinkModalOpen(false);
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchLinks();
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center dark:bg-gray-900">
        <Loader2 className="text-primary h-8 w-8 animate-spin dark:text-indigo-400" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-muted/20 min-h-screen py-8 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <DashboardHeader
          onEditProfile={() => setIsProfileModalOpen(true)}
          onChangePassword={() => setIsPasswordModalOpen(true)}
          onDeleteAccount={() => setIsDeleteAccountModalOpen(true)}
          onLogout={handleLogout}
        />

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription className="flex items-center justify-between">
              <span>{error}</span>
              <Button variant="ghost" size="sm" onClick={() => setError("")}>
                بستن
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <UserInfoCard user={user} />

        <StatsCard
          linksCount={links.length}
          isLoading={isLoading || isReordering}
          onAddLink={() => setIsLinkModalOpen(true)}
          onRefresh={fetchLinks}
          onDeleteAll={() => setIsDeleteAllDialogOpen(true)}
        />

        <DashboardTabs
          links={links}
          username={user.username}
          isLoading={isLoading}
          onEdit={handleEditLink}
          onDelete={deleteLink}
          onReorder={reorderLinks}
        />

        <AlertDialog
          open={isDeleteAllDialogOpen}
          onOpenChange={setIsDeleteAllDialogOpen}
        >
          <AlertDialogContent className="dark:border-gray-700 dark:bg-gray-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="dark:text-white">
                آیا مطمئن هستید؟
              </AlertDialogTitle>
              <AlertDialogDescription className="dark:text-gray-400">
                این عمل تمام لینک‌های شما را به طور دائمی حذف می‌کند و قابل
                بازگشت نیست.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                انصراف
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteAllLinks}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                حذف شود
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <LinkFormModal
          isOpen={isLinkModalOpen}
          onClose={handleCloseLinkModal}
          editingLink={editingLink}
          onCreate={createLink}
          onUpdate={updateLink}
        />

        <EditProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
        />

        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        />

        <DeleteAccountModal
          isOpen={isDeleteAccountModalOpen}
          onClose={() => setIsDeleteAccountModalOpen(false)}
        />
      </div>
    </div>
  );
}
