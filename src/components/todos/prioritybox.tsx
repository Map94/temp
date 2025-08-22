"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OctagonAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Todo } from "@/data/todos.types";
import { startTransition } from "react";
import { toast } from "sonner";
import {
  toggleTodoAction,
  updateTodoPriorityAction,
} from "@/app/todos/actions";

type Status = {
  value: string;
  label: string;
  miniLabel: string;
  bgColor: string;
  priority: number;
};

const statuses: Status[] = [
  {
    value: "low priority",
    label: "Low Priority",
    miniLabel: "LP",
    bgColor: "bg-green-500 text-white:bg-green-600",
    priority: 1,
  },
  {
    value: "medium priority",
    label: "Medium Priority",
    miniLabel: "MP",
    bgColor: "bg-yellow-500 text-white:bg-yellow-600",
    priority: 2,
  },
  {
    value: "high priority",
    label: "High Priority",
    miniLabel: "HP",
    bgColor: "bg-red-500 text-white:bg-red-600",
    priority: 3,
  },
  {
    value: "in progress",
    label: "In Progress",
    miniLabel: "IP",
    bgColor: "bg-blue-500 text-white:bg-blue-600",
    priority: 4,
  },
  {
    value: "not important",
    label: "Not Important",
    miniLabel: "NI",
    bgColor: "bg-gray-500 text-white:bg-gray-600",
    priority: 0,
  },
];

export function ComboBoxResponsive({ todo }: { todo: Todo }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  );
  function onUpdate(id: number, priority: number) {
    startTransition(async () => {
      try {
        await updateTodoPriorityAction(id, priority);
        toast.success("Success", {
          description: "Added Priority, good job lil' man",
        });
      } catch (error) {
        toast.error("Oopsie daisy, that was bad, we should call someone");
      }
    });
  }
  const currentStatus = statuses.find(
    (status) => status.priority === todo.priority
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[30px] h-[30] justify-center",
              currentStatus?.bgColor
            )}
          >
            {currentStatus ? (
              <>{currentStatus.miniLabel}</>
            ) : (
              <>
                <OctagonAlert />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            onUpdate={onUpdate}
            todo={todo}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {currentStatus ? (
            <>{currentStatus.miniLabel}</>
          ) : (
            <>
              <OctagonAlert />{" "}
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
            todo={todo}
            onUpdate={onUpdate}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  onUpdate,
  todo,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  onUpdate: (id: number, priority: number) => void;
  todo: Todo;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter Priority..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                );
                const prio = statuses.find(
                  (priority) => priority.value === value
                )?.priority!;
                setOpen(false);
                onUpdate(todo.id, prio);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
