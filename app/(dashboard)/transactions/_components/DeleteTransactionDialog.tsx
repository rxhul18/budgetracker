"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DeleteTransaction } from '../_actions/deleteTransaction';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionId: string;
}

function DeleteTransactionDialog({ open, setOpen, transactionId }: Props) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeleteTransaction,
        onSuccess: async () => {
            toast.success("Transactions deleted successfully", {
                id: transactionId,
            });

            await queryClient.invalidateQueries({
                queryKey: ['transactions']
            });
        },
        onError: () => {
            toast.error("Something went wrong", {
                id: transactionId,
            });
        }
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your transaction</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Cancel</AlertDialogAction>
                    <AlertDialogAction onClick={() => {
                        toast.loading("Deleting transactions...", {
                            id: transactionId,
                        });
                        deleteMutation.mutate(transactionId)
                    }}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTransactionDialog