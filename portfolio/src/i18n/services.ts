import type { Lang, ServiceKey } from "./routes";

export type ServiceContent = {
  meta: { title: string; description: string };
  name: string;
  schemaType: string;
  eyebrow: string;
  h1: string;
  intro: string;
  highlights: string[];
  audience: { title: string; intro: string; items: { title: string; text: string }[] };
  problems: { title: string; intro: string; items: { problem: string; solution: string }[] };
  build: { title: string; intro: string; items: { title: string; text: string }[] };
  process: { title: string; intro: string; steps: { title: string; text: string }[] };
  faq: { title: string; items: [string, string][] };
  cta: { title: string; text: string };
};

const nl: Record<ServiceKey, ServiceContent> = {
  websites: {
    meta: {
      title: "Website laten maken op maat in Emmen | Kevin Rebuilds",
      description:
        "Een professionele website op maat voor je bedrijf: helder, snel, goed vindbaar en gemaakt om bezoekers om te zetten in aanvragen. Ontworpen en gebouwd door Kevin in Emmen, Drenthe.",
    },
    name: "Websites",
    schemaType: "Webdesign en websiteontwikkeling",
    eyebrow: "Oplossing · Websites",
    h1: "Een professionele website op maat voor jouw bedrijf.",
    intro:
      "Ik ontwerp en bouw websites op maat voor ondernemers en bedrijven. Een website die in een paar seconden duidelijk maakt wat je doet, vertrouwen wekt en bezoekers een logische volgende stap geeft, zoals een aanvraag, een afspraak of een telefoontje. Ik werk vanuit Emmen (Drenthe), voor bedrijven in de regio en daarbuiten.",
    highlights: ["Ontwerp en bouw op maat", "Snel en mobielvriendelijk", "Technisch klaar voor Google"],
    audience: {
      title: "Voor wie is een website op maat?",
      intro: "Een website op maat is bedoeld voor bedrijven die online serieus genomen willen worden en meer uit hun website willen halen dan een visitekaartje.",
      items: [
        { title: "Starters en zzp'ers", text: "Je begint je bedrijf en wilt vanaf dag één een professionele, betrouwbare uitstraling." },
        { title: "Groeiende mkb-bedrijven", text: "Je huidige website past niet meer bij wat je bedrijf nu is of levert te weinig aanvragen op." },
        { title: "Dienstverleners", text: "Klanten kiezen jou op vertrouwen. Je website moet laten zien wie je bent en wat je aanpak is." },
        { title: "Bedrijven met een verouderde site", text: "Je website is traag, werkt slecht op mobiel of is lastig aan te passen." },
      ],
    },
    problems: {
      title: "Welke problemen lost een goede website op?",
      intro: "Veel websites zien er redelijk uit, maar doen niet wat ze moeten doen. Dit zijn de problemen die ik het vaakst tegenkom, en hoe ik ze aanpak.",
      items: [
        { problem: "Bezoekers begrijpen niet snel genoeg wat je doet.", solution: "Een heldere boodschap bovenaan de pagina en een logische opbouw per dienst." },
        { problem: "De website levert weinig aanvragen op.", solution: "Duidelijke vervolgstappen en een eenvoudig contact- of aanvraagformulier." },
        { problem: "De site is traag of werkt slecht op mobiel.", solution: "Een lichte technische basis, geoptimaliseerde afbeeldingen en een ontwerp dat mobiel begint." },
        { problem: "Je wordt slecht gevonden in Google.", solution: "Een schone structuur, goede titels en beschrijvingen, snelle pagina's en inhoud die antwoord geeft op vragen van je klanten." },
      ],
    },
    build: {
      title: "Wat ik voor je kan bouwen",
      intro: "Elke website begint bij jouw doel en je klanten. Afhankelijk van wat je nodig hebt, kan ik onder meer het volgende maken:",
      items: [
        { title: "Bedrijfswebsite", text: "Een complete website met je diensten, werkwijze, over-ons-pagina en contactmogelijkheden." },
        { title: "Landingspagina", text: "Eén gerichte pagina voor een dienst, campagne of lancering, met één duidelijke actie." },
        { title: "Meertalige website", text: "Bijvoorbeeld Nederlands en Engels, met echte vertaalde pagina's die ook goed vindbaar zijn." },
        { title: "Aanvraag- en contactformulieren", text: "Formulieren met duidelijke velden, foutmeldingen en een bevestiging voor je bezoeker." },
        { title: "Technische SEO-basis", text: "Titels, metabeschrijvingen, sitemap, gestructureerde gegevens en een logische paginastructuur." },
        { title: "Vernieuwing van een bestaande site", text: "Je huidige website opnieuw opzetten met behoud van wat goed werkt, inclusief doorverwijzingen van oude adressen." },
      ],
    },
    process: {
      title: "Hoe verloopt een websiteproject?",
      intro: "Je weet steeds waar we staan en wat de volgende stap is.",
      steps: [
        { title: "Aanvraag en kennismaking", text: "Je vertelt kort wat je zoekt. In een gesprek bespreken we je bedrijf, je klanten en wat de website moet opleveren." },
        { title: "Voorstel", text: "Je ontvangt een voorstel met wat ik ga maken, de planning en de kosten. Pas als je akkoord bent, ga ik aan de slag." },
        { title: "Ontwerp en bouw", text: "Ik maak eerst het ontwerp en verwerk jouw feedback. Daarna bouw ik de website en vullen we de inhoud aan." },
        { title: "Testen en livegang", text: "We lopen alles samen na op desktop en mobiel. Daarna zet ik de website live en leg ik uit hoe alles werkt." },
      ],
    },
    faq: {
      title: "Veelgestelde vragen over een website laten maken",
      items: [
        ["Wat kost een website op maat?", "Een website op maat begint vanaf € 750 excl. btw, bijvoorbeeld voor een compacte website of landingspagina. De uiteindelijke prijs hangt af van de omvang: een landingspagina is iets anders dan een meertalige bedrijfswebsite. Na een kennismaking ontvang je een voorstel met een duidelijke prijs, zodat je vooraf weet waar je aan toe bent."],
        ["Hoe lang duurt het om een website te laten maken?", "Een compacte website kan vaak binnen enkele dagen tot een paar weken klaar zijn. De planning hangt vooral af van de omvang en van hoe snel teksten en beelden beschikbaar zijn. In het voorstel staat een concrete planning."],
        ["Moet ik zelf teksten en foto's aanleveren?", "Het liefst lever je de inhoud over je bedrijf aan, omdat jij je klanten het beste kent. Ik help met de structuur en het aanscherpen van teksten, zodat alles helder en overtuigend wordt."],
        ["Kan ik de website later zelf aanpassen?", "Dat bespreken we vooraf. Sommige bedrijven willen zelf teksten en beelden kunnen wijzigen, anderen laten dat liever aan mij over. De technische opzet stem ik daarop af."],
        ["Word ik gevonden in Google met een nieuwe website?", "Ik bouw de website met een goede technische basis voor zoekmachines: snelle pagina's, een logische structuur en goede titels en beschrijvingen. Een positie in Google kan niemand garanderen; die hangt ook af van concurrentie en inhoud."],
        ["Regel je ook hosting en onderhoud?", "Dat kan. We bespreken welke hosting past en of je onderhoud wilt, zodat je website veilig en up-to-date blijft."],
        ["Werk je alleen voor bedrijven in Emmen?", "Nee. Ik werk vanuit Emmen in Drenthe, voor bedrijven in de regio en in de rest van Nederland. Het contact en de samenwerking verlopen online."],
      ],
    },
    cta: { title: "Een website die past bij je bedrijf?", text: "Vertel kort wat je zoekt. Ik denk met je mee over de beste aanpak." },
  },
  webapps: {
    meta: {
      title: "Webapp of klantportaal laten maken in Emmen | Kevin Rebuilds",
      description:
        "Een webapp op maat, zoals een klantportaal, dashboard of interne tool, die past bij hoe jouw bedrijf werkt. Ontworpen en gebouwd door Kevin in Emmen, Drenthe.",
    },
    name: "Webapps",
    schemaType: "Ontwikkeling van webapplicaties op maat",
    eyebrow: "Oplossing · Webapps",
    h1: "Een webapp op maat die past bij jouw manier van werken.",
    intro:
      "Ik ontwerp en bouw webapps op maat: klantportalen, dashboards en interne tools die in de browser werken. Geen standaardsoftware waar je je werkwijze op moet aanpassen, maar een tool die aansluit op hoe jouw bedrijf werkt. Ik werk vanuit Emmen (Drenthe), voor bedrijven in de regio en daarbuiten.",
    highlights: ["Klantportalen en dashboards", "Gebouwd rond jouw werkwijze", "Werkt in de browser, ook op mobiel"],
    audience: {
      title: "Voor wie is een webapp op maat?",
      intro: "Een webapp is interessant als standaardsoftware niet goed aansluit of als je werk nu verspreid is over losse bestanden, mails en lijstjes.",
      items: [
        { title: "Dienstverleners met klanten", text: "Je wilt klanten een eigen omgeving geven met hun projecten, documenten en berichten." },
        { title: "Teams met veel losse overzichten", text: "Informatie staat verspreid in spreadsheets en mailboxen, en niemand heeft het complete beeld." },
        { title: "Bedrijven met een eigen werkwijze", text: "Bestaande software dwingt je in een proces dat niet bij jou past." },
        { title: "Ondernemers met een productidee", text: "Je wilt een idee eerst in een eenvoudige, werkende versie testen." },
      ],
    },
    problems: {
      title: "Welke problemen lost een webapp op?",
      intro: "Een goede webapp haalt ruis weg en brengt overzicht, voor jou, je team en je klanten.",
      items: [
        { problem: "Klanten mailen steeds om de status van hun project.", solution: "Een klantportaal waarin ze zelf de status, documenten en berichten zien." },
        { problem: "Informatie staat verspreid over spreadsheets en mails.", solution: "Eén centrale plek met een overzichtelijk dashboard." },
        { problem: "Standaardsoftware past niet bij je proces.", solution: "Een tool die precies doet wat nodig is, zonder overbodige functies." },
        { problem: "Terugkerende handelingen kosten veel tijd.", solution: "Formulieren, statussen en overzichten die het werk stroomlijnen, eventueel gekoppeld aan je andere systemen." },
      ],
    },
    build: {
      title: "Wat ik voor je kan bouwen",
      intro: "Een webapp kan klein beginnen en later groeien. Voorbeelden van wat ik kan maken:",
      items: [
        { title: "Klantportaal", text: "Een beveiligde omgeving waar klanten inloggen en hun projecten, bestanden en berichten zien." },
        { title: "Dashboard", text: "Een overzicht van de cijfers, taken of aanvragen die voor jou belangrijk zijn." },
        { title: "Interne tool", text: "Een handige applicatie voor je team, bijvoorbeeld voor planning, registratie of goedkeuringen." },
        { title: "Aanvraag- of offertemodule", text: "Een gestructureerd proces van aanvraag tot offerte, zodat niets tussen wal en schip valt." },
        { title: "Eerste versie (MVP)", text: "Een eenvoudige werkende versie van je idee om te testen met echte gebruikers." },
        { title: "Koppelingen met andere systemen", text: "Je webapp kan gegevens uitwisselen met bijvoorbeeld je CRM, boekhouding of mailprogramma." },
      ],
    },
    process: {
      title: "Hoe verloopt een webapp-project?",
      intro: "Bij een webapp is goed begrijpen hoe jullie werken het belangrijkste deel van het werk.",
      steps: [
        { title: "Aanvraag en kennismaking", text: "We bespreken het probleem dat je wilt oplossen, wie de gebruikers zijn en hoe het werk nu verloopt." },
        { title: "Voorstel en eerste opzet", text: "Je ontvangt een voorstel met de belangrijkste functies, de planning en de kosten. We beginnen bij wat het meeste oplevert." },
        { title: "Ontwerp en bouw in stappen", text: "Ik ontwerp de schermen en bouw de webapp in overzichtelijke stappen, zodat je tussentijds kunt meekijken en bijsturen." },
        { title: "Testen, opleveren en doorontwikkelen", text: "We testen samen met echte gebruikssituaties. Na de oplevering kan de webapp verder groeien." },
      ],
    },
    faq: {
      title: "Veelgestelde vragen over een webapp laten ontwikkelen",
      items: [
        ["Wat is het verschil tussen een website en een webapp?", "Een website informeert bezoekers. Een webapp is een tool waarmee gebruikers iets doen: inloggen, gegevens bekijken, formulieren invullen of taken afhandelen. Beide werken in de browser."],
        ["Wat kost een webapp op maat?", "Een webapp begint vanaf € 2.500 excl. btw, bijvoorbeeld voor een eenvoudige eerste versie. Daarna hangt de prijs sterk af van de functies en koppelingen. Na een kennismaking ontvang je een voorstel met een duidelijke prijs. Vaak is het slim om met een kleinere eerste versie te beginnen."],
        ["Werkt een webapp ook op mobiel?", "Ja. Een webapp werkt in de browser en ik ontwerp de schermen zo dat ze ook op telefoon en tablet goed bruikbaar zijn."],
        ["Is een klantportaal veilig?", "Veiligheid neem ik vanaf het begin mee: inloggen, toegangsrechten per gebruiker en een beveiligde verbinding. Welke maatregelen nodig zijn, bespreken we op basis van het soort gegevens."],
        ["Kan de webapp later uitgebreid worden?", "Ja. Ik bouw de webapp zo dat er later functies bij kunnen komen, zodat je klein kunt beginnen en kunt uitbreiden wat werkt."],
        ["Werk je alleen voor bedrijven in Emmen?", "Nee. Ik werk vanuit Emmen in Drenthe, voor bedrijven in de regio en in de rest van Nederland. Het contact en de samenwerking verlopen online."],
      ],
    },
    cta: { title: "Een tool die past bij jouw werkwijze?", text: "Vertel wat je nu lastig of tijdrovend vindt. Samen kijken we wat een webapp kan betekenen." },
  },
  automation: {
    meta: {
      title: "Bedrijfsprocessen automatiseren in Emmen | Kevin Rebuilds",
      description:
        "Minder handmatig werk door je systemen te koppelen: aanvragen automatisch verwerken, bevestigen en opslaan. Automatisering op maat voor ondernemers, gebouwd door Kevin in Emmen, Drenthe.",
    },
    name: "Automatisering",
    schemaType: "Automatisering van bedrijfsprocessen",
    eyebrow: "Oplossing · Automatisering",
    h1: "Koppel je systemen en verminder handmatig werk.",
    intro:
      "Ik help ondernemers terugkerend handwerk te automatiseren. Denk aan aanvragen die automatisch in je CRM komen, bevestigingsmails die vanzelf worden verstuurd en gegevens die je niet meer hoeft over te typen tussen verschillende programma's. Ik werk vanuit Emmen (Drenthe), voor bedrijven in de regio en daarbuiten.",
    highlights: ["Systemen die met elkaar praten", "Minder overtypen en fouten", "Afgestemd op jouw proces"],
    audience: {
      title: "Voor wie is automatisering interessant?",
      intro: "Automatisering loont vooral als je dezelfde handelingen steeds opnieuw doet, met verschillende programma's naast elkaar.",
      items: [
        { title: "Ondernemers die veel aanvragen verwerken", text: "Elke aanvraag vraagt om overtypen, een bevestiging en een taak of afspraak." },
        { title: "Kleine teams zonder IT-afdeling", text: "Je gebruikt verschillende tools die niet met elkaar verbonden zijn." },
        { title: "Bedrijven die groeien", text: "Wat eerst met de hand kon, kost nu te veel tijd en leidt tot fouten." },
        { title: "Iedereen die werkt met spreadsheets", text: "Belangrijke informatie staat in Excel of Google Sheets en moet steeds handmatig worden bijgewerkt." },
      ],
    },
    problems: {
      title: "Welke problemen lost automatisering op?",
      intro: "Het doel is niet alles te automatiseren, maar de handelingen die tijd kosten en foutgevoelig zijn.",
      items: [
        { problem: "Je typt gegevens over van het ene programma naar het andere.", solution: "Een koppeling die gegevens automatisch doorzet naar de juiste plek." },
        { problem: "Klanten wachten op een bevestiging.", solution: "Een automatische bevestigingsmail zodra een aanvraag binnenkomt." },
        { problem: "Aanvragen raken zoek of worden vergeten.", solution: "Elke aanvraag wordt automatisch vastgelegd als taak of in je CRM." },
        { problem: "Je team hoort te laat van nieuwe aanvragen.", solution: "Een melding in bijvoorbeeld Slack of per e-mail, direct wanneer er iets binnenkomt." },
      ],
    },
    build: {
      title: "Wat ik voor je kan automatiseren",
      intro: "Welke koppelingen mogelijk zijn, hangt af van de programma's die je gebruikt. Veelvoorkomende voorbeelden:",
      items: [
        { title: "Aanvragen van je website verwerken", text: "Formulieren automatisch doorzetten naar je CRM, mailbox of spreadsheet." },
        { title: "Automatische bevestigingen", text: "Klanten krijgen direct een persoonlijke bevestiging van hun aanvraag of afspraak." },
        { title: "Taken en opvolging", text: "Nieuwe aanvragen worden automatisch een taak, zodat opvolging niet vergeten wordt." },
        { title: "Meldingen voor je team", text: "Een bericht in Slack, Teams of per e-mail wanneer er iets belangrijks gebeurt." },
        { title: "Gegevens synchroniseren", text: "Informatie gelijk houden tussen bijvoorbeeld je spreadsheet, CRM en boekhouding." },
        { title: "Rapportages en overzichten", text: "Periodiek automatisch een overzicht van aanvragen, taken of cijfers." },
      ],
    },
    process: {
      title: "Hoe verloopt een automatiseringsproject?",
      intro: "We beginnen bij hoe het werk nu gaat, niet bij de techniek.",
      steps: [
        { title: "Aanvraag en kennismaking", text: "Je vertelt welk werk steeds terugkomt. We brengen samen in kaart welke stappen en programma's erbij horen." },
        { title: "Voorstel", text: "Je ontvangt een voorstel met wat ik automatiseer, met welke tools, de planning en de kosten." },
        { title: "Bouwen en koppelen", text: "Ik bouw de koppelingen en test ze eerst met voorbeeldgegevens, zodat je bestaande werk niet wordt verstoord." },
        { title: "Testen en in gebruik nemen", text: "We lopen de flow samen door met echte situaties. Daarna zetten we hem aan en leg ik uit hoe hij werkt." },
      ],
    },
    faq: {
      title: "Veelgestelde vragen over bedrijfsprocessen automatiseren",
      items: [
        ["Welke programma's kun je met elkaar koppelen?", "Veel moderne programma's hebben een koppelmogelijkheid, zoals formulieren, mail, spreadsheets, CRM's en chatprogramma's. Of een koppeling mogelijk is, controleer ik vooraf per programma."],
        ["Wat kost een automatisering?", "Dat hangt af van het aantal stappen en systemen. Na een kennismaking ontvang je een voorstel met een duidelijke prijs. Vaak is het slim om te beginnen met het proces dat de meeste tijd kost."],
        ["Moet ik mijn huidige software vervangen?", "Meestal niet. Het doel is juist om de programma's die je al gebruikt beter met elkaar te laten samenwerken."],
        ["Wat gebeurt er als een koppeling niet werkt?", "Ik bouw koppelingen zo dat fouten zichtbaar worden in plaats van stil mis te gaan, bijvoorbeeld met een melding. We bespreken ook wie wat doet als er iets hapert."],
        ["Is automatisering ook iets voor een klein bedrijf?", "Juist voor kleine bedrijven kan het veel schelen, omdat je minder tijd kwijt bent aan administratie. We kijken samen of de tijdswinst opweegt tegen de investering."],
        ["Werk je alleen voor bedrijven in Emmen?", "Nee. Ik werk vanuit Emmen in Drenthe, voor bedrijven in de regio en in de rest van Nederland. Het contact en de samenwerking verlopen online."],
      ],
    },
    cta: { title: "Minder handwerk in je bedrijf?", text: "Beschrijf welk werk steeds terugkomt. Ik kijk mee wat er te automatiseren valt." },
  },
};

const en: Record<ServiceKey, ServiceContent> = {
  websites: {
    meta: {
      title: "Custom business websites | Kevin Rebuilds, Emmen (NL)",
      description:
        "A professional custom website for your business: clear, fast, search-ready and designed to turn visitors into enquiries. Designed and built by Kevin in Emmen, the Netherlands.",
    },
    name: "Websites",
    schemaType: "Web design and website development",
    eyebrow: "Solution · Websites",
    h1: "A professional custom website for your business.",
    intro:
      "I design and build custom websites for entrepreneurs and businesses. A website that makes clear what you do within seconds, builds trust and gives visitors a logical next step, such as a request, an appointment or a phone call. I work from Emmen in the Netherlands, for businesses nearby and further afield.",
    highlights: ["Custom design and build", "Fast and mobile-friendly", "Technically ready for Google"],
    audience: {
      title: "Who is a custom website for?",
      intro: "A custom website is for businesses that want to be taken seriously online and expect more from their website than a digital business card.",
      items: [
        { title: "Starters and freelancers", text: "You're starting your business and want a professional, trustworthy presence from day one." },
        { title: "Growing small businesses", text: "Your current website no longer reflects your business or brings in too few enquiries." },
        { title: "Service providers", text: "Clients choose you on trust. Your website needs to show who you are and how you work." },
        { title: "Businesses with an outdated site", text: "Your website is slow, works poorly on mobile or is hard to update." },
      ],
    },
    problems: {
      title: "Which problems does a good website solve?",
      intro: "Many websites look fine but don't do their job. These are the problems I come across most often, and how I approach them.",
      items: [
        { problem: "Visitors don't understand quickly enough what you do.", solution: "A clear message at the top of the page and a logical structure per service." },
        { problem: "The website brings in few enquiries.", solution: "Clear next steps and a simple contact or request form." },
        { problem: "The site is slow or works poorly on mobile.", solution: "A lightweight technical foundation, optimised images and a mobile-first design." },
        { problem: "You're hard to find on Google.", solution: "A clean structure, good titles and descriptions, fast pages and content that answers your clients' questions." },
      ],
    },
    build: {
      title: "What I can build for you",
      intro: "Every website starts with your goal and your clients. Depending on what you need, I can build:",
      items: [
        { title: "Business website", text: "A complete website with your services, approach, about page and contact options." },
        { title: "Landing page", text: "One focused page for a service, campaign or launch, with one clear action." },
        { title: "Multilingual website", text: "For example Dutch and English, with properly translated pages that are also easy to find." },
        { title: "Request and contact forms", text: "Forms with clear fields, error messages and a confirmation for your visitor." },
        { title: "Technical SEO foundation", text: "Titles, meta descriptions, sitemap, structured data and a logical page structure." },
        { title: "Rebuild of an existing site", text: "Rebuilding your current website while keeping what works, including redirects from old addresses." },
      ],
    },
    process: {
      title: "How does a website project work?",
      intro: "You always know where we are and what comes next.",
      steps: [
        { title: "Request and introduction", text: "You briefly tell me what you're looking for. We discuss your business, your clients and what the website should achieve." },
        { title: "Proposal", text: "You receive a proposal with what I'll build, the timeline and the cost. I only start once you agree." },
        { title: "Design and build", text: "I create the design first and process your feedback. Then I build the website and we complete the content." },
        { title: "Testing and launch", text: "We review everything together on desktop and mobile. Then I launch the website and explain how it all works." },
      ],
    },
    faq: {
      title: "Frequently asked questions about a custom website",
      items: [
        ["How much does a custom website cost?", "A custom website starts from €750 excl. VAT, for example for a compact website or landing page. The final price depends on the scope: a landing page is different from a multilingual business website. After an introduction you'll receive a proposal with a clear price, so you know where you stand upfront."],
        ["How long does it take to build a website?", "A compact website can often be ready within a few days to a few weeks. The timeline mainly depends on the scope and on how quickly texts and images are available. The proposal includes a concrete timeline."],
        ["Do I need to provide the texts and photos?", "Ideally you provide the content about your business, since you know your clients best. I help with the structure and with sharpening the copy so everything is clear and convincing."],
        ["Can I update the website myself later?", "We agree on that upfront. Some businesses want to edit texts and images themselves, others prefer to leave it to me. I set up the technical side accordingly."],
        ["Will a new website make me visible on Google?", "I build the website with a good technical foundation for search engines: fast pages, a logical structure and good titles and descriptions. Nobody can guarantee a ranking; it also depends on competition and content."],
        ["Do you also handle hosting and maintenance?", "I can. We'll discuss which hosting fits and whether you want maintenance, so your website stays secure and up to date."],
        ["Do you only work with businesses in Emmen?", "No. I work from Emmen in Drenthe, the Netherlands, for businesses in the region, across the country and abroad. Contact and collaboration happen online."],
      ],
    },
    cta: { title: "A website that fits your business?", text: "Tell me briefly what you're looking for. I'll think along with you about the best approach." },
  },
  webapps: {
    meta: {
      title: "Custom web apps & client portals | Kevin Rebuilds, Emmen",
      description:
        "A custom web app, such as a client portal, dashboard or internal tool, that fits the way your business works. Designed and built by Kevin in Emmen, the Netherlands.",
    },
    name: "Web apps",
    schemaType: "Custom web application development",
    eyebrow: "Solution · Web apps",
    h1: "A custom web app that fits the way you work.",
    intro:
      "I design and build custom web apps: client portals, dashboards and internal tools that run in the browser. Not off-the-shelf software you have to adapt to, but a tool that fits how your business works. I work from Emmen in the Netherlands, for businesses nearby and further afield.",
    highlights: ["Client portals and dashboards", "Built around your workflow", "Runs in the browser, on mobile too"],
    audience: {
      title: "Who is a custom web app for?",
      intro: "A web app is worth considering when off-the-shelf software doesn't fit, or when your work is scattered across files, emails and lists.",
      items: [
        { title: "Service providers with clients", text: "You want to give clients their own space with their projects, documents and messages." },
        { title: "Teams with many separate overviews", text: "Information is spread across spreadsheets and inboxes, and nobody has the full picture." },
        { title: "Businesses with their own way of working", text: "Existing software forces you into a process that doesn't suit you." },
        { title: "Entrepreneurs with a product idea", text: "You want to test an idea in a simple, working version first." },
      ],
    },
    problems: {
      title: "Which problems does a web app solve?",
      intro: "A good web app removes noise and brings overview, for you, your team and your clients.",
      items: [
        { problem: "Clients keep emailing about the status of their project.", solution: "A client portal where they see the status, documents and messages themselves." },
        { problem: "Information is scattered across spreadsheets and emails.", solution: "One central place with a clear dashboard." },
        { problem: "Off-the-shelf software doesn't fit your process.", solution: "A tool that does exactly what's needed, without unnecessary features." },
        { problem: "Repetitive tasks take up a lot of time.", solution: "Forms, statuses and overviews that streamline the work, optionally connected to your other systems." },
      ],
    },
    build: {
      title: "What I can build for you",
      intro: "A web app can start small and grow later. Examples of what I can build:",
      items: [
        { title: "Client portal", text: "A secure space where clients log in and see their projects, files and messages." },
        { title: "Dashboard", text: "An overview of the numbers, tasks or requests that matter to you." },
        { title: "Internal tool", text: "A practical application for your team, for example for planning, registration or approvals." },
        { title: "Request or quote module", text: "A structured process from request to quote, so nothing falls through the cracks." },
        { title: "First version (MVP)", text: "A simple working version of your idea to test with real users." },
        { title: "Integrations with other systems", text: "Your web app can exchange data with, for example, your CRM, accounting or email software." },
      ],
    },
    process: {
      title: "How does a web app project work?",
      intro: "With a web app, understanding how you work is the most important part of the job.",
      steps: [
        { title: "Request and introduction", text: "We discuss the problem you want to solve, who the users are and how the work is done today." },
        { title: "Proposal and first outline", text: "You receive a proposal with the key features, the timeline and the cost. We start with what delivers the most." },
        { title: "Design and build in steps", text: "I design the screens and build the web app in clear steps, so you can review and steer along the way." },
        { title: "Testing, delivery and further development", text: "We test together using real situations. After delivery, the web app can keep growing." },
      ],
    },
    faq: {
      title: "Frequently asked questions about custom web app development",
      items: [
        ["What's the difference between a website and a web app?", "A website informs visitors. A web app is a tool users do something with: log in, view data, fill in forms or handle tasks. Both run in the browser."],
        ["How much does a custom web app cost?", "A web app starts from €2,500 excl. VAT, for example for a simple first version. Beyond that, the price depends heavily on the features and integrations. After an introduction you'll receive a proposal with a clear price. It's often smart to start with a smaller first version."],
        ["Does a web app work on mobile?", "Yes. A web app runs in the browser, and I design the screens to work well on phones and tablets too."],
        ["Is a client portal secure?", "I take security into account from the start: login, access rights per user and a secure connection. Which measures are needed depends on the type of data, and we discuss that together."],
        ["Can the web app be extended later?", "Yes. I build the web app so features can be added later, so you can start small and expand what works."],
        ["Do you only work with businesses in Emmen?", "No. I work from Emmen in Drenthe, the Netherlands, for businesses in the region, across the country and abroad. Contact and collaboration happen online."],
      ],
    },
    cta: { title: "A tool that fits the way you work?", text: "Tell me what you currently find difficult or time-consuming. Together we'll see what a web app could do." },
  },
  automation: {
    meta: {
      title: "Business process automation | Kevin Rebuilds, Emmen (NL)",
      description:
        "Less manual work by connecting your systems: process, confirm and store requests automatically. Custom automation for businesses, built by Kevin in Emmen, the Netherlands.",
    },
    name: "Automation",
    schemaType: "Business process automation",
    eyebrow: "Solution · Automation",
    h1: "Connect your systems and reduce manual work.",
    intro:
      "I help businesses automate repetitive manual work. Think of requests that land in your CRM automatically, confirmation emails that go out by themselves, and data you no longer have to retype between different programs. I work from Emmen in the Netherlands, for businesses nearby and further afield.",
    highlights: ["Systems that talk to each other", "Less retyping and fewer errors", "Tailored to your process"],
    audience: {
      title: "Who is automation for?",
      intro: "Automation pays off most when you repeat the same actions over and over, across several programs.",
      items: [
        { title: "Businesses that handle many requests", text: "Every request means retyping, a confirmation and a task or appointment." },
        { title: "Small teams without an IT department", text: "You use several tools that aren't connected to each other." },
        { title: "Growing businesses", text: "What used to work by hand now takes too much time and leads to mistakes." },
        { title: "Anyone working with spreadsheets", text: "Important information lives in Excel or Google Sheets and has to be updated by hand." },
      ],
    },
    problems: {
      title: "Which problems does automation solve?",
      intro: "The goal isn't to automate everything, but the actions that take time and are error-prone.",
      items: [
        { problem: "You retype data from one program into another.", solution: "An integration that moves data to the right place automatically." },
        { problem: "Clients wait for a confirmation.", solution: "An automatic confirmation email as soon as a request comes in." },
        { problem: "Requests get lost or forgotten.", solution: "Every request is automatically recorded as a task or in your CRM." },
        { problem: "Your team hears about new requests too late.", solution: "A notification in Slack or by email, right when something comes in." },
      ],
    },
    build: {
      title: "What I can automate for you",
      intro: "Which integrations are possible depends on the programs you use. Common examples:",
      items: [
        { title: "Processing website requests", text: "Automatically send form submissions to your CRM, inbox or spreadsheet." },
        { title: "Automatic confirmations", text: "Clients instantly receive a personal confirmation of their request or appointment." },
        { title: "Tasks and follow-up", text: "New requests automatically become a task, so follow-up isn't forgotten." },
        { title: "Team notifications", text: "A message in Slack, Teams or by email when something important happens." },
        { title: "Data synchronisation", text: "Keep information aligned between, for example, your spreadsheet, CRM and accounting." },
        { title: "Reports and overviews", text: "A periodic automatic overview of requests, tasks or figures." },
      ],
    },
    process: {
      title: "How does an automation project work?",
      intro: "We start with how the work is done today, not with the technology.",
      steps: [
        { title: "Request and introduction", text: "You tell me which work keeps coming back. Together we map the steps and programs involved." },
        { title: "Proposal", text: "You receive a proposal with what I'll automate, with which tools, the timeline and the cost." },
        { title: "Build and connect", text: "I build the integrations and test them with sample data first, so your existing work isn't disrupted." },
        { title: "Test and go live", text: "We run through the flow together with real situations. Then we switch it on and I explain how it works." },
      ],
    },
    faq: {
      title: "Frequently asked questions about business process automation",
      items: [
        ["Which programs can you connect?", "Many modern programs offer integration options, such as forms, email, spreadsheets, CRMs and chat tools. I check upfront, per program, whether an integration is possible."],
        ["How much does an automation cost?", "It depends on the number of steps and systems. After an introduction you'll receive a proposal with a clear price. It's often smart to start with the process that takes the most time."],
        ["Do I need to replace my current software?", "Usually not. The goal is to make the programs you already use work together better."],
        ["What happens if an integration fails?", "I build integrations so that errors become visible instead of failing silently, for example with a notification. We also agree who does what if something goes wrong."],
        ["Is automation worthwhile for a small business?", "It can make a big difference for small businesses, because you spend less time on admin. Together we check whether the time saved outweighs the investment."],
        ["Do you only work with businesses in Emmen?", "No. I work from Emmen in Drenthe, the Netherlands, for businesses in the region, across the country and abroad. Contact and collaboration happen online."],
      ],
    },
    cta: { title: "Less manual work in your business?", text: "Describe which work keeps coming back. I'll look at what can be automated." },
  },
};

export const services: Record<Lang, Record<ServiceKey, ServiceContent>> = { nl, en };
