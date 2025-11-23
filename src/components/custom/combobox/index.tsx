"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFieldArray, useFormContext } from "react-hook-form";

type Tag = {
  value: string;
  label: string;
};

type FormValues = {
  tags: Tag[];
};

type BaseComboboxProps = {
  data: Tag[];
  isLoading?: boolean;
  searchable?: boolean;
};

const Combobox = ({
  data,
  isLoading = false,
  searchable = true,
}: BaseComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { control } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const toggleItem = (item: Tag) => {
    const idx = fields.findIndex((f) => f.value === item.value);

    if (idx >= 0) {
      remove(idx);
    } else {
      append(item); // must match Tag type
    }
  };

  const displayText =
    fields.length > 0
      ? fields.map((f) => f.label).join(", ")
      : "Select items...";

  const filteredData = searchable
    ? data.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    : data;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          aria-expanded={open}
          role="combobox"
          variant="outline"
          className="w-full justify-between border-none"
        >
          {displayText}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[400px]! z-100! p-0"
        align="start"
        side="bottom"
      >
        <Command className="w-[400px]!">
          <CommandInput
            placeholder="Search item..."
            className="h-9"
            value={searchable ? searchValue : undefined}
            onValueChange={searchable ? setSearchValue : undefined}
          />

          <CommandList className="max-h-48">
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => {
                const isSelected = fields.some((f) => f.value === item.value);
                return (
                  <CommandItem
                    key={item.value}
                    value={item.label}
                    onSelect={() => toggleItem(item)}
                    disabled={
                      (fields.length >= 3 && !isSelected) ||
                      (fields.length === 1 && isSelected)
                    }
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
