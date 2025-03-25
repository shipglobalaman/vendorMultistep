import { format } from "date-fns";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
  type?: "text" | "checkbox" | "select" | "date" | "number";
  options?: string[];
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  sufix?:string;
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  type = "text",
  checked,
  onCheckedChange,
  required = false,
  options = [],
  sufix,
}: FormInputProps<T>) => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {(() => {
            switch (type) {
              case "checkbox":
                return (
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(checked) => {
                          if (onCheckedChange) {
                            onCheckedChange(checked as boolean);
                          }
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="cursor-pointer">{label}</FormLabel>
                  </div>
                );
              case "select":
                return (
                  <>
                    <FormLabel>
                      <div className="flex gap-1">
                        <p>{label}</p>
                        {required && <span className="text-red-500">*</span>}
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {options.length ? (
                            options.map((option, index) => (
                              <SelectItem key={index} value={option}>
                                {option} {sufix && <span>{sufix}</span>}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="">
                              No options available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </>
                );
              case "date":
                return (
                  <>
                    <FormLabel>
                      <div className="flex gap-1">
                        <p>{label}</p>
                        {required && <span className="text-red-500">*</span>}
                      </div>
                    </FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setOpen(false);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </>
                );
              case "number":
                return (
                  <>
                    <FormLabel>
                      <div className="flex gap-1">
                        <p>{label}</p>
                        {required && <span className="text-red-500">*</span>}
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder={`Enter ${label} . . .`}
                      />
                    </FormControl>
                  </>
                );
              case "text":
              default:
                return (
                  <>
                    <FormLabel>
                      <div className="flex gap-1">
                        <p>{label}</p>
                        {required && <span className="text-red-500">*</span>}
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`Enter ${label} . . .`} />
                    </FormControl>
                  </>
                );
            }
          })()}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
