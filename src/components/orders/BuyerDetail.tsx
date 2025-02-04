import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/zod validation/Schema";
import type * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DashboardPage from "@/layouts/DashboardPage";
import { FormInput } from "../elements/FormInput";
import { useCountries, useStates } from "../orders/CountryApi";

const addresses = [
  {
    value:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
    label:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
  },
];

interface BuyerDetailProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function BuyerDetail({ step, setStep }: BuyerDetailProps) {
  const [openAddress, setOpenAddress] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openBillingCountry, setOpenBillingCountry] = useState(false);
  const [openBillingState, setOpenBillingState] = useState(false);
  const { countries, loading: countriesLoading } = useCountries();
  const [selectedShippingCountry, setSelectedShippingCountry] = useState("");
  const { states: shippingStates, loading: statesLoading } = useStates(
    selectedShippingCountry
  );
  const [selectedBillingCountry, setSelectedBillingCountry] = useState("");
  const { states: billingStates, loading: billingStatesLoading } = useStates(
    selectedBillingCountry
  );
  const savedData = localStorage.getItem("formData");
  const initialChecked = savedData
    ? JSON.parse(savedData).sameAsBilling ?? true
    : true;
  const [checked, setChecked] = useState(initialChecked);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupAddress: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingMobile: "",
      shippingAlternateMobile: "",
      shippingEmail: "",
      shippingCountry: "india",
      shippingAddress1: "",
      shippingLandmark: "",
      shippingAddress2: "",
      shippingPincode: "",
      shippingCity: "",
      shippingState: "",
      sameAsBilling: false,
      billingFirstName: "",
      billingLastName: "",
      billingMobile: "",
      billingAlternateMobile: "",
      billingEmail: "",
      billingCountry: "india",
      billingAddress1: "",
      billingLandmark: "",
      billingAddress2: "",
      billingPincode: "",
      billingCity: "",
      billingState: "",
    },
  });
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      console.log(parsedData);
      form.reset(parsedData);
      if (parsedData.shippingCountry) {
        setSelectedShippingCountry(parsedData.shippingCountry);
      }
      if (parsedData.billingCountry) {
        setSelectedBillingCountry(parsedData.billingCountry);
      }
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem("formData", JSON.stringify(values));
    setStep(step + 1);
  }

  const shippingAddress = form.watch([
    "shippingFirstName",
    "shippingLastName",
    "shippingMobile",
    "shippingAlternateMobile",
    "shippingEmail",
    "shippingCountry",
    "shippingAddress1",
    "shippingLandmark",
    "shippingAddress2",
    "shippingPincode",
    "shippingCity",
    "shippingState",
  ]);
  useEffect(() => {
    console.log(checked);
    if (checked) {
      form.setValue("billingFirstName", form.getValues("shippingFirstName"));
      form.setValue("billingLastName", form.getValues("shippingLastName"));
      form.setValue("billingMobile", form.getValues("shippingMobile"));
      form.setValue(
        "billingAlternateMobile",
        form.getValues("shippingAlternateMobile")
      );
      form.setValue("billingEmail", form.getValues("shippingEmail"));
      form.setValue("billingAddress1", form.getValues("shippingAddress1"));
      form.setValue("billingLandmark", form.getValues("shippingLandmark"));
      form.setValue("billingAddress2", form.getValues("shippingAddress2"));
      form.setValue("billingPincode", form.getValues("shippingPincode"));
      form.setValue("billingCity", form.getValues("shippingCity"));
      form.setValue("billingCountry", form.getValues("shippingCountry"));
      form.setValue("billingState", form.getValues("shippingState"));
    }
  }, [checked, form, shippingAddress]);
  return (
    <DashboardPage>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="max-w-3xl">
            <div className="px-2 space-y-5 mb-12">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-semibold">Select Pickup Address</h2>
                <span className="text-red-500">*</span>
              </div>
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover open={openAddress} onOpenChange={setOpenAddress}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openAddress}
                            className="w-full mt-2 justify-between h-auto py-3 text-left font-normal md:text-wrap bg-gray-50">
                            {field.value
                              ? addresses.find(
                                  (address) => address.value === field.value
                                )?.label
                              : "Select pickup address..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                          <Command>
                            <CommandInput placeholder="Search address..." />
                            <CommandList>
                              <CommandEmpty>No address found.</CommandEmpty>
                              <CommandGroup>
                                {addresses.map((address) => (
                                  <CommandItem
                                    key={address.value}
                                    value={address.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "pickupAddress",
                                        address.value
                                      );
                                      setOpenAddress(false);
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === address.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {address.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr />
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6">
                Buyer Shipping Details
              </h2>
              <div className="md:grid grid-cols-3 gap-6 ">
                <FormInput
                  key="shippingFirstName"
                  control={form.control}
                  name="shippingFirstName"
                  label="First Name"
                />
                <FormInput
                  key="shippingLastName"
                  control={form.control}
                  name="shippingLastName"
                  label="Last Name"
                />
                <FormInput
                  key="shippingMobile"
                  control={form.control}
                  name="shippingMobile"
                  label="Mobile No."
                />
                <FormInput
                  key="shippingAlternateMobile"
                  control={form.control}
                  name="shippingAlternateMobile"
                  label="Alternate Mobile No."
                />
                <FormInput
                  key="shippingEmail"
                  control={form.control}
                  name="shippingEmail"
                  label="Email Id"
                  className="col-span-2"
                />
              </div>
            </div>
            <div className="mt-6">
              <FormField
                control={form.control}
                name="shippingCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Popover open={openCountry} onOpenChange={setOpenCountry}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCountry}
                            className="w-full mt-2 justify-between h-auto py-3 text-left font-normal md:text-wrap bg-gray-50">
                            {countriesLoading
                              ? "Loading..."
                              : countries.find(
                                  (country) => country.code === field.value
                                )?.name || "Select Country"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              {countriesLoading ? (
                                <CommandEmpty>
                                  Loading countries...
                                </CommandEmpty>
                              ) : (
                                <>
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    {countries.map((country) => (
                                      <CommandItem
                                        key={country.code}
                                        value={country.code}
                                        onSelect={() => {
                                          field.onChange(country.code);
                                          setOpenCountry(false);
                                          setSelectedShippingCountry(
                                            country.code
                                          );
                                        }}>
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === country.code
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {country.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <FormInput
                key="shippingAddress1"
                control={form.control}
                name="shippingAddress1"
                label="Address 1"
              />
              <FormInput
                key="shippingLandmark"
                control={form.control}
                name="shippingLandmark"
                label="Landmark"
              />
            </div>
            <div className="space-y-2 mt-6">
              <FormInput
                key="shippingAddress2"
                control={form.control}
                name="shippingAddress2"
                label="Address 2"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <FormInput
                key="shippingPincode"
                control={form.control}
                name="shippingPincode"
                label="Pincode"
              />
              <FormInput
                key="shippingCity"
                control={form.control}
                name="shippingCity"
                label="City"
              />
              <FormField
                control={form.control}
                name="shippingState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Popover open={openCity} onOpenChange={setOpenCity}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCity}
                            className={cn(
                              "w-full mt-2 justify-between h-auto text-left font-normal bg-gray-50 overflow-hidden",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value
                              ? shippingStates.find(
                                  (state) => state.name === field.value
                                )?.name
                              : "Select a state"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                        <Command>
                          <CommandInput placeholder="Search state..." />
                          <CommandList>
                            <CommandEmpty>No state found.</CommandEmpty>
                            <CommandGroup>
                              {statesLoading ? (
                                <CommandItem disabled>Loading...</CommandItem>
                              ) : shippingStates.length > 0 ? (
                                shippingStates.map((state) => (
                                  <CommandItem
                                    key={state.code}
                                    value={state.name}
                                    onSelect={(value) => {
                                      form.setValue("shippingState", value);
                                      setOpenCity(false);
                                    }}>
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === state.name
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {state.name}
                                  </CommandItem>
                                ))
                              ) : (
                                <CommandItem disabled>
                                  No states available
                                </CommandItem>
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-12">
            <FormField
              control={form.control}
              name="sameAsBilling"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(checked) => {
                        setChecked(checked as boolean);
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Shipping & Billing Address are same</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className={`${checked ? "hidden" : "mt-12"}`}>
            <h2 className="text-xl font-semibold mb-6">
              Buyer Billing Details
            </h2>
            <div className="md:grid grid-cols-3 gap-6 ">
              <FormInput
                key="billingFirstName"
                control={form.control}
                name="billingFirstName"
                label="First Name"
              />
              <FormInput
                key="billingLastName"
                control={form.control}
                name="billingLastName"
                label="Last Name"
              />
              <FormInput
                key="billingMobile"
                control={form.control}
                name="billingMobile"
                label="Mobile No."
              />
              <FormInput
                key="billingAlternateMobile"
                control={form.control}
                name="billingAlternateMobile"
                label="Alternate Mobile No."
              />
              <FormInput
                key="billingEmail"
                control={form.control}
                name="billingEmail"
                label="Email Id"
                className="col-span-2"
              />
            </div>
            <div className="mt-6">
              <FormField
                control={form.control}
                name="billingCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Country</FormLabel>
                    <FormControl>
                      <Popover
                        open={openBillingCountry}
                        onOpenChange={setOpenBillingCountry}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full mt-2 justify-between h-auto py-3 text-left font-normal bg-gray-50">
                            {countriesLoading
                              ? "Loading..."
                              : countries.find((c) => c.code === field.value)
                                  ?.name || "Select Country"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              {countriesLoading ? (
                                <CommandEmpty>
                                  Loading countries...
                                </CommandEmpty>
                              ) : (
                                <CommandGroup>
                                  {countries.map((country) => (
                                    <CommandItem
                                      key={country.code}
                                      value={country.code}
                                      onSelect={() => {
                                        field.onChange(country.code);
                                        setOpenBillingCountry(false);
                                        setSelectedBillingCountry(country.code);
                                      }}>
                                      <Check className="mr-2 h-4 w-4 opacity-100" />
                                      {country.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <FormInput
                key="billingAddress1"
                control={form.control}
                name="billingAddress1"
                label="Address 1"
              />
              <FormInput
                key="billingLandmark"
                control={form.control}
                name="billingLandmark"
                label="Landmark"
              />
            </div>
            <div className="space-y-2 mt-6">
              <FormInput
                key="billingAddress2"
                control={form.control}
                name="billingAddress2"
                label="Address 2"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <FormInput
                key="billingPincode"
                control={form.control}
                name="billingPincode"
                label="Pincode"
              />
              <FormInput
                key="billingCity"
                control={form.control}
                name="billingCity"
                label="City"
              />
              <FormField
                control={form.control}
                name="billingState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing State</FormLabel>
                    <Popover
                      open={openBillingState}
                      onOpenChange={setOpenBillingState}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between">
                            {field.value
                              ? billingStates.find(
                                  (state) => state.name === field.value
                                )?.name
                              : "Select a state"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Command>
                          <CommandInput placeholder="Search state..." />
                          <CommandList>
                            {billingStatesLoading ? (
                              <CommandItem disabled>Loading...</CommandItem>
                            ) : billingStates.length > 0 ? (
                              billingStates.map((state) => (
                                <CommandItem
                                  key={state.code}
                                  value={state.name}
                                  onSelect={(value) => {
                                    form.setValue("billingState", value);
                                    setOpenBillingState(false);
                                  }}>
                                  <Check className="mr-2 h-4 w-4 opacity-100" />
                                  {state.name}
                                </CommandItem>
                              ))
                            ) : (
                              <CommandItem disabled>
                                No states available
                              </CommandItem>
                            )}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-10 bg-blue-400 hover:bg-blue-500"
              size="lg">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </DashboardPage>
  );
}
