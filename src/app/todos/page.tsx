//@ts-nocheck
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState } from "react";

import React from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns'
import Delete from "@/components/lists/delete";

const copyPermalink = (permalink) => (e) => {
  e.stopPropagation();
  const currentUrl = window.location.href;
  const permalinkUrl = `${currentUrl}/${permalink}`;
  navigator.clipboard.writeText(permalinkUrl);
  alert("Permalink copied to clipboard!");
};

const TodoCard = ({ todo, router, mutate, onCopyPermalink }) => {
  // Extract todo data
  const { title, createdAt, permalink, _id } = todo;

  return (
    <div className="flex justify-between p-4 mb-4 rounded-md cursor-pointer border-2 border-[#E8505B]" onClick={() => router?.push(`todos/${permalink}`)}>
      <div className="flex gap-2">
        <img width={64} height={64} src={`https://api.dicebear.com/7.x/icons/svg?seed=${title}&backgroundColor=E8505B`} alt="Todo Image" />

        <div className="card-content">
          <p>Date: {format(createdAt, 'dd/MM/yyyy')}</p>
          <p>Title: {title}</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Button onClick={onCopyPermalink(permalink)}>Share</Button>
        <Delete id={_id} mutate={mutate} />
      </div>
    </div>
  );
};

const Todos = () => {
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    title: z.string(({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })).min(3, 'The name must be at least 3 characters long'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const session = useSession();

  const router = useRouter();

  const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/todos?username=${session?.data?.user?.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/login");
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title } = values;

    try {
      await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({
          title,
          permalink: session?.data?.user?.name.concat(title) || "anonymous".concat(title),
          username: session?.data?.user?.name || "anonymous",
        }),
      });
      mutate();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col flex-1 gap-10">
          <p>Bem vindo de volta &apos;{session?.data?.user?.name}&apos;</p>
          <div className="flex justify-between">
            <Form {...form}>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="p-5 rounded text-white font-bold">
                    Crie uma To-do List
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <DialogHeader>
                      <DialogTitle className="py-3">
                        Crie uma To-do List
                      </DialogTitle>

                      <div className="space-y-1 leading-none">
                        <p className="text-sm font-medium ">
                          Tarefa para a todolist de &#39;{session?.data?.user?.name}&#39;
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                          Digite o nome da todolist
                        </p>
                      </div>

                    </DialogHeader>

                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Send</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </Form>
          </div>
          <div>
            {data && data.map((todo, index) => (
              <TodoCard key={index} todo={todo} router={router} mutate={mutate} onCopyPermalink={copyPermalink} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Todos;
