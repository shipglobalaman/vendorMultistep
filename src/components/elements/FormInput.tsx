import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
}: FormInputProps<T>) => {
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
                    <FormLabel>{label}</FormLabel>
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
                                {option}
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
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
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
                      <Input type="number" {...field} />
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
                      <Input {...field} />
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
