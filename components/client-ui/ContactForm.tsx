'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Mail,
  Phone,
  User,
  MessageSquare,
  SendHorizonal,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================
// ZOD SCHEMA VALIDATION
// ============================================

// Phone validation regex (requires exactly 10 digits with optional formatting)
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
// Valid examples: 0521234567, 052-123-4567, (052) 123-4567, +972521234567

// Base schema (always required fields)
const baseContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .describe('Full name of the contact person'),

  phone: z
    .string()
    .regex(PHONE_REGEX, 'Please enter a valid 10-digit phone number')
    // .refine(
    //   (val) => {
    //     // Remove all non-digit characters and check if exactly 10 digits
    //     const digits = val.replace(/\D/g, '').replaceAll('-', '');
    //     return digits.length === 10;
    //   },
    //   { message: 'Phone number must contain exactly 10 digits' }
    // )
    .describe('Contact phone number (10 digits required)'),
  email: z
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal(''))
    .describe('Optional email address'),

  message: z
    .string()
    .max(500, 'Message must be less than 500 characters')
    .optional()
    .describe('Optional message from the user'),
});

// Type inference from schema - exported for use in other components
export type ContactFormData = z.infer<typeof baseContactSchema>;

interface ContactFormProps {
  includeEmail?: boolean;
  includeMessage?: boolean;
  onSubmit?: (data: ContactFormData) => void;
}

export function ContactForm({
  includeEmail = false,
  includeMessage = false,
  onSubmit,
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Select schema based on includeEmail and includeMessage props
  const schema = baseContactSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    control,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange', // Validate on change for better UX
  });

  // Watch field values to show valid state (using useWatch for React Compiler compatibility)
  const watchName = useWatch({ control, name: 'name' });
  const watchPhone = useWatch({ control, name: 'phone' });
  const watchEmail = useWatch({ control, name: 'email' });

  const onSubmitForm = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);

    // Log the form data
    console.log('📋 Contact Form Submission:', {
      timestamp: new Date().toISOString(),
      data: {
        name: data.name,
        phone: data.phone,
        ...(includeEmail && data.email && { email: data.email }),
        ...(includeMessage && data.message && { message: data.message }),
      },
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Call optional onSubmit callback
    onSubmit?.(data);

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      reset();
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="text-success mb-4 h-16 w-16" />
        </motion.div>
        <h3 className="mb-2 text-2xl font-bold">Thank You!</h3>
        <p className="text-muted-foreground text-center">
          We&apos;ve received your message and will get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <Card className="glass border-border/50 mx-auto w-full max-w-2xl overflow-hidden backdrop-blur-xl">
      <CardHeader className="space-y-1 pb-6">
        <CardTitle className="text-center text-3xl font-bold">
          Get In Touch
        </CardTitle>
        <p className="text-muted-foreground text-center">
          Fill out the form below and we&apos;ll respond as soon as possible
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <Label htmlFor="name" className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Your full name"
              className={cn(
                'transition-all duration-300',
                errors.name && 'field-error',
                !errors.name && touchedFields.name && watchName && 'field-valid'
              )}
              {...register('name')}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive flex items-center gap-1 text-sm"
              >
                <span className="font-semibold">⚠</span> {errors.name.message}
              </motion.p>
            )}
            {!errors.name && touchedFields.name && watchName && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-success flex items-center gap-1 text-sm"
              >
                <CheckCircle2 className="h-3 w-3" /> Looks good!
              </motion.p>
            )}
          </motion.div>

          {/* Phone Field */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Label
              htmlFor="phone"
              className="flex items-center gap-2 text-base"
            >
              <Phone className="h-4 w-4" />
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              maxLength={14}
              placeholder="e.g. 0521234567"
              className={cn(
                'transition-all duration-300',
                errors.phone && 'field-error',
                !errors.phone &&
                  touchedFields.phone &&
                  watchPhone &&
                  'field-valid'
              )}
              {...register('phone')}
            />
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive flex items-center gap-1 text-sm"
              >
                <span className="font-semibold">⚠</span> {errors.phone.message}
              </motion.p>
            )}
            {!errors.phone && touchedFields.phone && watchPhone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-success flex items-center gap-1 text-sm"
              >
                <CheckCircle2 className="h-3 w-3" /> Valid phone number!
              </motion.p>
            )}
            <p className="text-muted-foreground text-xs">
              Must be exactly 10 digits (formatting optional)
            </p>
          </motion.div>

          {/* Email Field (Conditional) */}
          {includeEmail && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-base"
              >
                <Mail className="h-4 w-4" />
                Email{' '}
                <span className="text-muted-foreground text-sm">
                  (optional)
                </span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className={cn(
                  'transition-all duration-300',
                  errors.email && 'field-error',
                  !errors.email &&
                    touchedFields.email &&
                    watchEmail &&
                    'field-valid'
                )}
                {...register('email')}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive flex items-center gap-1 text-sm"
                >
                  <span className="font-semibold">⚠</span>{' '}
                  {errors.email.message}
                </motion.p>
              )}
              {!errors.email && touchedFields.email && watchEmail && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-success flex items-center gap-1 text-sm"
                >
                  <CheckCircle2 className="h-3 w-3" /> Valid email!
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Message Field */}
          {includeMessage && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: includeEmail ? 0.4 : 0.3 }}
              className="space-y-2"
            >
              <Label
                htmlFor="message"
                className="flex items-center gap-2 text-base"
              >
                <MessageSquare className="h-4 w-4" />
                Message{' '}
                <span className="text-muted-foreground text-sm">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us how we can help you..."
                rows={4}
                className="resize-none transition-all duration-300"
                {...register('message')}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive flex items-center gap-1 text-sm"
                >
                  <span className="font-semibold">⚠</span>{' '}
                  {errors.message.message}
                </motion.p>
              )}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: includeEmail ? 0.5 : 0.4 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="gradient"
              className="shine-button w-full justify-center"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  Sending...
                  <SendHorizonal className="h-5 w-5" />
                </>
              ) : (
                <>
                  Send Message
                  <SendHorizonal className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: includeEmail ? 0.6 : 0.5 }}
            className="text-muted-foreground text-center text-xs"
          >
            🔒 Your information is secure and will never be shared with third
            parties
          </motion.p>
        </form>
      </CardContent>
    </Card>
  );
}
