"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import supabase from "@/utils/supabase";
import { toast } from "sonner";

export type Books = {
  id: string;
  name: string;
  author: string;
  releaseDate: String;
  bookUrl: String;
  imageUrl: String;
};

const onView = (bookUrl: string) => {
  window.open(bookUrl, "_blank");
};

const onEdit = (bookUrl: string) => {
  window.open(bookUrl, "_blank");
};

const onDelete = async (id: string) => {
  const { error } = await supabase.from("Books").delete().eq("id", id);
  window.location.reload();
  toast.success("successfully deleted books")

  if (error) {
    throw error;
  }
};

export const columns: ColumnDef<Books>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl as string}
        alt="Book Image"
        objectFit="cover"
        height={150}
        width={150}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "releaseDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Release Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onView(row.original.bookUrl as string)}
            >
              View
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => onDelete(row.original.id as string)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
