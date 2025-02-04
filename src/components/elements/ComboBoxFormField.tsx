import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboBox } from "./ComboBox";

interface ComboBoxFormFieldProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder: string;
  searchPlaceholder: string;
  emptyMessage: string;
  loading?: boolean;
  onOptionSelected?: (value: string) => void;
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
}: ComboBoxFormFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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
