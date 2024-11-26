"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react"; // Import signIn from NextAuth
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the schema for the form
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>; // Type inference for the form data

function ProfileForm() {
  const router = useRouter();
  
  // Initialize the form with react-hook-form and zod schema
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "", // Add default value for password
    },
  });

  // Function to handle form submission
  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.username,
      password: data.password,
    });

    // Redirect to the dashboard on successful sign-in
    router.push("/dashboard");

    // Handle result here (e.g., show error message if sign in failed)
    if (result?.error) {
      console.error(result.error);
      alert("Login failed! Please check your credentials.");
    } else {
      // Redirect to a success page or handle successful sign-in
      console.log("Sign-in successful");
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] mt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>
                  This is your account password. Make sure it’s strong.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">Submit</Button>

          {/* New User Section */}
          <div className="flex justify-end mt-4">
            <p className="text-sm text-gray-500">
              New user?{" "}
              <Link href="/sign-up" className="text-blue-600 hover:underline">
                Sign up here.
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;
