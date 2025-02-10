import React from "react";
import { useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ComboBoxProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  loading?: boolean;
}

function ComboBox({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  loading = false,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full mt-2 justify-between h-auto text-left font-normal bg-gray-50 flex items-center">
          <span className="w-56 truncate">
            {loading
              ? "Loading..."
              : options.find((option) => option.value === value)?.label ||
                placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            {loading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : (
              <>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        onChange(option.value);
                        setOpen(false);
                      }}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface ComboBoxFormFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  loading?: boolean;
  onOptionSelected?: (value: string) => void;
  required?: boolean;
}

export function ComboBoxFormField({
  name,
  label,
  options,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  loading = false,
  onOptionSelected,
  required = false,
}: ComboBoxFormFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <div className="flex gap-1">
              <p>{label}</p>
              {required && <span className="text-red-500">*</span>}
            </div>
          </FormLabel>
          <FormControl>
            <ComboBox
              options={options}
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                if (onOptionSelected) {
                  onOptionSelected(value);
                }
              }}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              emptyMessage={emptyMessage}
              loading={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
