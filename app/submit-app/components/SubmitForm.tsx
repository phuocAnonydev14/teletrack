'use client';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/utils';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { teleService } from '@/services/tele.service';
import { useAuthContext } from '@/components/providers/AuthProvider';
import { useState } from 'react';

const formSchema = z.object({
  bot: z
    .string({ message: 'Bot name is required.' })
    .min(2, { message: 'Bot name must be at least 2 characters long.' })
    .max(50, { message: 'Bot name cannot exceed 50 characters.' }),
  channel: z
    .string({ message: 'Channel name is required.' })
    .min(2, { message: 'Channel name must be at least 2 characters long.' })
    .max(50, { message: 'Channel name cannot exceed 50 characters.' }),
  description: z
    .string({ message: 'Description is required.' })
    .min(2, { message: 'Description must be at least 2 characters long.' })
    .max(350, { message: 'Description cannot exceed 350 characters.' }),
  contact: z
    .string({ message: 'Contact email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
});

export const SubmitForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const { withAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await teleService.submitApp(values);
      form.reset({ bot: '', channel: '', description: '', contact: '' });
      toast.success('Submit success');
    } catch (e) {
      toast.error('Submit failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-w-full flex-1 flex-col items-center gap-5 md:min-w-[60dvw]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => withAuth(() => onSubmit(data)))}
          className="w-full space-y-5"
        >
          <FormField
            control={form.control}
            name="bot"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="@username, link bot... *"
                    className={cn('w-3xl bg-inputBg', !isDarkTheme && '')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="channel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="@username, link channel... *"
                    className={cn('w-3xl bg-inputBg', !isDarkTheme && '')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="Your contact email *"
                    className={cn('w-3xl bg-inputBg', !isDarkTheme && '')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*<FormField*/}
          {/*  control={form.control}*/}
          {/*  name="language"*/}
          {/*  render={({ field }) => (*/}
          {/*    <FormItem className="w-full">*/}
          {/*      <FormControl className="w-full">*/}
          {/*        <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
          {/*          <FormControl>*/}
          {/*            <SelectTrigger className="bg-inputBg">*/}
          {/*              <SelectValue placeholder="Choose your language *" />*/}
          {/*            </SelectTrigger>*/}
          {/*          </FormControl>*/}
          {/*          <SelectContent className="bg-inputBg">*/}
          {/*            <SelectItem value="m@example.com">English</SelectItem>*/}
          {/*            <SelectItem value="m@google.com">Vietnamese</SelectItem>*/}
          {/*          </SelectContent>*/}
          {/*        </Select>*/}
          {/*      </FormControl>*/}
          {/*      <FormMessage />*/}
          {/*    </FormItem>*/}
          {/*  )}*/}
          {/*/>*/}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Textarea
                    placeholder="Why your app should be accepted? *"
                    className={cn('w-3xl bg-inputBg', !isDarkTheme && '')}
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
