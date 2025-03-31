/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TransactionsType } from "@/lib/types";
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  type: TransactionsType;
}

function CategoryPicker({ type }: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const categoriesQuery = useQuery({
    queryKey: ["categories", type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then((res) =>
      res.json()
    )
  })

  const selectedCategory = categoriesQuery.data?.find((category: Category) => category.name === value)
  
  return(
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? <CategoryRow category={selectedCategory} />: "Select category"}
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}

export default CategoryPicker;

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )
}