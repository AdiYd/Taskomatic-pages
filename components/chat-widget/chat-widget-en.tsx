'use client';

import { serverSendEmail } from '@/actions/user-actions';
import { smoothScroll } from '@/app/page/taskomatic/sections/HeroSection';
import { TaskomaticIcon } from '@/components/custom/logo';
import {
  Button,
  Input,
  ScrollArea,
  Skeleton,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useToast,
} from '@/components/ui';
import { DEFAULT_LEADS_EMAILS } from '@/lib/constants';
import { leadFormTemplate } from '@/lib/email-templates';
import { cn, formatTimestamp } from '@/lib/utils';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, SendHorizonal, X } from 'lucide-react';
import { JSX, useEffect, useRef, useState } from 'react';

interface ChatMessage {
  content: string | JSX.Element | undefined;
  type: 'user' | 'assistant';
  timestamp: Date;
  suggestedPrompts?: Array<{
    label: string;
    targetId: string;
    onClick?: () => void;
  }>;
}

interface MockResponse {
  id: string;
  content: string | JSX.Element | undefined;
  type: 'user' | 'assistant';
  suggestedPrompts?: Array<{
    label: string;
    targetId: string;
    onClick?: () => void;
  }>;
}

// Mock responses with ID-based routing
const mockResponses: Record<string, MockResponse> = {
  welcome: {
    id: 'welcome',
    content:
      "👋 Hello! I'm Taskomatic's digital assistant - your AI-powered marketing platform.\n\n🚀 **Our Products:**\n• Adomatic - Smart paid campaigns\n• Postomatic - Automated organic publishing\n• Creative AI - Content & creative generation\n• High-converting landing pages\n• WhatsApp AI Agent\n\nWhat would you like to learn about?",
    type: 'assistant',
    suggestedPrompts: [
      { label: 'Adomatic - Paid Ads', targetId: 'adomatic' },
      { label: 'Postomatic - Organic Posts', targetId: 'postomatic' },
      { label: 'Creative AI Generation', targetId: 'creative-ai' },
      { label: 'How to get started?', targetId: 'getting-started' },
    ],
  },
  adomatic: {
    id: 'adomatic',
    content:
      '🎯 **Adomatic** - Smart paid advertising management\n\n**What it does:**\n• Auto-creates campaigns for Meta & Google\n• Real-time budget & performance optimization\n• AI-powered content & creative generation\n• Advanced analytics with actionable insights\n\n💡 A digital marketing manager working 24/7 - identifying opportunities, optimizing campaigns, and delivering results.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'Tell me about the full platform', targetId: 'platform-overview' },
      { label: 'How does AI optimize?', targetId: 'ai-technology' },
      { label: "Let's get started", targetId: 'getting-started' },
    ],
  },
  postomatic: {
    id: 'postomatic',
    content:
      '📱 **Postomatic** - Automated organic publishing\n\n**What it does:**\n• Publishes to hundreds of Facebook & Instagram groups\n• AI creates unique business-tailored content\n• Smart scheduling & weekly campaign management\n• Advanced Chrome extension for easy posting\n\n💡 Instead of manually posting to each group - AI understands your business, creates quality content, and publishes automatically.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'Tell me about Creative AI', targetId: 'creative-ai' },
      { label: 'What else is on the platform?', targetId: 'platform-overview' },
      { label: 'How to get started?', targetId: 'getting-started' },
    ],
  },
  'creative-ai': {
    id: 'creative-ai',
    content:
      '🎨 **Creative AI** - Professional creative generation\n\n**What the system creates:**\n• Banners & ads for all platforms\n• Unique business avatars\n• Social media creatives\n• Tailored marketing content\n\n💡 **The Technology:**\nPowered by advanced AI models (OpenAI, Gemini, Anthropic) to create professional-grade designs that convert and sell.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'Tell me about landing pages', targetId: 'landing-pages' },
      { label: 'What else is there?', targetId: 'platform-overview' },
      { label: "Let's get started", targetId: 'getting-started' },
    ],
  },
  'landing-pages': {
    id: 'landing-pages',
    content:
      "🌐 **High-Converting Landing Pages** - Turn visitors into customers\n\n**What's included:**\n• AI-powered landing page creation in minutes\n• Professional mobile-responsive designs\n• Built-in lead capture forms\n• Pixel tracking integration\n• Real-time performance analytics\n\n💡 AI learns your business and creates a converting page with compelling content and effective calls-to-action.",
    type: 'assistant',
    suggestedPrompts: [
      { label: 'Tell me about WhatsApp AI', targetId: 'whatsapp-ai' },
      { label: 'How does it all work together?', targetId: 'platform-overview' },
      { label: "Let's get started", targetId: 'getting-started' },
    ],
  },
  'whatsapp-ai': {
    id: 'whatsapp-ai',
    content:
      '💬 **WhatsApp AI Agent** - Smart 24/7 customer service\n\n**What the agent does:**\n• Engages customers naturally\n• Nurtures leads and prepares them for sales\n• Answers FAQs instantly\n• Filters and tags conversations automatically\n• Routes important conversations to manual responses\n\n💡 Powered by advanced AI models (GPT, Claude, Gemini) for precise understanding of customer needs and sales opportunity identification.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'How does it all work together?', targetId: 'platform-overview' },
      { label: 'Tell me about the technology', targetId: 'ai-technology' },
      { label: "Let's get started", targetId: 'getting-started' },
    ],
  },
  'platform-overview': {
    id: 'platform-overview',
    content:
      '🌟 **Taskomatic Platform** - Complete marketing solution\n\n**5 engines in one platform:**\n\n1️⃣ **Adomatic** - Paid campaigns\n2️⃣ **Postomatic** - Organic publishing\n3️⃣ **Creative AI** - Content & creative generation\n4️⃣ **Landing Pages** - Convert visitors to customers\n5️⃣ **WhatsApp AI** - Smart customer service\n\n✨ **The Integration:**\nAll systems work together - AI creates creatives, ads drive to landing pages, inquiries are handled on WhatsApp, and AI continuously learns and improves.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'How does the AI work?', targetId: 'ai-technology' },
      { label: "Let's get started", targetId: 'getting-started' },
    ],
  },
  'ai-technology': {
    id: 'ai-technology',
    content:
      '🧠 **Our Technology** - AI that learns and improves\n\n**How it works:**\n\n**1. Learning** 📚\nYou describe your business - AI creates a tailored marketing strategy\n\n**2. Creation** ✨\n• Professional marketing content\n• Creatives and graphics\n• Compelling copy\n• Landing pages\n\n**3. Optimization** 📊\n• Real-time performance analysis\n• Strategy adjustment based on results\n• Budget scaling for what works\n\n💡 Powered by leading models (GPT, Claude, Gemini) - each specialized in its task.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'What are the benefits?', targetId: 'why-taskomatic' },
      { label: "Let's get started", targetId: 'getting-started' },
    ],
  },
  'why-taskomatic': {
    id: 'why-taskomatic',
    content:
      '💎 **Why Taskomatic?**\n\n✅ **All-in-one solution** - Every tool you need in one platform\n✅ **AI that truly works** - Fully customized to your business\n✅ **Complete automation** - The system works 24/7\n✅ **Measurable results** - Advanced analytics for everything\n✅ **Significant savings** - Instead of expensive agencies\n\n🚀 More leads, more sales, less time and effort.',
    type: 'assistant',
    suggestedPrompts: [{ label: "Let's get started!", targetId: 'getting-started' }],
  },
  'getting-started': {
    id: 'getting-started',
    content:
      '🚀 **How to get started?**\n\n**3 simple steps:**\n\n**1️⃣ Sign up & provide details**\n• Create account with one click\n• Tell us about your business\n• AI creates your strategy\n\n**2️⃣ Connect platforms**\n• Facebook/Instagram (optional)\n• Chrome extension for Postomatic\n• WhatsApp Business\n\n**3️⃣ Start creating!** ✨\n• Choose campaigns\n• Click "Start"\n• The system does the rest\n\n⏱️ **Setup time:** 10-15 minutes\n🎯 **First results:** Within days',
    type: 'assistant',
    suggestedPrompts: [
      {
        label: "Let's talk! 💬",
        targetId: 'contact',
        onClick: () => {
          if (typeof window !== 'undefined') {
            smoothScroll('contact-us');
          }
        },
      },
    ],
  },
  contact: {
    id: 'contact',
    content: 'CONTACT_FORM', // Marker for dynamic form rendering
    type: 'assistant',
    suggestedPrompts: [],
  },
};

// Initial welcome message
const welcomeResponse = mockResponses.welcome;
const initialMessages: ChatMessage[] = [
  {
    content: (welcomeResponse?.content || '') as string,
    type: 'assistant',
    timestamp: new Date(),
    suggestedPrompts: welcomeResponse?.suggestedPrompts || [],
  },
];

function parseMessageContent(content: string | JSX.Element | undefined) {
  if (!content) return null;
  if (typeof content !== 'string') return content;
  const parts = content.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove the ** markers and render as bold
      return (
        <strong key={index} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

// Helper function to get response by ID
function getResponseById(id: string): MockResponse | undefined {
  return mockResponses[id] || Object.values(mockResponses).find(resp => resp.id === id);
}

export function ChatbotWidgetEnglish({ hideInput }: { hideInput?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [contactFormData, setContactFormData] = useState({ name: '', phone: '' });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Function to handle unrecognized queries
  const onSubmit = (userInput: string | JSX.Element | undefined) => {
    console.log('Unrecognized query:', userInput);
    // TODO: Add logic here to send to backend, analytics, or CRM
  };

  // Handle contact form submission
  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^05\d{8}$/;
    if (!contactFormData.name || contactFormData.name.length < 2) {
      toast({
        title: 'Error',
        description: 'Name must be at least 2 characters',
        variant: 'destructive',
      });
      return;
    }

    if (!phoneRegex.test(contactFormData.phone)) {
      toast({
        title: 'Error',
        description: 'Phone number must start with 05 and contain 10 digits',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmittingContact(true);

    try {
      console.log('Contact form data:', contactFormData);

      const emailTemplate = leadFormTemplate(contactFormData);

      // Send email via API route
      await serverSendEmail({
        to: DEFAULT_LEADS_EMAILS,
        subject: 'New Contact Form from Taskomatic Chat Widget',
        html: emailTemplate,
        from: 'Taskomatic <leads@webly.digital>',
      });

      if (process.env.NODE_ENV === 'production') {
        // Track Facebook Pixel Lead event
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Taskomatic Chat Widget Contact Form',
            content_category: 'Contact',
            value: 0,
            currency: 'ILS',
            ph: contactFormData.phone.replace(/^0/, '972'),
          });
        }

        // Send webhook to ZEK CRM
        try {
          const params = new URLSearchParams({
            company_id: '1005530',
            api_id: '4198',
            token: 'SlofLmP5F4bqFfC6eGgLF82D',
            name: contactFormData.name,
            phone: contactFormData.phone,
            source: 'Taskomatic Chat Widget',
            in_process: 'Yes',
          });
          const url = `https://zek.co.il/crm/WebhookZEK.php?${params.toString()}`;
          await axios.post(url);
        } catch (_webhookError) {}
      }

      toast({
        title: 'Details sent successfully!',
        description: "Thank you for contacting us. We'll get back to you shortly.",
        variant: 'success',
      });

      // Add success message to chat
      const successMessage: ChatMessage = {
        content:
          '✅ **Thank you!**\n\nYour details were sent successfully.\nA representative will contact you shortly! 🎉',
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, successMessage]);

      // Reset form
      setContactFormData({ name: '', phone: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Error sending details',
        description: 'An error occurred while sending your details. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Render contact form JSX
  const renderContactForm = () => (
    <div className="space-y-3">
      <p className="text-sm font-semibold">🎉 Great! Let's begin</p>
      <p className="text-xs text-muted-foreground">
        Leave your details and we'll contact you soon:
      </p>
      <form onSubmit={handleContactFormSubmit} className="space-y-3">
        <Input
          placeholder="Full Name"
          value={contactFormData.name}
          onChange={e => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
          disabled={isSubmittingContact}
          className="text-center"
          required
          minLength={2}
        />
        <Input
          placeholder="05..."
          value={contactFormData.phone}
          onChange={e => setContactFormData(prev => ({ ...prev, phone: e.target.value }))}
          disabled={isSubmittingContact}
          className="text-center"
          style={{ direction: 'ltr' }}
          maxLength={10}
          required
          pattern="05\d{8}"
        />
        <Button
          type="submit"
          className="w-full shine-button"
          disabled={isSubmittingContact || !contactFormData.name || !contactFormData.phone}
        >
          {isSubmittingContact ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Details
              <Icon className="" icon="famicons:send" width="1.2em" height="1.2em" />
            </>
          )}
        </Button>
      </form>
    </div>
  );

  const handleSendMessage = async (responseId?: string) => {
    // If no responseId provided, it's a manual user input
    if (!responseId) {
      if (!inputValue.trim() || isTyping) return;

      const userMessage: ChatMessage = {
        content: inputValue.trim(),
        type: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);
      setHasInteracted(true);

      // Log unrecognized query
      if (userMessage.content) {
        console.log('Unrecognized user query:', userMessage.content);
        onSubmit(userMessage.content);
      }

      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

      // Show default response for unrecognized queries
      const defaultResponse = getResponseById('welcome');
      if (defaultResponse) {
        const aiMessage: ChatMessage = {
          content: "🤔 Not sure I understood... Let's try again!\n\n" + defaultResponse.content,
          type: 'assistant',
          timestamp: new Date(),
          suggestedPrompts: defaultResponse.suggestedPrompts,
        };
        setMessages(prev => [...prev, aiMessage]);
      }
      setIsTyping(false);
      return;
    }

    // Handle ID-based responses (from suggested prompts)
    setIsTyping(true);
    setHasInteracted(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));

    const response = getResponseById(responseId);
    if (response) {
      const aiMessage: ChatMessage = {
        content: response.content,
        type: response.type,
        timestamp: new Date(),
        suggestedPrompts: response.suggestedPrompts,
      };
      setMessages(prev => [...prev, aiMessage]);
    }
    setIsTyping(false);
  };

  const handlePromptClick = (prompt: { label: string; targetId: string; onClick?: () => void }) => {
    // Execute onClick callback if provided (for CTAs)
    if (prompt.onClick) {
      prompt.onClick();
    }

    // Add the prompt label to the message history for context
    const response = getResponseById(prompt.targetId);
    if (response) {
      const userMessage: ChatMessage = {
        content: prompt?.label || 'Continue',
        type: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
    }

    // Trigger the response
    handleSendMessage(prompt.targetId);
  };

  const MessageSkeleton = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end w-full"
    >
      <div className="p-4 whatsapp-message whatsapp-receiver max-w-[80%]">
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative shake* z-50"
              >
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="outline"
                  id="chat-widget-button"
                  size="icon"
                  className="rounded-full hover:bg-green-800 dark:hover:bg-green-800 bg-green-600 dark:bg-green-700 h-10 w-10 shadow-lg hover:shadow-xl group relative"
                >
                  <Icon icon="fluent:chat-16-regular" className="size-7 text-white/80" />{' '}
                  {!hasInteracted && (
                    <motion.div
                      animate={{
                        scale: [0.8, 1, 0.8],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-background"
                    />
                  )}
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              Hello! 👋 I'm here to help you discover the future of marketing with Taskomatic AI! 🚀
            </TooltipContent>
          </Tooltip>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'absolute -right-3 z-50 bg-card border-1 border-zinc-400/20 shadow-2xl rounded-lg overflow-hidden flex flex-col',
              'bottom-2 w-[320px] sm:w-[420px] h-[600px] max-h-[80vh]'
            )}
          >
            {/* Header */}
            <motion.div
              layout
              className="bg-gradient-to-l from-sky-700 to-sky-500 p-2 text-primary-foreground flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <TaskomaticIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-2 text-white">Taskomatic AI</h3>
                  <p className="text-xs text-white opacity-90">
                    The future of marketing is here ✨
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
            {/* Messages Area */}
            <>
              <ScrollArea className="flex-1 px-4 py-0 bg-amber-300/10 dark:bg-transparent whatsapp-bg*">
                <div className="space-y-4 mt-2">
                  <AnimatePresence mode="popLayout">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          'flex w-full',
                          message.type === 'user' ? 'justify-start' : 'justify-end'
                        )}
                      >
                        <div
                          className={cn(
                            'p-3 whatsapp-message max-w-[85%] min-w-[70%] text-start relative',
                            message.type === 'assistant' ? 'whatsapp-sender' : 'whatsapp-receiver'
                          )}
                        >
                          {message.content === 'CONTACT_FORM' ? (
                            renderContactForm()
                          ) : (
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">
                              {parseMessageContent(message.content)}
                            </p>
                          )}

                          {/* Suggested Prompts */}
                          {message.suggestedPrompts && message.suggestedPrompts.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                              className="mt-3 space-y-2"
                            >
                              {message.suggestedPrompts.map((prompt, idx) => (
                                <Button
                                  key={idx}
                                  onClick={() => handlePromptClick(prompt)}
                                  variant="main"
                                  size="sm"
                                  className="w-full text-xs"
                                >
                                  {prompt.label}
                                </Button>
                              ))}
                            </motion.div>
                          )}

                          {/* Timestamp */}
                          <div className="text-[0.7rem] text-muted-foreground mt-3 text-right">
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && <MessageSkeleton />}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              {!hideInput && (
                <div className="p-3 border-t bg-background">
                  <div
                    onBlur={e => {
                      // Glowing effect on focus loss
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onFocus={e => {
                      // Glowing effect on focus
                      e.currentTarget.style.boxShadow = '0 0 8px rgba(245, 158, 11, 0.6)';
                    }}
                    className="flex items-center gap-2 bg-card border rounded-lg p-2"
                  >
                    <Textarea
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          void handleSendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                      className="resize-none border-none shadow-none focus-visible:ring-0 bg-transparent min-h-[40px] max-h-[120px]"
                      rows={1}
                      disabled={isTyping}
                    />
                    <Button
                      ref={submitButtonRef}
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      size="sm"
                      className="shine-button shrink-0"
                    >
                      {isTyping ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <SendHorizonal className="h-4 w-4 rotate-180" />
                      )}
                    </Button>
                  </div>
                  <p className="text-[0.65rem] text-muted-foreground text-center mt-2">
                    🚀 Taskomatic AI - Tomorrow's smart marketing, today
                  </p>
                </div>
              )}
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
