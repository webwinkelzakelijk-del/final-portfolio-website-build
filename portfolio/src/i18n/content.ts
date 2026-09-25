export type Lang = "nl" | "en";

export const EMAIL = "webwinkelzakelijk@gmail.com";
export const FIVERR = "https://www.fiverr.com/s/NeBXK68";
export const SITE = "https://www.kevinrebuilds.com";

const nl = {
  lang: "nl" as Lang,
  locale: "nl_NL",
  meta: {
    title: "Kevin Rebuilds | Websites, webapps & automatisering op maat",
    description:
      "Ik ben Kevin. Ik ontwerp en bouw snelle websites, webapps en slimme automatiseringen voor ondernemers. Persoonlijk contact, van eerste idee tot livegang.",
  },
  skip: "Ga naar inhoud",
  nav: {
    label: "Hoofdnavigatie",
    items: [
      ["#diensten", "Diensten"],
      ["#werk", "Werk"],
      ["#werkwijze", "Werkwijze"],
      ["#over", "Over mij"],
      ["#faq", "Vragen"],
    ],
    cta: "Start je project",
    menu: "Menu",
    close: "Sluiten",
    langLabel: "Taal",
  },
  preloader: "Websites · Apps · Systemen",
  hero: {
    status: "Beschikbaar voor nieuwe projecten",
    lines: ["Ik bouw websites", "die klanten", "opleveren."],
    accentLine: 2,
    intro:
      "Hoi, ik ben Kevin. Ik ontwerp en bouw snelle websites, webapps en slimme automatiseringen voor ondernemers die willen groeien. Persoonlijk, eerlijk en tot in het kleinste detail.",
    primary: "Plan een kennismaking",
    secondary: "Bekijk mijn werk",
    scroll: "Scroll",
    location: "Drenthe, NL",
    tags: ["Webdesign", "Development", "Automatisering"],
  },
  marquee: [
    "Websites op maat",
    "Webapps",
    "Slimme systemen",
    "Snelle laadtijden",
    "SEO-basis",
    "Mobiel eerst",
    "Persoonlijk contact",
  ],
  statement:
    "Een goede website is geen visitekaartje. Het is je beste verkoper: altijd wakker, altijd scherp, en gebouwd om van bezoekers klanten te maken.",
  services: {
    eyebrow: "Wat ik voor je doe",
    title: ["Eén partner.", "Drie manieren om te groeien."],
    intro:
      "Je werkt rechtstreeks met mij. Geen accountmanagers, geen doorgeefluik. Ik denk mee over je doel en bouw wat daar echt bij past.",
    includesLabel: "Dit krijg je",
    items: [
      {
        no: "01",
        title: "Websites",
        lead: "Een website op maat die vertrouwen wekt en bezoekers omzet in aanvragen.",
        includes: [
          "Strategie & heldere structuur",
          "Uniek ontwerp, geen template",
          "Teksten die overtuigen",
          "Razendsnel & SEO-klaar",
          "Perfect op mobiel",
        ],
        tags: ["Bedrijfswebsite", "Landingspagina", "Webshop"],
      },
      {
        no: "02",
        title: "Webapps & apps",
        lead: "Van idee naar een tastbaar product dat mensen graag gebruiken.",
        includes: [
          "UX- en interfaceontwerp",
          "Klikbaar prototype",
          "Klantportalen & dashboards",
          "Boekings- en aanvraagtools",
          "MVP’s om je idee te testen",
        ],
        tags: ["Webapp", "Portal", "MVP"],
      },
      {
        no: "03",
        title: "Slimme systemen",
        lead: "Minder handwerk, meer overzicht. Je processen lopen vanzelf.",
        includes: [
          "Formulieren die direct doorlopen",
          "Koppelingen tussen je tools",
          "Automatische opvolging per e-mail",
          "AI-assistenten waar het helpt",
          "Overzichtelijke dashboards",
        ],
        tags: ["Automatisering", "Koppelingen", "AI"],
      },
    ],
  },
  work: {
    eyebrow: "Geselecteerd werk",
    title: ["Werk dat", "voor zich spreekt."],
    view: "Bekijk",
    live: "Live project",
    clientLabel: "Klant",
    rolesLabel: "Wat ik deed",
    project: {
      name: "Different Hair!",
      client: "Frank Meichsner · one-man kapsalon, Emmen",
      summary:
        "Een uitgesproken website voor de one-man kapsalon van Frank Meichsner in Emmen. Eigenzinnig, net als de salon zelf: sterke typografie, speelse collage-elementen, echte klantreviews en direct online een afspraak plannen.",
      roles: ["Strategie", "Webdesign", "Copywriting", "Responsive development"],
      url: "https://differenthair.nl",
      domain: "differenthair.nl",
      cta: "Bekijk live website",
      alt: "Homepage van Different Hair",
    },
    next: {
      title: "Jouw bedrijf als volgende?",
      text: "Ik bouw graag ook voor jou een website die opvalt en aanvragen oplevert.",
      cta: "Plan een kennismaking",
    },
  },
  why: {
    eyebrow: "Waarom met mij",
    title: ["Gebouwd met aandacht.", "Gemaakt om te presteren."],
    cards: [
      {
        k: "direct",
        title: "Eén aanspreekpunt",
        text: "Je spreekt altijd met de maker. Korte lijnen, snelle antwoorden, geen ruis.",
      },
      {
        k: "speed",
        title: "Snelheid als basis",
        text: "Elke seconde laadtijd kost bezoekers. Ik bouw licht, snel en volgens de Core Web Vitals.",
        stat: "90+",
        statLabel: "PageSpeed-doel",
      },
      {
        k: "mobile",
        title: "Mobiel eerst",
        text: "De meeste bezoekers komen via hun telefoon. Daar begint mijn ontwerp dan ook.",
      },
      {
        k: "seo",
        title: "Vindbaar in Google",
        text: "Een schone technische basis, snelle pagina’s en duidelijke structuur. Precies waar zoekmachines van houden.",
      },
      {
        k: "honest",
        title: "Eerlijk advies",
        text: "Soms is minder beter. Je hoort van mij wat slim is, ook als dat een kleinere opdracht betekent.",
      },
      {
        k: "bilingual",
        title: "Nederlands & Engels",
        text: "Ik werk voor klanten in Nederland én daarbuiten. Ook je site kan meertalig.",
      },
    ],
  },
  process: {
    eyebrow: "Zo werken we samen",
    title: ["Van eerste gesprek", "tot livegang."],
    steps: [
      {
        title: "Kennismaken",
        text: "Een vrijblijvend gesprek over je bedrijf, je klanten en je doel. Je hoeft nog geen uitgewerkt plan te hebben.",
        meta: "Gratis",
      },
      {
        title: "Plan & voorstel",
        text: "Je krijgt een helder voorstel: wat ik bouw, wat het oplevert en wat het kost. Zo weet je vooraf waar je aan toe bent.",
        meta: "Helder vooraf",
      },
      {
        title: "Ontwerp & bouw",
        text: "Je ziet het ontwerp, geeft feedback en denkt mee. Daarna bouw en test ik alles tot in detail.",
        meta: "Samen",
      },
      {
        title: "Live & groei",
        text: "We gaan live en ik leg uit hoe alles werkt. Daarna blijf ik bereikbaar voor onderhoud en verbeteringen.",
        meta: "Blijvend",
      },
    ],
  },
  about: {
    eyebrow: "De maker achter de pixels",
    title: ["Nieuwsgierig van nature.", "Maker in hart en nieren."],
    paragraphs: [
      "Ik ben Kevin. Ik vind het bijzonder om iets dat eerst alleen in je hoofd bestaat, echt te zien werken. Een website, een product of een systeem dat je dag makkelijker maakt. Daar krijg ik energie van.",
      "Die nieuwsgierigheid bracht me van content en social media naar een eigen webshop en digitale producten. Verschillende projecten, steeds dezelfde vraag: wat maakt iets waardevol voor de mensen die het gebruiken?",
      "Buiten het scherm ben ik vader van drie. Ik werk graag met mensen die ergens voor gaan. Met korte lijnen, eerlijk advies en aandacht voor de details.",
    ],
    caption: "Eén maker. Korte lijnen. Veel aandacht.",
    facts: [
      ["3", "kinderen, dus ik plan strak"],
      ["1", "aanspreekpunt, van begin tot eind"],
      ["2", "talen: Nederlands & Engels"],
    ],
    photoAlt: "Portret van Kevin, glimlachend in een lichte werkruimte",
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    title: ["Goed om", "te weten."],
    items: [
      [
        "Wat kost een website?",
        "Dat hangt af van wat je nodig hebt: een compacte landingspagina is iets anders dan een webapp met koppelingen. Na een kort kennismakingsgesprek krijg je een helder voorstel met een duidelijke prijs, zodat je vooraf weet waar je aan toe bent.",
      ],
      [
        "Hoe lang duurt het voordat mijn website live staat?",
        "Een compacte website staat vaak binnen enkele dagen live. Grotere projecten plannen we samen in duidelijke stappen, zodat je altijd weet wat er gebeurt.",
      ],
      [
        "Ik heb nog geen uitgewerkt plan. Is dat erg?",
        "Helemaal niet. Een idee, een vraag of een ‘zou het kunnen…?’ is genoeg. Samen maken we het concreet.",
      ],
      [
        "Kan ik later zelf dingen aanpassen?",
        "Dat kan. We bespreken vooraf hoe je je website wilt beheren, zodat je teksten of beelden zelf kunt bijwerken als je dat wilt.",
      ],
      [
        "Regel je ook hosting en onderhoud?",
        "Ja. Ik kan je website hosten en onderhouden, zodat alles snel, veilig en up-to-date blijft. Jij hoeft daar niet naar om te kijken.",
      ],
      [
        "Werk je ook voor bedrijven buiten Nederland?",
        "Zeker. Ik werk in het Nederlands en Engels en help ook internationale klanten, op afstand en met dezelfde persoonlijke aanpak.",
      ],
    ],
  },
  contact: {
    eyebrow: "Een goed project begint met een gesprek",
    big: ["Laten we", "iets moois", "bouwen."],
    intro:
      "Vertel me waar je aan denkt. Ik lees ieder bericht zelf en reageer persoonlijk, meestal binnen één werkdag.",
    formTitle: "Waar denk je aan?",
    typeLegend: "Wat wil je maken?",
    types: ["Website", "Webapp / app", "Slim systeem", "Nog niet zeker"],
    name: "Je naam",
    namePh: "Hoe mag ik je noemen?",
    email: "Je e-mailadres",
    emailPh: "naam@bedrijf.nl",
    message: "Vertel me over je idee",
    messagePh:
      "Wat wil je maken, voor wie en wat moet het opleveren? Een paar zinnen is genoeg.",
    send: "Verstuur bericht",
    sending: "Even versturen…",
    sent: "Bericht verzonden",
    success: "Dankjewel! Je bericht is verzonden. Ik neem persoonlijk contact met je op.",
    error: "Verzenden lukte niet. Mail me rechtstreeks via",
    privacy: "Je gegevens worden alleen gebruikt om op je bericht te reageren.",
    subject: "Nieuw projectidee",
    direct: "Liever direct?",
    copy: "Kopieer e-mailadres",
    copied: "E-mailadres gekopieerd",
    copyFailed: "Kopiëren lukt niet. Selecteer het adres hierboven.",
    fiverr: "Werk met mij via Fiverr",
  },
  footer: {
    tagline: "Met aandacht bedacht. Met plezier gebouwd.",
    local: "Lokale tijd",
    top: "Terug naar boven",
    rights: "Alle rechten voorbehouden.",
  },
};

export type Dict = typeof nl;

const en: Dict = {
  lang: "en",
  locale: "en_GB",
  meta: {
    title: "Kevin Rebuilds | Custom websites, web apps & automation",
    description:
      "I'm Kevin. I design and build fast websites, web apps and smart automations for businesses that want to grow. Personal, from first idea to launch.",
  },
  skip: "Skip to content",
  nav: {
    label: "Main navigation",
    items: [
      ["#diensten", "Services"],
      ["#werk", "Work"],
      ["#werkwijze", "Process"],
      ["#over", "About"],
      ["#faq", "FAQ"],
    ],
    cta: "Start your project",
    menu: "Menu",
    close: "Close",
    langLabel: "Language",
  },
  preloader: "Websites · Apps · Systems",
  hero: {
    status: "Available for new projects",
    lines: ["I build websites", "that bring in", "clients."],
    accentLine: 2,
    intro:
      "Hi, I'm Kevin. I design and build fast websites, web apps and smart automations for businesses that want to grow. Personal, honest and detailed down to the last pixel.",
    primary: "Book an intro call",
    secondary: "See my work",
    scroll: "Scroll",
    location: "Drenthe, NL",
    tags: ["Web design", "Development", "Automation"],
  },
  marquee: [
    "Custom websites",
    "Web apps",
    "Smart systems",
    "Fast load times",
    "SEO foundations",
    "Mobile first",
    "Personal contact",
  ],
  statement:
    "A great website isn't a business card. It's your best salesperson: always awake, always sharp, and built to turn visitors into clients.",
  services: {
    eyebrow: "What I do for you",
    title: ["One partner.", "Three ways to grow."],
    intro:
      "You work directly with me. No account managers, no middlemen. I think along with your goals and build what actually fits them.",
    includesLabel: "What you get",
    items: [
      {
        no: "01",
        title: "Websites",
        lead: "A custom website that builds trust and turns visitors into enquiries.",
        includes: [
          "Strategy & clear structure",
          "Unique design, no templates",
          "Copy that converts",
          "Lightning fast & SEO-ready",
          "Flawless on mobile",
        ],
        tags: ["Business site", "Landing page", "Online store"],
      },
      {
        no: "02",
        title: "Web apps & apps",
        lead: "From idea to a tangible product people love to use.",
        includes: [
          "UX & interface design",
          "Clickable prototype",
          "Client portals & dashboards",
          "Booking & request tools",
          "MVPs to validate your idea",
        ],
        tags: ["Web app", "Portal", "MVP"],
      },
      {
        no: "03",
        title: "Smart systems",
        lead: "Less manual work, more overview. Your processes run themselves.",
        includes: [
          "Forms that flow straight through",
          "Connections between your tools",
          "Automated email follow-ups",
          "AI assistants where they help",
          "Clear dashboards",
        ],
        tags: ["Automation", "Integrations", "AI"],
      },
    ],
  },
  work: {
    eyebrow: "Selected work",
    title: ["Work that", "speaks for itself."],
    view: "View",
    live: "Live project",
    clientLabel: "Client",
    rolesLabel: "What I did",
    project: {
      name: "Different Hair!",
      client: "Frank Meichsner · one-man hair salon, Emmen (NL)",
      summary:
        "A bold website for Frank Meichsner's one-man hair salon in Emmen. As distinctive as the salon itself: strong typography, playful collage elements, real client reviews and online booking built in.",
      roles: ["Strategy", "Web design", "Copywriting", "Responsive development"],
      url: "https://differenthair.nl",
      domain: "differenthair.nl",
      cta: "View live website",
      alt: "Different Hair homepage",
    },
    next: {
      title: "Your business next?",
      text: "I'd love to build you a website that stands out and brings in enquiries.",
      cta: "Book an intro call",
    },
  },
  why: {
    eyebrow: "Why work with me",
    title: ["Built with care.", "Made to perform."],
    cards: [
      {
        k: "direct",
        title: "One point of contact",
        text: "You always talk to the maker. Short lines, quick answers, no noise.",
      },
      {
        k: "speed",
        title: "Speed as a foundation",
        text: "Every second of load time costs visitors. I build light, fast and to Core Web Vitals.",
        stat: "90+",
        statLabel: "PageSpeed target",
      },
      {
        k: "mobile",
        title: "Mobile first",
        text: "Most visitors arrive on their phone. That's exactly where my design starts.",
      },
      {
        k: "seo",
        title: "Found on Google",
        text: "A clean technical foundation, fast pages and clear structure. Exactly what search engines love.",
      },
      {
        k: "honest",
        title: "Honest advice",
        text: "Sometimes less is more. I'll tell you what's smart, even if that means a smaller project.",
      },
      {
        k: "bilingual",
        title: "Dutch & English",
        text: "I work with clients in the Netherlands and abroad. Your site can be multilingual too.",
      },
    ],
  },
  process: {
    eyebrow: "How we work together",
    title: ["From first call", "to launch."],
    steps: [
      {
        title: "Get acquainted",
        text: "A no-obligation call about your business, your clients and your goals. You don't need a finished plan.",
        meta: "Free",
      },
      {
        title: "Plan & proposal",
        text: "You get a clear proposal: what I'll build, what it delivers and what it costs. No surprises.",
        meta: "Clear upfront",
      },
      {
        title: "Design & build",
        text: "You see the design, give feedback and help shape it. Then I build and test every detail.",
        meta: "Together",
      },
      {
        title: "Launch & grow",
        text: "We go live and I walk you through everything. After that I stay available for maintenance and improvements.",
        meta: "Ongoing",
      },
    ],
  },
  about: {
    eyebrow: "The maker behind the pixels",
    title: ["Curious by nature.", "A maker at heart."],
    paragraphs: [
      "I'm Kevin. I love seeing something that started as an idea become something real. A website, a product or a system that makes your day easier. That's what gives me energy.",
      "That curiosity took me from content and social media to my own online store and digital products. Different projects, always the same question: what makes something valuable to the people using it?",
      "Away from the screen, I'm a dad of three. I enjoy working with people who care about what they do. Expect direct communication, honest advice and attention to detail.",
    ],
    caption: "One maker. Direct contact. Real attention.",
    facts: [
      ["3", "kids, so I plan tightly"],
      ["1", "point of contact, start to finish"],
      ["2", "languages: Dutch & English"],
    ],
    photoAlt: "Portrait of Kevin, smiling in a bright workspace",
  },
  faq: {
    eyebrow: "Frequently asked",
    title: ["Good to", "know."],
    items: [
      [
        "How much does a website cost?",
        "It depends on what you need: a compact landing page is different from a web app with integrations. After a short intro call you'll get a clear proposal with a clear price, so you know where you stand upfront.",
      ],
      [
        "How long until my website is live?",
        "A compact website is often live within a few days. Larger projects are planned together in clear steps, so you always know what's happening.",
      ],
      [
        "I don't have a finished plan yet. Is that a problem?",
        "Not at all. An idea, a question or a ‘could we…?’ is enough. We'll make it concrete together.",
      ],
      [
        "Can I update things myself later?",
        "Yes. We'll agree upfront how you want to manage your site, so you can update text or images yourself if you like.",
      ],
      [
        "Do you handle hosting and maintenance?",
        "Yes. I can host and maintain your website so it stays fast, secure and up to date. You won't have to think about it.",
      ],
      [
        "Do you work with international clients?",
        "Absolutely. I work in English and Dutch and help clients abroad remotely, with the same personal approach.",
      ],
    ],
  },
  contact: {
    eyebrow: "A good project starts with a conversation",
    big: ["Let's build", "something", "great."],
    intro:
      "Tell me what you have in mind. I read every message myself and reply personally, usually within one working day.",
    formTitle: "What do you have in mind?",
    typeLegend: "What would you like to make?",
    types: ["Website", "Web app / app", "Smart system", "Not sure yet"],
    name: "Your name",
    namePh: "What should I call you?",
    email: "Your email address",
    emailPh: "name@company.com",
    message: "Tell me about your idea",
    messagePh:
      "What would you like to make, who is it for and what should it achieve? A few sentences is enough.",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent",
    success: "Thank you! Your message has been sent. I'll get back to you personally.",
    error: "Sending failed. Email me directly at",
    privacy: "Your details are only used to respond to your message.",
    subject: "New project idea",
    direct: "Prefer email?",
    copy: "Copy email address",
    copied: "Email address copied",
    copyFailed: "Couldn't copy. Select the address above.",
    fiverr: "Work with me on Fiverr",
  },
  footer: {
    tagline: "Thoughtfully designed. Happily built.",
    local: "Local time",
    top: "Back to top",
    rights: "All rights reserved.",
  },
};

export const dict: Record<Lang, Dict> = { nl, en };
