"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TransactionsType } from '@/lib/types';
import { CreateCategorySchema, CreateCategorySchemaType } from '@/schema/categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleOff, Loader2, PlusSquare } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../_actions/categories';
import { Category } from '@prisma/client';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

interface Props {
    type: TransactionsType;
    successCallback: (category: Category) => void;
}

function CreateCategoryDialog({ type, successCallback }: Props) {
    const [open, setOpen] = useState(false)
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type
        }
    })

    const queryClient = useQueryClient();
    const theme = useTheme();

    const { mutate, isPending } = useMutation({
        mutationFn: createCategory,
        onSuccess: async (data: Category) => {
            form.reset({
                name: "",
                icon: "",
                type
            });
            toast.success(`Category ${data.name} created successfully 🎉`,{
                id: "create-category"
            })

            successCallback(data);

            await queryClient.invalidateQueries({
                queryKey: ["categories"]
            });

            setOpen((prev) => !prev)
        },
        onError: () => {
            toast.error("Something went wrong, please try again", {
                id: "create-category"
            })
        }
    })

    const onSubmit = useCallback((values: CreateCategorySchemaType) => {
        toast.loading("Creating category...", {
            id: "create-category"
        });
        mutate(values);
    },[mutate]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} className='flex border-separate items-center justify-center rounded-none border-b p-3 text-muted-foreground'>
                    <PlusSquare className='mr-2 size-4' />
                    Create new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create{" "}
                        <span className={type === "income" ? "text-emerald-500" : "text-red-500"}>
                            {type}
                        </span> category
                    </DialogTitle>
                    <DialogDescription>
                        Categories are used to group your transactions.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-8'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl><Input {...field} placeholder='Category'/></FormControl>
                                    <FormDescription>This is how your category will appear in the app</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant={"outline"} className='h-[100px] w-full'>
                                                    {form.watch("icon") ? (
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <span className='text-5xl' role='img'>
                                                                {field.value}
                                                            </span>
                                                            <p className='text-xs text-muted-foreground'>Click to change</p>
                                                        </div>
                                                    ) : (
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <CircleOff className='!size-[48px]' />
                                                            <p className='text-xs text-muted-foreground'>Click to select</p>
                                                        </div>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Picker
                                                    data={data}
                                                    theme={theme.resolvedTheme}
                                                    onEmojiSelect={(emoji: { native: string; }) => {
                                                        field.onChange(emoji.native)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription>This is how your category will appear in the app</FormDescription>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            onClick={() => { form.reset() }}
                            variant={"secondary"}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={form.handleSubmit(onSubmit)}>
                        {!isPending && "Create"}
                        {isPending && <Loader2 className='animate-spin'/>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCategoryDialog