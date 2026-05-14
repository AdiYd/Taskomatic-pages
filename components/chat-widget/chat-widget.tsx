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
      '👋 שלום! אני העוזר הדיגיטלי של Taskomatic - פלטפורמת השיווק הדיגיטלי מונעת AI.\n\n🚀 **המוצרים שלנו:**\n• Adomatic - קמפיינים ממומנים חכמים\n• Postomatic - פרסום אורגני אוטומטי\n• Creative AI - יצירת קריאייטיבים ותוכן\n• דפי נחיתה ממירים\n• סוכן WhatsApp AI\n\nעל מה תרצה לשמוע?',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'Adomatic - מודעות ממומנות', targetId: 'adomatic' },
      { label: 'Postomatic - פרסום אורגני', targetId: 'postomatic' },
      { label: 'יצירת קריאייטיבים AI', targetId: 'creative-ai' },
      { label: 'איך מתחילים?', targetId: 'getting-started' },
    ],
  },
  adomatic: {
    id: 'adomatic',
    content:
      '🎯 **Adomatic** - ניהול מודעות ממומנות חכם\n\n**מה זה עושה:**\n• הקמת תיק עסקי ויצירה של קמפיינים ב-Meta Ads\n• אופטימיזציה בזמן אמת של תקציב וביצועים\n• יצירת תוכן וקריאייטיבים מעולים עם AI\n• ניתוח מתקדם ותובנות פעולה\n\n💡 מנהל שיווק דיגיטלי שעובד 24/7 - מזהה הזדמנויות, מאפטם קמפיינים ומביא תוצאות.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'ספר על הפלטפורמה המלאה', targetId: 'platform-overview' },
      { label: 'איך ה-AI מאפטם?', targetId: 'ai-technology' },
      { label: 'בוא נתחיל', targetId: 'getting-started' },
    ],
  },
  postomatic: {
    id: 'postomatic',
    content:
      '📱 **Postomatic** - פרסום אורגני אוטומטי\n\n**מה זה עושה:**\n• פרסום בעשרות קבוצות Facebook שלכם\n• פרסום תכנים (פוסטים, סטורי ורילז) בעמודי סושיאל של העסק (Meta API)\n• מקבלים ל-WhatsApp המלצות לתכנים מידי יום\n• AI יוצר תוכן ייחודי מותאם לעסק\n• תזמון חכם וניהול קמפיינים שבועיים\n• תוסף Chrome מתקדם לפרסום קל\n\n💡 במקום לפרסם ידנית בכל קבוצה - ה-AI מבין את העסק שלך, יוצר תוכן איכותי ומפרסם אוטומטית.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'ספר על Creative AI', targetId: 'creative-ai' },
      { label: 'מה עוד יש בפלטפורמה?', targetId: 'platform-overview' },
      { label: 'איך מתחילים?', targetId: 'getting-started' },
    ],
  },
  'creative-ai': {
    id: 'creative-ai',
    content:
      '🎨 **Creative AI** - יצירת קריאייטיבים מקצועיים\n\n**מה המערכת יוצרת:**\n• באנרים ומודעות לכל הפלטפורמות\n• אווטרים עסקיים ייחודיים\n• קריאייטיבים למדיה חברתית\n• תוכן שיווקי מותאם\n\n💡 **הטכנולוגיה:**\nשימוש במודלי AI מתקדמים (OpenAI, Gemini, Anthropic) ו Promt Engineering ליצירת עיצובים ברמה מקצועית שממירים ומוכרים.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'ספר על דפי נחיתה', targetId: 'landing-pages' },
      { label: 'מה עוד יש?', targetId: 'platform-overview' },
      { label: 'בוא נתחיל', targetId: 'getting-started' },
    ],
  },
  'landing-pages': {
    id: 'landing-pages',
    content:
      '🌐 **דפי נחיתה ממירים** - הופך מבקרים ללקוחות\n\n**מה כלול:**\n• יצירת דפי נחיתה עם AI בדקות\n• עיצובים מקצועיים מותאמים למובייל\n• טפסי לידים מובנים\n• אינטגרציית Pixel למעקב\n• ניתוח ביצועים בזמן אמת\n\n💡 ה-AI לומד את העסק שלך ויוצר דף ממיר עם תוכן משכנע וקריאות לפעולה אפקטיביות.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'ספר על WhatsApp AI', targetId: 'whatsapp-ai' },
      { label: 'איך הכל עובד ביחד?', targetId: 'platform-overview' },
      { label: 'בוא נתחיל', targetId: 'getting-started' },
    ],
  },
  'whatsapp-ai': {
    id: 'whatsapp-ai',
    content:
      '💬 **סוכן WhatsApp AI** - שירות לקוחות חכם 24/7\n\n**מה הסוכן עושה:**\n• משוחח עם לקוחות באופן טבעי\n• מחמם לידים ומכין אותם למכירה\n• עונה על שאלות נפוצות מיידית\n• מסנן ומתייג שיחות אוטומטית\n• מעביר שיחות חשובות למענה ידני\n\n💡 שימוש במודלי AI מתקדמים (GPT, Claude, Gemini) להבנה מדויקת של צרכי הלקוח וזיהוי הזדמנויות מכירה.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'איך הכל עובד ביחד?', targetId: 'platform-overview' },
      { label: 'ספר על הטכנולוגיה', targetId: 'ai-technology' },
      { label: 'בוא נתחיל', targetId: 'getting-started' },
    ],
  },
  'platform-overview': {
    id: 'platform-overview',
    content:
      '🌟 **Taskomatic Platform** - פתרון שיווק מלא\n\n**5 מנועים בפלטפורמה אחת:**\n\n1️⃣ **Adomatic** - קמפיינים ממומנים\n2️⃣ **Postomatic** - פרסום אורגני\n3️⃣ **Creative AI** - יצירת תוכן וקריאייטיבים\n4️⃣ **דפי נחיתה** - המרת מבקרים ללקוחות\n5️⃣ **WhatsApp AI** - שירות לקוחות חכם\n\n✨ **האינטגרציה:**\nכל המערכות עובדות ביחד - AI יוצר קריאייטיבים, הפרסום מוביל לדף נחיתה, השאלות מתנהלות ב-WhatsApp, וה-AI לומד ומשתפר באופן מתמיד.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'איך ה-AI עובד?', targetId: 'ai-technology' },
      { label: 'בוא נתחיל', targetId: 'getting-started' },
    ],
  },
  'ai-technology': {
    id: 'ai-technology',
    content:
      '🧠 **הטכנולוגיה שלנו** - AI שלומד ומשתפר\n\n**איך זה עובד:**\n\n**1. למידה** 📚\nאתה מספר על העסק - ה-AI יוצר אסטרטגיית שיווק מותאמת\n\n**2. יצירה** ✨\n• תוכן שיווקי מקצועי\n• קריאייטיבים וגרפיקות\n• קופי משכנע\n• דפי נחיתה\n\n**3. אופטימיזציה** 📊\n• ניתוח ביצועים בזמן אמת\n• התאמת אסטרטגיה לפי תוצאות\n• הגדלת תקציב למה שעובד\n\n💡 שימוש במודלים מובילים (GPT, Claude, Gemini) - כל אחד מומחה במשימה שלו.',
    type: 'assistant',
    suggestedPrompts: [
      { label: 'מה היתרונות?', targetId: 'why-taskomatic' },
      { label: 'בוא נתחיל', targetId: 'getting-started' },
    ],
  },
  'why-taskomatic': {
    id: 'why-taskomatic',
    content:
      '💎 **למה Taskomatic?**\n\n✅ **הכל במקום אחד** - כל הכלים שצריך בפלטפורמה אחת\n✅ **AI שבאמת עובד** - התאמה אישית מלאה לעסק שלך\n✅ **אוטומציה מלאה** - המערכת עובדת 24/7\n✅ **תוצאות מדידות** - ניתוח מתקדם של כל דבר\n✅ **חיסכון משמעותי** - במקום סוכנויות יקרות\n\n🚀 יותר לידים, יותר מכירות, פחות זמן ומאמץ.',
    type: 'assistant',
    suggestedPrompts: [{ label: 'בוא נתחיל!', targetId: 'getting-started' }],
  },
  'getting-started': {
    id: 'getting-started',
    content:
      '🚀 **איך מתחילים?**\n\n**3 שלבים פשוטים:**\n\n**1️⃣ הרשמה ומילוי פרטים**\n• צור חשבון בקליק\n• ספר על העסק שלך\n• ה-AI יוצר אסטרטגיה\n\n**2️⃣ חיבור פלטפורמות**\n• Facebook/Instagram (אופציונלי)\n• תוסף Chrome לPostomatic\n• WhatsApp Business\n\n**3️⃣ התחל ליצור!** ✨\n• בחר קמפיינים\n• לחץ "התחל"\n• המערכת עושה את השאר\n\n⏱️ **זמן התקנה:** 10-15 דקות\n🎯 **תוצאות ראשונות:** תוך ימים ספורים',
    type: 'assistant',
    suggestedPrompts: [
      {
        label: 'בוא נדבר! 💬',
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

export function ChatbotWidget({ hideInput }: { hideInput?: boolean }) {
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
        title: 'שגיאה',
        description: 'השם חייב להכיל לפחות 2 תווים',
        variant: 'destructive',
      });
      return;
    }

    if (!phoneRegex.test(contactFormData.phone)) {
      toast({
        title: 'שגיאה',
        description: 'מספר טלפון חייב להתחיל ב-05 ולהכיל 10 ספרות',
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
        subject: 'טופס יצירת קשר חדש מ-Taskomatic Chat Widget',
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
            in_process: 'כן',
          });
          const url = `https://zek.co.il/crm/WebhookZEK.php?${params.toString()}`;
          await axios.post(url);
        } catch (_webhookError) {}
      }

      toast({
        title: 'הפרטים נשלחו בהצלחה!',
        description: 'תודה שפנית אלינו. נחזור אליך בהקדם האפשרי.',
        variant: 'success',
      });

      // Add success message to chat
      const successMessage: ChatMessage = {
        content:
          '✅ **תודה רבה!**\n\nהפרטים שלך נשלחו בהצלחה.\nנציג יצור איתך קשר בהקדם האפשרי! 🎉',
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, successMessage]);

      // Reset form
      setContactFormData({ name: '', phone: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'שגיאה בשליחת הפרטים',
        description: 'אירעה שגיאה במהלך שליחת הפרטים. אנא נסה שוב מאוחר יותר.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Render contact form JSX
  const renderContactForm = () => (
    <div className="space-y-3">
      <p className="text-sm font-semibold">🎉 מעולה! בוא נתחיל</p>
      <p className="text-xs text-muted-foreground">השאר פרטים ונחזור אליך בהקדם:</p>
      <form onSubmit={handleContactFormSubmit} className="space-y-3">
        <Input
          placeholder="שם מלא"
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
              <Loader2 className="h-4 w-4 animate-spin ml-2" />
              שולח...
            </>
          ) : (
            <>
              שלח פרטים
              <Icon className="rotate-180 mr-2" icon="famicons:send" width="1.2em" height="1.2em" />
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
          content: '🤔 לא בטוח שהבנתי... בוא ננסה שוב!\n\n' + defaultResponse.content,
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
        content: prompt?.label || 'המשך',
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
              שלום! 👋 אני כאן לעזור לך לגלות את עולם השיווק העתידי עם Taskomatic AI! 🚀
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
                  <p className="text-xs text-white opacity-90">השיווק העתידי כאן ועכשיו ✨</p>
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
              <ScrollArea className="flex-1 px-4 py-0 bg-amber-300/10 dark:bg-transparent whatsapp-bg">
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
                            message.type === 'user' ? 'whatsapp-sender' : 'whatsapp-receiver'
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
                                  className="w-full"
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
                      placeholder="הקלד הודעה..."
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
                    🚀 Taskomatic AI - השיווק החכם של המחר, היום
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
