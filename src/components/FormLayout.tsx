import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

/* props :
 *  fields : [{
 *      fieldName: string, // exemple : "email", "password", "firstName", "lastName"
 *      options?: {
 *          label?: string, // exemple : "Email address", "Password", "First name", "Last name"
 *          type?: string, // exemple : "email", "password", "text", "text"
 *          placeholder?: string | undefined, // exemple : "Email address", "Password", "First name", "Last name"
 *          descritpionMessage?: string | undefined, // exemple : "We'll never share your email with anyone else.", undefined, undefined, undefined
 *          errorMessage?: string | undefined, // exemple : "Email address is required", "Password is required", "First name is required", "Last name is required"
 *          required?: boolean, // exemple : true, true, true, true,
 *      className?: {
 *          label?: string, // exemple : "text-sm font-medium text-gray-700"
 *          input?: string, // exemple : "mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
 *          descriptionMessage?: string, // exemple : "mt-2 text-sm text-gray-500"
 *          errorMessage?: string, // exemple : "mt-2 text-sm text-red-600"
 *      }
 *  }]
 */

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    passwordConfirmation: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type FormLayoutProps = {
  fields: {
    fieldName: string;
    options?: {
      label?: string;
      type?: string;
      placeholder?: string | undefined;
      descritpionMessage?: string | undefined;
      errorMessage?: string | undefined;
    };
    className?: {
      label?: string;
      input?: string;
      descriptionMessage?: string;
      errorMessage?: string;
    };
  }[];
  className?: {
    form?: string;
    button?: string;
  };
};

const FormLayout = ({ fields, className }: FormLayoutProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("max-w-md w-full flex flex-col gap-4", className?.form)}
      >
        {fields.map((field) => (
          <Email
            key={field.fieldName}
            control={form.control}
            options={field.options}
          />
        ))}
        <Button type="submit" className={cn("w-full", className?.button)}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormLayout;

type EmailProps = {
  control: Control<z.infer<typeof formSchema>>;
  options?: {
    label?: string;
    type?: string;
    placeholder?: string | undefined;
    descritpionMessage?: string | undefined;
    errorMessage?: string | undefined;
    required?: boolean;
  };
  className?: {
    label?: string;
    input?: string;
    descriptionMessage?: string;
    errorMessage?: string;
  };
};

const Email = ({ control, options, className }: EmailProps) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          {options?.label && (
            <FormLabel className={cn("", className?.label)}>
              {options?.label}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={options?.placeholder}
              type="email"
              {...field}
              className={cn("", className?.input)}
            />
          </FormControl>
          <FormDescription className={cn("", className?.descriptionMessage)}>
            {options?.descritpionMessage}
          </FormDescription>
          <FormMessage className={cn("", className?.errorMessage)}>
            {options?.errorMessage}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};
