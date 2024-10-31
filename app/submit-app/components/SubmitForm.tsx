'use client';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/utils';
import { useTheme } from 'next-themes';

const formSchema = z.object({
  botLink: z.string().min(2).max(50),
  channelLink: z.string().min(2).max(50),
  other: z.string().min(2).max(50).optional(),
  language: z.string().min(2).max(50),
  reason: z.string().min(2).max(350),
});
export const SubmitForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex min-w-full flex-1 flex-col items-center gap-5 md:min-w-[60dvw]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
          <FormField
            control={form.control}
            name="botLink"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="@username, link bot... *"
                    className={cn(
                      'w-3xl bg-inputBg placeholder:text-white',
                      !isDarkTheme && 'placeholder:text-black',
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="channelLink"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="@username, link channel... *"
                    className={cn(
                      'w-3xl bg-inputBg placeholder:text-white',
                      !isDarkTheme && 'placeholder:text-black',
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-inputBg">
                        <SelectValue placeholder="Other" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-inputBg">
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-inputBg">
                        <SelectValue placeholder="Choose your language *" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-inputBg">
                      <SelectItem value="m@example.com">English</SelectItem>
                      <SelectItem value="m@google.com">Vietnamese</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Textarea
                    placeholder="Why your app should be accepted? "
                    className={cn(
                      'w-3xl bg-inputBg placeholder:text-white',
                      !isDarkTheme && 'placeholder:text-black',
                    )}
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
