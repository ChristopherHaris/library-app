"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const AddButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push("/add");
  };

  return (
    <Button onClick={onClick} variant="outline">
      Add Books
    </Button>
  );
};
