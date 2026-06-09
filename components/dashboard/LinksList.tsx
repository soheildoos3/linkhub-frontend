"use client";

import { LinkItem } from "@/types/link";
import { GripVertical, Pencil, Plus } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { SortableLinkItem } from "./SortableLinkItem";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LinksListProps {
  links: LinkItem[];
  username: string;
  isLoading: boolean;
  onEdit: (link: LinkItem) => void;
  onDelete: (id: number) => void;
  onReorder: (links: LinkItem[]) => void;
}

export function LinksList({
  links,
  username,
  isLoading,
  onEdit,
  onDelete,
  onReorder,
}: LinksListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over?.id);
      const newLinks = arrayMove(links, oldIndex, newIndex);
      onReorder(newLinks);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3 ">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full dark:bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4 dark:bg-gray-700" />
                  <Skeleton className="h-3 w-1/2 dark:bg-gray-700" />
                </div>
                <div className="flex gap-1">
                  <Skeleton className="h-8 w-8 rounded-lg dark:bg-gray-700" />
                  <Skeleton className="h-8 w-8 rounded-lg dark:bg-gray-700" />
                  <Skeleton className="h-8 w-8 rounded-lg dark:bg-gray-700" />
                  <Skeleton className="h-8 w-8 rounded-lg dark:bg-gray-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <Card className="border-dashed dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full dark:bg-gray-700">
            <Plus
              size={32}
              className="text-muted-foreground dark:text-gray-400"
            />
          </div>
          <h3 className="text-foreground mb-2 text-lg font-semibold dark:text-white">
            هنوز لینکی اضافه نکرده‌اید
          </h3>
          <p className="text-muted-foreground dark:text-gray-400">
            اولین لینک خود را با کلیک روی دکمه &quot;لینک جدید&quot; اضافه کنید
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:border-gray-700 dark:bg-gray-800 ">
      <div className="border-border border-b px-4 py-3 dark:border-gray-700">
        <p className="text-muted-foreground flex items-center gap-1 text-sm dark:text-gray-400">
          برای تغییر ترتیب، آیکون
          <GripVertical size={14} className="inline" />
          را بکشید
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={links.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-border divide-y dark:divide-gray-700 ">
            {links.map((link) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                username={username}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </Card>
  );
}