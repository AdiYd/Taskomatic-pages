export const SITE_NAME = "Taskomatic"
export const SITE_URL = "https://taskomatic.net"
export const SITE_DESCRIPTION = "פתרון ניהול משימות חכם ויעיל"

export const NAV_LINKS = [
  { label: "בעיתון", href: "#features" },
  { label: "תכניות", href: "#pricing" },
  { label: "שאלות נפוצות", href: "#faq" },
  { label: "צור קשר", href: "#contact" },
]

export const HERO_SECTION = {
  title: "ניהול משימות חכם עבור כולם",
  subtitle: "הפכו את תפקידכם ליעיל עם Taskomatic - הכלי המושלם לניהול משימות",
  cta: "התחל בחינם",
  cta_secondary: "צפה בהדגמה",
}

export const FEATURES_SECTION = {
  title: "המאפיינים שלנו",
  subtitle: "כל מה שצריך לך לניהול משימות יעיל",
  features: [
    {
      title: "ריאיון קל",
      description: "ממשק אינטואיטיבי שכל אחד יכול להשתמש בו ללא הדרכה",
      icon: "⚡",
    },
    {
      title: "שיתוף פעולה",
      description: "עבדו בצוות בזמן אמת עם עדכונים מיידיים",
      icon: "👥",
    },
    {
      title: "אוטומציה חכמה",
      description: "אוטומציה של משימות חוזרות וחסכו זמן יקר",
      icon: "🤖",
    },
    {
      title: "ניתוח מעמיק",
      description: "קבלו תובנות על התקדמותכם עם ניתוח מפורט",
      icon: "📊",
    },
    {
      title: "אינטגרציות",
      description: "התחברו לכלים האחרים שלכם בהצלחה",
      icon: "🔗",
    },
    {
      title: "אבטחה",
      description: "הנתונים שלכם מוגנים בתקן אבטחה הגבוה ביותר",
      icon: "🔒",
    },
  ],
}

export const PRICING_SECTION = {
  title: "תוכניות התמחור שלנו",
  subtitle: "בחרו את התוכנית המושלמת עבור הצרכים שלכם",
  plans: [
    {
      name: "בסיסי",
      price: "₪0",
      period: "חינם לתמיד",
      description: "עבור משתמשים בודדים",
      features: [
        "עד 100 משימות",
        "אחסון בענן בסיסי",
        "תמיכה בקהילה",
      ],
      cta: "התחל עכשיו",
      highlighted: false,
    },
    {
      name: "מקצועי",
      price: "₪99",
      period: "לחודש",
      description: "עבור צוויות קטנות",
      features: [
        "משימות בלתי מוגבלות",
        "אחסון בענן ללא הגבלה",
        "שיתוף פעולה בצוות",
        "תמיכה בדוא״ל",
      ],
      cta: "נסה בחינם",
      highlighted: true,
    },
    {
      name: "ארגוני",
      price: "צור קשר",
      period: "מחיר מותאם",
      description: "לארגונים גדולים",
      features: [
        "כל מה בתוכנית מקצועית",
        "SSO ודוקומנטציה ייעודית",
        "ניתוח מתקדם",
        "תמיכה בעדיפות גבוהה",
      ],
      cta: "צור קשר",
      highlighted: false,
    },
  ],
}

export const TESTIMONIALS_SECTION = {
  title: "מה אומרים לנו הלקוחות",
  subtitle: "אלפי משתמשים בעולם אוהבים את Taskomatic",
  testimonials: [
    {
      quote: "Taskomatic שינה את דרך הניהול של הצוות שלי. הוא פשוט, יעיל ויחסוך זמן יקר",
      author: "ירון כהן",
      role: "מנהל פרויקטים",
      company: "Tech Startup",
    },
    {
      quote: "חיפשנו פתרון לשנים ו-Taskomatic זה בדיוק מה שהתחננו",
      author: "שרה לוי",
      role: "מנהלת תפעול",
      company: "Creative Agency",
    },
    {
      quote: "הממשק כל כך טוב שהצוות שלי התחיל להשתמש בו מיד ללא הכשרה",
      author: "דוד רוזן",
      role: "CTO",
      company: "Enterprise Solutions",
    },
  ],
}

export const FAQ_SECTION = {
  title: "שאלות נפוצות",
  subtitle: "מצא תשובות לשאלות הנפוצות ביותר",
  faqs: [
    {
      question: "האם Taskomatic בחינם?",
      answer: "כן! התוכנית הבסיסית שלנו בחינם לתמיד. אנו גם מציעים תוכניות בתשלום עם מאפיינים נוספים.",
    },
    {
      question: "האם אני יכול לשתף משימות עם הצוות שלי?",
      answer: "בהחלט! כל התוכניות שלנו (אפילו החינמית) תומכות בשיתוף פעולה בצוות בזמן אמת.",
    },
    {
      question: "כמה משימות אני יכול ליצור?",
      answer: "בתוכנית הבסיסית, מוגבל ל-100 משימות. בתוכניות משלמות - בלתי מוגבל.",
    },
    {
      question: "האם הנתונים שלי בטוחים?",
      answer: "כן! אנו משתמשים בהצפנה ברמת סטנדרט תעשיתית ותא הנתונים שלנו עומד בתקנים בינלאומיים.",
    },
    {
      question: "האם אתם מציעים תמיכה בעברית?",
      answer: "כן בהחלט! המערכת שלנו באה גם בעברית, וקבוצת התמיכה שלנו מדברת עברית בשטף.",
    },
    {
      question: "אני יכול לייצא את הנתונים שלי?",
      answer: "כן, אתה יכול לייצא את כל הנתונים שלך בכל זמן בפורמט CSV או JSON.",
    },
  ],
}

export const CTA_SECTION = {
  title: "מוכנים להתחיל?",
  subtitle: "הצטרפו לאלפים של משתמשים מרוצים כיום",
  cta: "התחל בחינם - לא נדרשת כרטיס אשראי",
}

export const FOOTER = {
  description: "Taskomatic - פתרון ניהול משימות חכם עבור כל הצוויות",
  links: [
    { label: "בעיתון", href: "#" },
    { label: "תכניות", href: "#" },
    { label: "בלוג", href: "#" },
    { label: "מדיניות הפרטיות", href: "#" },
    { label: "תנאי השימוש", href: "#" },
  ],
  social: [
    { label: "Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
}
