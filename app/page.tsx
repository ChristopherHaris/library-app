"use client";

import { useState, useEffect } from "react";
import { AddButton } from "@/components/add-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Books, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import axios from "axios";
import { Loader2Icon } from "lucide-react";

export default function DemoPage() {
  const [data, setData] = useState<Books[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/books");
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-end gap-2 pt-10 px-8 lg:px-24 w-full">
        <AddButton />
        <ModeToggle />
      </div>
      <div className="container justify-center mx-auto py-10">
        {loading ? (
          <div className="flex w-full justify-center">
            <Loader2Icon className="animate-spin" />
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
