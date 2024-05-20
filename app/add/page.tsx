"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import supabase from "@/utils/supabase";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Book name is required.",
  }),
  author: z.string().min(1, {
    message: "Author is required.",
  }),
  releaseDate: z.string().min(1, {
    message: "Release date is required.",
  }),
  bookUrl: z.string().min(1, {
    message: "Book URL is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Image URL is required.",
  }),
});

export default function CardWithFormPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      author: "",
      releaseDate: "",
      bookUrl: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log(values);
      const { data, error } = await supabase
        .from("Books")
        .insert([
          {
            name: values.name,
            author: values.author,
            releaseDate: values.releaseDate,
            bookUrl: values.bookUrl,
            imageUrl: values.imageUrl,
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      toast({ description: "Book added successfully" });
      form.reset();
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ description: "Failed to add book" });
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex w-full py-20 justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Add a Book</CardTitle>
          <CardDescription>Add the books details.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="Name"
                            type="text"
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="author"
                            placeholder="Author"
                            type="text"
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="releaseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="releaseDate"
                            placeholder="Release Date (Ex. 10-10-2020)"
                            type="text"
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="bookUrl"
                            placeholder="Book PDF URL"
                            type="text"
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            id="imageUrl"
                            placeholder="Book Image URL"
                            type="text"
                            autoCapitalize="none"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <Button onClick={onCancel} variant="outline">
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">
                    {isLoading && (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
