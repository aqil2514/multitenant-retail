"use client";

import { Bell, Check, Clock, Info, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Dummy Data
const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Lead Assigned",
    description: "Pak Budi is waiting for a follow-up call.",
    time: "2 mins ago",
    type: "info",
    unread: true,
  },
  {
    id: 2,
    title: "Task Overdue",
    description: "Send invoice to PT. Maju Jaya.",
    time: "1 hour ago",
    type: "warning",
    unread: true,
  },
  {
    id: 3,
    title: "Meeting Reminder",
    description: "Zoom meeting with the marketing team.",
    time: "3 hours ago",
    type: "clock",
    unread: false,
  },
];

export function NotificationDropdown() {
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors relative"
        >
          <Bell size={19} strokeWidth={1.5} />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-[#ff4d4f] text-[10px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
              {unreadCount} New
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <ScrollArea className="h-80">
          {NOTIFICATIONS.length > 0 ? (
            NOTIFICATIONS.map((item) => (
              <DropdownMenuItem
                key={item.id}
                className={cn(
                  "flex flex-col items-start gap-1 p-4 cursor-pointer focus:bg-slate-50",
                  item.unread && "bg-blue-50/30",
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={cn(
                      "p-1 rounded-full",
                      item.type === "info" && "bg-blue-100 text-blue-600",
                      item.type === "warning" &&
                        "bg-orange-100 text-orange-600",
                      item.type === "clock" && "bg-slate-100 text-slate-600",
                    )}
                  >
                    {item.type === "info" && <Info size={14} />}
                    {item.type === "warning" && <AlertTriangle size={14} />}
                    {item.type === "clock" && <Clock size={14} />}
                  </div>
                  <span
                    className={cn(
                      "text-sm flex-1",
                      item.unread ? "font-bold" : "font-medium",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 pl-7 leading-relaxed">
                  {item.description}
                </p>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              No new notifications
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />
        <div className="p-2">
          <Button
            variant="ghost"
            className="w-full text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8"
          >
            <Check className="mr-2 h-3 w-3" />
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
