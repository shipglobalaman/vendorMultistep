// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Control, FieldValues, Path } from "react-hook-form";

// interface FormInputProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   className?: string;
// }
// export const FormInput = <T extends FieldValues>({
//   control,
//   name,
//   label,
//   className,
// }: FormInputProps<T>) => {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className={className}>
//           <FormLabel>
//             {label} <span className="text-red-500">*</span>
//           </FormLabel>
//           <FormControl>
//             <Input {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

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

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  className?: string;
  type?: "text" | "checkbox";
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
