import { AddButton } from "@/components/add-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Books, columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import supabase from "@/utils/supabase";
import { PostgrestResponse } from "@supabase/supabase-js";

async function getData() {
  const { data }: PostgrestResponse<Books> = await supabase
    .from("Books")
    .select("*");
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div>
      <div className="flex justify-end px-8 lg:px-24 w-full">
        <AddButton />
      </div>
      <div className="container mx-auto py-10">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </div>
  );
}
