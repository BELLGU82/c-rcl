
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.problem': 'Problem & Solution',
    'nav.tech': 'Technology',
    'nav.market': 'Market',
    'nav.business': 'Business Model',
    'language': 'עברית',
    
    // Section 1
    'section1.title': 'C-rcl - Multi-Agent AI System for Dementia Care',
    'section1.subtitle': 'Connecting advanced technology with accessible and compassionate human care',
    'section1.story.title': 'Our Story',
    'section1.story.content': 'It all started with Grandma Jacqueline. Despite having three caregivers, my family was drowning in uncertainty, stress, and emotional burnout. We never knew if she received her medications on time, if appointments were missed, or if urgent changes occurred in her condition—and who was even supposed to know about them. There was no smart system to centralize, coordinate, and respond in real-time to her needs. That\'s why I created C-rcl—a groundbreaking multi-agent AI system, built specifically for the real-life challenges of dementia care.',
    'section1.who.title': 'Who Am I?',
    'section1.who.content': 'Hi, I\'m Bell—a technology entrepreneur and product strategist. I come with personal experience caring for a family member with dementia, and a deep understanding of the challenges on the ground. I am driven by a mission to bridge advanced technology with accessible, compassionate human care. C-rcl was born from my family\'s pain—but it\'s designed to change the reality for many other families.',

    // Section 2
    'section2.title': 'Broken Care Circle',
    'section2.problem.title': 'The Problem',
    'section2.problem.content': 'People with dementia are surrounded by a complex care circle—families, caregivers, doctors, specialists. But vital information doesn\'t flow. Critical data from home doesn\'t reach doctors in time. Medical guidelines don\'t translate into action. Lack of coordination between caregivers leads to mistakes. And the patient? Often can\'t report for themselves. The result: burden, burnout, wrong decisions, and suboptimal care—at a painful cost of quality of life, money, and resources.',
    'section2.solution.title': 'C-rcl – An Orchestra of AI Agents',
    'section2.solution.content': 'Instead of one monolithic system, C-rcl is a multi-agent ecosystem. Each agent specializes in one aspect of care and works together with other agents through a shared central repository:',
    'section2.solution.agent1': 'Monitoring Agent – monitors real-time data from the field',
    'section2.solution.agent2': 'Cognitive Agent – identifies cognitive changes and adapts personal exercises',
    'section2.solution.agent3': 'Emotional Agent – tracks moods and responds accordingly',
    'section2.solution.conclusion': 'The system enables complete care management – physical, emotional, cognitive, and safety – under one roof.',

    // Section 3
    'section3.title': 'Advantage: Flexibility, Accuracy, and Reliability',
    'section3.advantages.title': 'System Advantages',
    'section3.advantages.point1': 'Each agent focuses and specializes in its domain',
    'section3.advantages.point2': 'Agents can be added or upgraded as needed',
    'section3.advantages.point3': 'The system continues to operate even if some modules fail',
    'section3.advantages.point4': 'Adapts to changing needs in real-time',
    'section3.advantages.conclusion': 'This is the first system to combine monitoring, coordination, and tailored care – in an integrative and scalable way.',
    'section3.value.title': 'Value by Audience',
    'section3.value.families': 'Families: Less burden, less anxiety, more control',
    'section3.value.doctors': 'Doctors: More accurate decisions based on data',
    'section3.value.patients': 'Patients: Quality of life, independence, and dignity over time',

    // Section 4
    'section4.title': 'Market & Opportunity',
    'section4.market.title': 'Market Data',
    'section4.market.point1': 'Dementia market: $18.03B in 2024, expected to reach $50B by 2030',
    'section4.market.point2': 'Dementia technology market: $23B with CAGR of 16.8%',
    'section4.market.point3': 'AI for medicine market: annual growth of 42%',
    'section4.market.point4': 'Global cost of dementia: $1.3 trillion, expected to double by 2030',
    'section4.market.conclusion': 'If the dementia economy were a country – it would be the 14th largest in the world.',
    'section4.business.title': 'Business Model',
    'section4.business.model1': 'B2C – Families caring for their loved ones at home',
    'section4.business.model2': 'B2B – Care institutions, health funds, healthcare systems, insurance companies',
    'section4.business.model3': 'B2B2C – Partners providing services to families',
    'section4.business.model4': 'B2G – Business to government and public authorities',
    'section4.business.conclusion': 'Each model is built on high ROI and proven savings in care costs.',

    // Section 5
    'section5.title': 'Economic Value',
    'section5.savings.title': 'Savings Data',
    'section5.savings.point1': '$10,000+ savings for each hospitalization avoided',
    'section5.savings.point2': '$60,000+ savings per patient per year',
    'section5.savings.point3': '$10,000–$30,000 savings per family per year',
    'section5.savings.point4': 'Potential ROI in less than 6 months',
    'section5.competitors.title': 'Competitors and Differentiation',
    'section5.competitors.fragmented': 'The market is fragmented – most solutions focus on a single aspect:',
    'section5.competitors.comp1': 'SafelyYou: Fall prevention',
    'section5.competitors.comp2': 'MyndYou: Voice analysis',
    'section5.competitors.comp3': 'ElliQ: Social robot',
    'section5.competitors.different': 'C-rcl is fundamentally different:',
    'section5.competitors.diff1': 'Holistic system',
    'section5.competitors.diff2': 'Unique agent architecture (MAS)',
    'section5.competitors.diff3': 'Dynamic adaptation, connectivity, information synchronization',
    'section5.competitors.diff4': 'Combination of technology and care intuition',
    'section5.status.title': 'Status and Milestones',
    'section5.status.current': 'Currently in Pre-Seed stage, with significant progress:',
    'section5.status.progress1': '✔ Market research',
    'section5.status.progress2': '✔ MAS architecture planning',
    'section5.status.progress3': '✔ Initial proof of concept',
    'section5.status.next': 'What\'s next?',
    'section5.status.next1': 'Recruit core team',
    'section5.status.next2': 'Develop MVP within 6–9 months',
    'section5.status.next3': 'First pilots within 12 months',
    'section5.status.next4': 'Market entry and growth',
    'section5.timeline.title': 'Timeline',
    'section5.timeline.stage1': 'Pre-Seed ✅',
    'section5.timeline.stage1.points': 'Market Research, Architecture Design, Proof of Concept',
    'section5.timeline.stage2': 'Seed | 0–6 months 🔜',
    'section5.timeline.stage2.points': 'MVP, Recruitment, Infrastructure',
    'section5.timeline.stage3': 'Validation | 6–12 months 🔜',
    'section5.timeline.stage3.points': 'Pilots, User testing, Product improvement',
    'section5.timeline.stage4': 'Growth | 12+ months 🔜',
    'section5.timeline.stage4.points': 'Market entry, Scale, Series A fundraising',
    'section5.cta.quote': '"Better is possible. It does not take genius. It takes diligence. It takes moral clarity. It takes ingenuity. And above all, it takes a willingness to try."',
    'section5.cta.author': '– Atul Gawande',
    'section5.cta.conclusion': 'With the support of the right community, partners, and investors – we can change the reality for millions of people.',
    'section5.contact.name': 'Bell',
    'section5.contact.phone': '📞 054-9411621',
    'section5.contact.email': '📧 digitalifec@gmail.com',

    // Chat
    'chat.title': 'Ask about C-rcl',
    'chat.placeholder': 'Type your question here...',
    'chat.send': 'Send',
    'chat.suggested': 'Suggested questions:',
    'chat.question1': 'How does C-rcl help caregivers?',
    'chat.question2': 'What makes C-rcl unique?',
    'chat.question3': 'How does the multi-agent system work?',
    'chat.question4': 'What\'s the business model?',
    'chat.loading': 'Thinking...',
  },
  he: {
    // Header
    'nav.home': 'ראשי',
    'nav.problem': 'בעיה ופתרון',
    'nav.tech': 'טכנולוגיה',
    'nav.market': 'שוק',
    'nav.business': 'מודל עסקי',
    'language': 'English',
    
    // Section 1
    'section1.title': 'C-rcl - מערכת AI רב-סוכנית לטיפול בדמנציה',
    'section1.subtitle': 'מחברים בין טכנולוגיה מתקדמת לטיפול אנושי, נגיש ומלא חמלה',
    'section1.story.title': 'הסיפור שלנו',
    'section1.story.content': 'הכול התחיל מסבתא ז\'קלין. למרות שיש לסבתא ז\'קלין שלוש מטפלות, המשפחה שלי טבעה באי־ודאות, מתח ושחיקה רגשית. אף פעם לא ידענו אם היא קיבלה את התרופות בזמן, אם תורים התפספסו, או אם חלו שינויים דחופים במצבה — ומי בכלל אמור היה לדעת עליהם. לא הייתה מערכת חכמה שמרכזת, מתאמת ומגיבה בזמן אמת לצרכים שלה. לכן יצרתי את C-rcl – מערכת AI רב־סוכנית פורצת דרך, שנבנתה במיוחד עבור אתגרי החיים האמיתיים של טיפול בדמנציה.',
    'section1.who.title': 'מי אני?',
    'section1.who.content': 'היי, אני בל — יזמת טכנולוגיה ואסטרטגית מוצר. אני מגיעה עם ניסיון אישי של טיפול בקרוב משפחה עם דמנציה, ועם הבנה עמוקה של המצוקות בשטח. אני חדורת שליחות לגשר בין טכנולוגיה מתקדמת לבין טיפול אנושי, נגיש ומלא חמלה. C-rcl נולד מתוך הכאב של המשפחה שלי — אבל הוא נועד לשנות את המציאות של משפחות רבות אחרות.',

    // Section 2
    'section2.title': 'מעגל טיפול שבור',
    'section2.problem.title': 'הבעיה',
    'section2.problem.content': 'אנשים עם דמנציה מוקפים במעגל טיפולי מורכב — משפחות, מטפלים, רופאים, מומחים. אבל המידע החיוני לא זורם. נתונים קריטיים מהבית לא מגיעים לרופאים בזמן. הנחיות רפואיות לא מתורגמות לפעולה. חוסר תיאום בין מטפלים מוביל לטעויות. והמטופל? לרוב לא יכול לדווח בעצמו. התוצאה: עומס, שחיקה, החלטות שגויות וטיפול לא מיטבי — במחיר כואב של איכות חיים, כסף ומשאבים.',
    'section2.solution.title': 'C-rcl – תזמורת של סוכני AI',
    'section2.solution.content': 'במקום מערכת מונוליטית אחת, C-rcl היא אקוסיסטם רב-סוכני. כל סוכן מתמחה בהיבט אחר של הטיפול ופועל יחד עם שאר הסוכנים דרך מאגר מרכזי משותף:',
    'section2.solution.agent1': 'סוכן ניטור – מנטר נתונים מהשטח בזמן אמת',
    'section2.solution.agent2': 'סוכן קוגניטיבי – מזהה שינויים קוגניטיביים ומתאים תרגול אישי',
    'section2.solution.agent3': 'סוכן רגשי – עוקב אחרי מצבי רוח ומגיב בהתאם',
    'section2.solution.conclusion': 'המערכת מאפשרת ניהול טיפול שלם – פיזי, רגשי, קוגניטיבי ובטיחותי – תחת קורת גג אחת.',

    // Section 3
    'section3.title': 'היתרון: גמישות, דיוק ואמינות',
    'section3.advantages.title': 'יתרונות המערכת',
    'section3.advantages.point1': 'כל סוכן מתמקד בתחומו ומתמחה בו לעומק',
    'section3.advantages.point2': 'אפשר להוסיף או לשדרג סוכנים לפי הצורך',
    'section3.advantages.point3': 'המערכת ממשיכה לפעול גם אם חלק מהמודולים נופלים',
    'section3.advantages.point4': 'הסתגלות לצרכים משתנים בזמן אמת',
    'section3.advantages.conclusion': 'זוהי המערכת הראשונה שמשלבת ניטור, תיאום וטיפול מותאם – באופן אינטגרטיבי וסקיילבילי.',
    'section3.value.title': 'ערך לפי קהלים',
    'section3.value.families': 'משפחות: פחות עומס, פחות חרדה, יותר שליטה',
    'section3.value.doctors': 'רופאים: החלטות מדויקות יותר על בסיס דאטה',
    'section3.value.patients': 'חולים: איכות חיים, עצמאות וכבוד לאורך זמן',

    // Section 4
    'section4.title': 'שוק והזדמנות',
    'section4.market.title': 'נתוני שוק',
    'section4.market.point1': 'שוק הדמנציה: $18.03B ב־2024, צפוי להגיע ל־$50B עד 2030',
    'section4.market.point2': 'שוק הטכנולוגיה לדמנציה: $23B עם CAGR של 16.8%',
    'section4.market.point3': 'שוק ה-AI לרפואה: גידול שנתי של 42%',
    'section4.market.point4': 'עלות עולמית של דמנציה: $1.3 טריליון, צפויה להכפיל עצמה עד 2030',
    'section4.market.conclusion': 'אם כלכלת הדמנציה הייתה מדינה – היא הייתה ה-14 בגודלה בעולם.',
    'section4.business.title': 'מודל עסקי',
    'section4.business.model1': 'B2C – משפחות המטפלות ביקיריהן בבית',
    'section4.business.model2': 'B2B – מוסדות טיפול, קופות חולים, מערכות בריאות, חברות ביטוח',
    'section4.business.model3': 'B2B2C – שותפים מספקי שירותים למשפחות',
    'section4.business.model4': 'B2G – ביזנס לממשלה ולרשויות ציבוריות',
    'section4.business.conclusion': 'כל מודל בנוי על החזר השקעה גבוה וחיסכון מוכח בעלויות טיפול.',

    // Section 5
    'section5.title': 'ערך כלכלי',
    'section5.savings.title': 'נתוני חיסכון',
    'section5.savings.point1': '$10,000+ חיסכון לכל אשפוז שנמנע',
    'section5.savings.point2': '$60,000+ חיסכון למטופל בשנה',
    'section5.savings.point3': '$10,000–$30,000 חיסכון למשפחה בשנה',
    'section5.savings.point4': 'החזר השקעה פוטנציאלי תוך פחות מ־6 חודשים',
    'section5.competitors.title': 'מתחרים ובידול',
    'section5.competitors.fragmented': 'השוק פרגמנטלי – רוב הפתרונות מתמקדים באספקט בודד:',
    'section5.competitors.comp1': 'SafelyYou: מניעת נפילות',
    'section5.competitors.comp2': 'MyndYou: ניתוח קולי',
    'section5.competitors.comp3': 'ElliQ: רובוט חברתי',
    'section5.competitors.different': 'C-rcl שונה מהיסוד:',
    'section5.competitors.diff1': 'מערכת הוליסטית',
    'section5.competitors.diff2': 'ארכיטקטורת סוכנים ייחודית (MAS)',
    'section5.competitors.diff3': 'התאמה דינמית, קישוריות, סנכרון מידע',
    'section5.competitors.diff4': 'שילוב בין טכנולוגיה לבין אינטואיציה טיפולית',
    'section5.status.title': 'סטטוס ואבני דרך',
    'section5.status.current': 'כרגע בשלב Pre-Seed, עם התקדמות משמעותית:',
    'section5.status.progress1': '✔ מחקר שוק',
    'section5.status.progress2': '✔ תכנון ארכיטקטורת MAS',
    'section5.status.progress3': '✔ הוכחת התכנות ראשונית',
    'section5.status.next': 'מה הלאה?',
    'section5.status.next1': 'גיוס צוות מפתח',
    'section5.status.next2': 'פיתוח MVP תוך 6–9 חודשים',
    'section5.status.next3': 'פיילוטים ראשונים תוך 12 חודשים',
    'section5.status.next4': 'כניסה לשוק וצמיחה',
    'section5.timeline.title': 'ציר זמן',
    'section5.timeline.stage1': 'Pre-Seed ✅',
    'section5.timeline.stage1.points': 'מחקר שוק, תכנון ארכיטקטורה, הוכחת התכנות',
    'section5.timeline.stage2': 'Seed | 0–6 חודשים 🔜',
    'section5.timeline.stage2.points': 'MVP, גיוס, תשתית',
    'section5.timeline.stage3': 'Validation | 6–12 חודשים 🔜',
    'section5.timeline.stage3.points': 'פיילוטים, בדיקות משתמשים, שיפור מוצר',
    'section5.timeline.stage4': 'Growth | 12+ חודשים 🔜',
    'section5.timeline.stage4.points': 'כניסה לשוק, סקייל, גיוס Series A',
    'section5.cta.quote': '"Better is possible. It does not take genius. It takes diligence. It takes moral clarity. It takes ingenuity. And above all, it takes a willingness to try."',
    'section5.cta.author': '– Atul Gawande',
    'section5.cta.conclusion': 'עם התמיכה של הקהילה, השותפים והמשקיעים הנכונים – נוכל לשנות את המציאות עבור מיליוני אנשים.',
    'section5.contact.name': 'בל',
    'section5.contact.phone': '📞 054-9411621',
    'section5.contact.email': '📧 digitalifec@gmail.com',

    // Chat
    'chat.title': 'שאל על C-rcl',
    'chat.placeholder': 'הקלד את שאלתך כאן...',
    'chat.send': 'שלח',
    'chat.suggested': 'שאלות מוצעות:',
    'chat.question1': 'איך C-rcl עוזרת למטפלים?',
    'chat.question2': 'מה הופך את C-rcl לייחודית?',
    'chat.question3': 'איך עובדת מערכת רב-סוכנית?',
    'chat.question4': 'מהו המודל העסקי?',
    'chat.loading': 'חושב...',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  dir: 'ltr'
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div className={language === 'he' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
