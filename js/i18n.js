/* ============================================================
   i18n — Bilingual translation engine (English / Japanese)
   ============================================================ */
const i18n = (() => {
  const translations = {
    en: {
      // Meta
      'meta.title': 'Portfolio | Your Name',

      // Navigation
      'nav.logo':       'YN',
      'nav.about':      'About',
      'nav.skills':     'Skills',
      'nav.projects':   'Projects',
      'nav.experience': 'Experience',
      'nav.contact':    'Contact',

      // Hero
      'hero.greeting': "Hello, I'm",
      'hero.name':     'Your Name',
      'hero.title':    'Full Stack Developer',
      'hero.tagline':  'I craft elegant, high-performance web experiences that users love.',
      'hero.cta.work':    'View My Work',
      'hero.cta.contact': 'Get In Touch',
      'hero.scroll':      'Scroll down',
      'hero.photo.hint':  'Click or drag to upload photo',

      // About
      'about.label':    'Who I Am',
      'about.title':    'About Me',
      'about.bio1':     'I\'m a passionate full-stack developer with a strong foundation in building scalable web applications. I specialise in <em>JavaScript</em>, <em>React</em>, and <em>Node.js</em>, and I love turning complex problems into clean, elegant solutions.',
      'about.bio2':     'When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source projects, or enjoying a good book. I\'m currently <strong>open to new opportunities</strong> — let\'s build something great together.',
      'about.resume':   'Download Resume',
      'about.stat.years':    'Years Exp.',
      'about.stat.projects': 'Projects',
      'about.stat.commits':  'Commits',
      'about.stat.coffee':   'Coffees',

      // Skills
      'skills.label':         'What I Know',
      'skills.title':         'Skills & Technologies',
      'skills.cat.languages': 'Languages',
      'skills.cat.frameworks':'Frameworks & Libraries',
      'skills.cat.tools':     'Tools & Platforms',

      // Projects
      'projects.label':   'What I\'ve Built',
      'projects.title':   'Featured Projects',
      'projects.github':  'GitHub',
      'projects.live':    'Live Demo',
      'projects.p1.title':'E-Commerce Platform',
      'projects.p1.desc': 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features real-time inventory updates, Stripe payments, and an admin dashboard.',
      'projects.p2.title':'AI Chat Application',
      'projects.p2.desc': 'A real-time chat app powered by AI for smart replies and content moderation. Built with WebSockets, Express, and integrated with OpenAI API.',
      'projects.p3.title':'Task Management SaaS',
      'projects.p3.desc': 'A Kanban-style project management tool with team collaboration features, drag-and-drop interface, and Slack integration.',

      // Experience
      'experience.label': 'Where I\'ve Been',
      'experience.title': 'Experience',
      'exp.job1.date':    '2023 – Present',
      'exp.job1.role':    'Senior Software Engineer',
      'exp.job1.company': 'Tech Company Inc.',
      'exp.job1.desc':    'Led a team of 5 engineers to rebuild the core platform using React and Node.js, improving performance by 40%. Introduced CI/CD pipelines and reduced deployment time by 60%.',
      'exp.job2.date':    '2021 – 2023',
      'exp.job2.role':    'Software Developer',
      'exp.job2.company': 'Startup Studio',
      'exp.job2.desc':    'Built and maintained multiple client-facing web applications. Developed a real-time analytics dashboard used by 10,000+ daily active users.',
      'exp.edu1.date':    '2017 – 2021',
      'exp.edu1.role':    'B.Sc. Computer Science',
      'exp.edu1.company': 'University of Technology',
      'exp.edu1.desc':    'Graduated with First Class Honours. Focused on algorithms, distributed systems, and human-computer interaction. Thesis on ML-based code optimisation.',

      // Contact
      'contact.label':   'Say Hello',
      'contact.title':   'Get In Touch',
      'contact.intro':   "I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing. My inbox is always open!",
      'contact.email.label':   'Email me at',
      'contact.name':          'Name',
      'contact.name.ph':       'Jane Doe',
      'contact.email':         'Email',
      'contact.email.ph':      'jane@example.com',
      'contact.message':       'Message',
      'contact.message.ph':    'Tell me about your project...',
      'contact.send':          'Send Message',
      'contact.success':       "Message sent! I'll get back to you soon.",
      'contact.error.name':    'Please enter your name.',
      'contact.error.email':   'Please enter a valid email address.',
      'contact.error.message': 'Please enter a message.',

      // Footer
      'footer.copy': '© 2026 Your Name. All rights reserved.',
      'footer.top':  'Back to Top',
    },

    ja: {
      // Meta
      'meta.title': 'ポートフォリオ | お名前',

      // Navigation
      'nav.logo':       'YN',
      'nav.about':      '自己紹介',
      'nav.skills':     'スキル',
      'nav.projects':   'プロジェクト',
      'nav.experience': '職歴',
      'nav.contact':    'お問い合わせ',

      // Hero
      'hero.greeting': 'はじめまして、',
      'hero.name':     'お名前',
      'hero.title':    'フルスタック開発者',
      'hero.tagline':  'ユーザーに愛される、エレガントで高性能なウェブ体験を作ります。',
      'hero.cta.work':    '作品を見る',
      'hero.cta.contact': 'お問い合わせ',
      'hero.scroll':      'スクロール',
      'hero.photo.hint':  'クリックまたはドラッグして写真をアップロード',

      // About
      'about.label':    '自己紹介',
      'about.title':    '私について',
      'about.bio1':     'スケーラブルなウェブアプリケーション構築に強みを持つ、情熱的なフルスタック開発者です。<em>JavaScript</em>、<em>React</em>、<em>Node.js</em>を専門とし、複雑な問題をクリーンでエレガントなソリューションに変えることが得意です。',
      'about.bio2':     'コーディング以外では、新しい技術の探求、オープンソースプロジェクトへの貢献、または読書を楽しんでいます。現在、<strong>新しい機会を積極的に探しています</strong> — 一緒に素晴らしいものを作りましょう！',
      'about.resume':   '履歴書をダウンロード',
      'about.stat.years':    '年の経験',
      'about.stat.projects': 'プロジェクト',
      'about.stat.commits':  'コミット',
      'about.stat.coffee':   'コーヒー',

      // Skills
      'skills.label':         '技術スタック',
      'skills.title':         'スキルと技術',
      'skills.cat.languages': 'プログラミング言語',
      'skills.cat.frameworks':'フレームワーク・ライブラリ',
      'skills.cat.tools':     'ツール・プラットフォーム',

      // Projects
      'projects.label':   '制作物',
      'projects.title':   '主なプロジェクト',
      'projects.github':  'GitHub',
      'projects.live':    'ライブデモ',
      'projects.p1.title':'ECプラットフォーム',
      'projects.p1.desc': 'React、Node.js、PostgreSQLを使用したフルスタックECソリューション。リアルタイム在庫更新、Stripe決済、管理ダッシュボードを実装。',
      'projects.p2.title':'AIチャットアプリ',
      'projects.p2.desc': 'スマートな返信とコンテンツモデレーション向けAI搭載のリアルタイムチャットアプリ。WebSocket、Express、OpenAI APIを使用。',
      'projects.p3.title':'タスク管理SaaS',
      'projects.p3.desc': 'カンバン方式のプロジェクト管理ツール。チームコラボレーション機能、ドラッグ＆ドロップインターフェース、Slack連携を搭載。',

      // Experience
      'experience.label': '職歴',
      'experience.title': '職歴・学歴',
      'exp.job1.date':    '2023年 – 現在',
      'exp.job1.role':    'シニアソフトウェアエンジニア',
      'exp.job1.company': '株式会社テック',
      'exp.job1.desc':    'ReactとNode.jsを使用したコアプラットフォームの再構築を5名のエンジニアチームでリード。パフォーマンスを40%向上。CI/CDパイプラインを導入し、デプロイ時間を60%短縮。',
      'exp.job2.date':    '2021年 – 2023年',
      'exp.job2.role':    'ソフトウェアエンジニア',
      'exp.job2.company': 'スタートアップスタジオ',
      'exp.job2.desc':    '複数のクライアント向けウェブアプリケーションを構築・保守。1日1万人以上のアクティブユーザーが利用するリアルタイム分析ダッシュボードを開発。',
      'exp.edu1.date':    '2017年 – 2021年',
      'exp.edu1.role':    'コンピュータサイエンス学士',
      'exp.edu1.company': '工科大学',
      'exp.edu1.desc':    '最優秀の成績で卒業。アルゴリズム、分散システム、ヒューマンコンピュータインタラクションを専攻。ML活用コード最適化の論文を執筆。',

      // Contact
      'contact.label':   'ご連絡',
      'contact.title':   'お問い合わせ',
      'contact.intro':   '新しいプロジェクト、クリエイティブなアイデア、素晴らしい機会について、いつでもお気軽にご連絡ください。受信トレイは常にオープンです！',
      'contact.email.label':   'メールはこちら',
      'contact.name':          'お名前',
      'contact.name.ph':       '山田 花子',
      'contact.email':         'メールアドレス',
      'contact.email.ph':      'hanako@example.com',
      'contact.message':       'メッセージ',
      'contact.message.ph':    'プロジェクトについて教えてください...',
      'contact.send':          '送信する',
      'contact.success':       'メッセージを送信しました！近日中にご連絡します。',
      'contact.error.name':    'お名前を入力してください。',
      'contact.error.email':   '有効なメールアドレスを入力してください。',
      'contact.error.message': 'メッセージを入力してください。',

      // Footer
      'footer.copy': '© 2026 お名前. All rights reserved.',
      'footer.top':  'トップへ戻る',
    }
  };

  let currentLang = localStorage.getItem('portfolio-lang') || 'en';

  /** Get a translation string */
  function t(key) {
    return translations[currentLang][key] ?? translations.en[key] ?? key;
  }

  /** Apply all translations to the DOM */
  function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key  = el.getAttribute('data-i18n');
      const text = t(key);
      // Allow inline HTML tags (em, strong) in bio paragraphs
      if (el.dataset.i18nHtml === 'true') {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-ph'));
    });

    // Page title
    document.title = t('meta.title');

    // Lang toggle label
    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = currentLang === 'en' ? '日本語' : 'English';
  }

  /** Toggle between EN and JA */
  function toggle() {
    currentLang = currentLang === 'en' ? 'ja' : 'en';
    localStorage.setItem('portfolio-lang', currentLang);
    applyTranslations();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
  }

  function init() {
    applyTranslations();
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, t, getCurrentLang: () => currentLang };
})();
