import type { Lang } from "./routes";
import { CONTACT_EMAIL } from "../config";

export type LegalBlock = { h: string; p?: string[]; ul?: string[] };
export type LegalDoc = {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  blocks: LegalBlock[];
  note?: string;
};

const UPDATED_NL = "Laatst bijgewerkt: 25 september 2026";
const UPDATED_EN = "Last updated: 25 September 2026";

export const privacy: Record<Lang, LegalDoc> = {
  nl: {
    meta: {
      title: "Privacyverklaring | Kevin Rebuilds",
      description: "Hoe Kevin Rebuilds omgaat met je persoonsgegevens: welke gegevens, waarom, hoe lang en welke rechten je hebt.",
    },
    eyebrow: "Privacy",
    title: "Privacyverklaring",
    updated: UPDATED_NL,
    intro:
      "Kevin Rebuilds respecteert je privacy. In deze verklaring lees je welke persoonsgegevens ik verwerk als je deze website bezoekt of contact met me opneemt, waarom ik dat doe en welke rechten je hebt.",
    blocks: [
      {
        h: "Wie is verantwoordelijk?",
        p: [
          `Kevin Rebuilds, gevestigd in Emmen (Drenthe), is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring. Je bereikt me via ${CONTACT_EMAIL}.`,
        ],
      },
      {
        h: "Welke gegevens verwerk ik?",
        p: ["Als je het aanvraagformulier invult of me mailt, verwerk ik de gegevens die je zelf opgeeft:"],
        ul: [
          "je naam en e-mailadres;",
          "eventueel je bedrijfsnaam;",
          "de dienst waar je aanvraag over gaat en de omschrijving van je project;",
          "de taal van de pagina waarop je het formulier invulde.",
        ],
      },
      {
        h: "Waarom verwerk ik deze gegevens?",
        ul: [
          "Om je aanvraag of vraag te beantwoorden en je een voorstel te sturen. De grondslag is het nemen van stappen op jouw verzoek, voorafgaand aan een eventuele overeenkomst.",
          "Om een opdracht uit te voeren als we gaan samenwerken. De grondslag is de uitvoering van de overeenkomst.",
          "Om te voldoen aan wettelijke verplichtingen, zoals de fiscale bewaarplicht voor facturen en administratie.",
        ],
      },
      {
        h: "Met wie deel ik gegevens?",
        p: [
          "Ik verkoop je gegevens nooit en deel ze alleen met partijen die nodig zijn om deze website en mijn werk te laten functioneren:",
        ],
        ul: [
          "FormSubmit (formsubmit.co) stuurt de gegevens uit het aanvraagformulier door naar mijn mailbox.",
          "Google (Gmail) levert de mailbox waarin aanvragen en e-mails binnenkomen.",
          "Mijn hostingpartij bewaart de bestanden van deze website op een server.",
          "Cloudflare verzorgt de beveiligde en snelle levering van de website en verwerkt daarbij technische gegevens zoals je IP-adres.",
        ],
      },
      {
        h: "Doorgifte buiten de Europese Unie",
        p: [
          "Sommige van deze partijen, zoals Google en Cloudflare, kunnen gegevens ook buiten de Europese Unie verwerken, bijvoorbeeld in de Verenigde Staten. Dat gebeurt alleen met passende waarborgen, zoals het EU-VS-gegevensprivacykader of de standaardcontractbepalingen van de Europese Commissie.",
        ],
      },
      {
        h: "Hoe lang bewaar ik gegevens?",
        ul: [
          "Aanvragen die niet tot een opdracht leiden, bewaar ik maximaal 12 maanden na het laatste contact.",
          "Gegevens van klanten bewaar ik zolang dat nodig is voor de opdracht. Facturen en administratie bewaar ik 7 jaar, omdat de wet dat verplicht.",
          "Technische gegevens van de server en Cloudflare, zoals IP-adressen in logbestanden, worden alleen kort bewaard voor beveiliging en het oplossen van storingen.",
        ],
      },
      {
        h: "Cookies en statistieken",
        p: [
          "Deze website plaatst zelf geen cookies en gebruikt geen tracking- of statistiekentools. Cloudflare kan een strikt noodzakelijk beveiligingscookie plaatsen om de website tegen misbruik te beschermen; daarvoor is geen toestemming nodig. Lettertypen worden vanaf deze website zelf geladen, niet via externe diensten zoals Google Fonts.",
          "Een voorkeur voor de taal wordt niet opgeslagen: je kiest de taal via de link naar de Nederlandse of Engelse versie.",
        ],
      },
      {
        h: "Beveiliging",
        p: [
          "De website gebruikt een beveiligde verbinding (HTTPS). Ik neem passende maatregelen om je gegevens te beschermen tegen verlies en onrechtmatig gebruik.",
        ],
      },
      {
        h: "Jouw rechten",
        p: [
          `Je hebt het recht om je gegevens in te zien, te laten corrigeren of verwijderen, de verwerking te laten beperken, bezwaar te maken en je gegevens over te laten dragen. Stuur je verzoek naar ${CONTACT_EMAIL}. Ik reageer binnen een maand.`,
          "Ben je het niet eens met hoe ik met je gegevens omga? Laat het me weten, dan zoeken we samen een oplossing. Je hebt ook altijd het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).",
        ],
      },
      {
        h: "Wijzigingen",
        p: ["Ik kan deze privacyverklaring aanpassen als de website of mijn werkwijze verandert. De datum bovenaan laat zien wanneer de verklaring voor het laatst is bijgewerkt."],
      },
    ],
  },
  en: {
    meta: {
      title: "Privacy statement | Kevin Rebuilds",
      description: "How Kevin Rebuilds handles your personal data: which data, why, for how long and which rights you have.",
    },
    eyebrow: "Privacy",
    title: "Privacy statement",
    updated: UPDATED_EN,
    intro:
      "Kevin Rebuilds respects your privacy. This statement explains which personal data I process when you visit this website or contact me, why I do so and which rights you have.",
    blocks: [
      {
        h: "Who is responsible?",
        p: [`Kevin Rebuilds, based in Emmen (Drenthe, the Netherlands), is responsible for processing personal data as described in this statement. You can reach me at ${CONTACT_EMAIL}.`],
      },
      {
        h: "Which data do I process?",
        p: ["When you fill in the request form or email me, I process the data you provide yourself:"],
        ul: [
          "your name and email address;",
          "your company name, if you provide it;",
          "the service your request is about and the description of your project;",
          "the language of the page on which you filled in the form.",
        ],
      },
      {
        h: "Why do I process this data?",
        ul: [
          "To answer your request or question and send you a proposal. The legal basis is taking steps at your request prior to a possible contract.",
          "To carry out an assignment if we work together. The legal basis is the performance of the contract.",
          "To comply with legal obligations, such as the Dutch tax retention obligation for invoices and records.",
        ],
      },
      {
        h: "Who do I share data with?",
        p: ["I never sell your data and only share it with parties needed to run this website and my work:"],
        ul: [
          "FormSubmit (formsubmit.co) forwards the data from the request form to my inbox.",
          "Google (Gmail) provides the inbox where requests and emails arrive.",
          "My hosting provider stores the files of this website on a server.",
          "Cloudflare provides secure and fast delivery of the website and processes technical data such as your IP address.",
        ],
      },
      {
        h: "Transfers outside the European Union",
        p: ["Some of these parties, such as Google and Cloudflare, may also process data outside the European Union, for example in the United States. This only happens with appropriate safeguards, such as the EU-US Data Privacy Framework or the European Commission's standard contractual clauses."],
      },
      {
        h: "How long do I keep data?",
        ul: [
          "Requests that don't lead to an assignment are kept for up to 12 months after the last contact.",
          "Client data is kept for as long as the assignment requires. Invoices and records are kept for 7 years, as required by Dutch law.",
          "Technical data from the server and Cloudflare, such as IP addresses in log files, is only kept briefly for security and troubleshooting.",
        ],
      },
      {
        h: "Cookies and analytics",
        p: [
          "This website does not set cookies itself and does not use tracking or analytics tools. Cloudflare may set a strictly necessary security cookie to protect the website against abuse; no consent is required for that. Fonts are loaded from this website itself, not from external services such as Google Fonts.",
          "No language preference is stored: you choose the language via the link to the Dutch or English version.",
        ],
      },
      { h: "Security", p: ["The website uses a secure connection (HTTPS). I take appropriate measures to protect your data against loss and unlawful use."] },
      {
        h: "Your rights",
        p: [
          `You have the right to access, correct or delete your data, to restrict processing, to object and to data portability. Send your request to ${CONTACT_EMAIL}. I'll respond within one month.`,
          "Don't agree with how I handle your data? Let me know and we'll find a solution together. You also always have the right to file a complaint with the Dutch Data Protection Authority (autoriteitpersoonsgegevens.nl).",
        ],
      },
      { h: "Changes", p: ["I may update this privacy statement when the website or my way of working changes. The date at the top shows when it was last updated."] },
    ],
  },
};

export const terms: Record<Lang, LegalDoc> = {
  nl: {
    meta: {
      title: "Algemene voorwaarden | Kevin Rebuilds",
      description: "De algemene voorwaarden van Kevin Rebuilds voor het ontwerpen en bouwen van websites, webapps en automatiseringen.",
    },
    eyebrow: "Voorwaarden",
    title: "Algemene voorwaarden",
    updated: UPDATED_NL + " · versie 1.0",
    intro:
      "Deze algemene voorwaarden gelden voor alle offertes, opdrachten en overeenkomsten van Kevin Rebuilds voor het ontwerpen, bouwen en onderhouden van websites, webapps en automatiseringen.",
    blocks: [
      { h: "1. Definities", ul: ["Opdrachtnemer: Kevin Rebuilds, gevestigd in Emmen.", "Opdrachtgever: de partij die Kevin Rebuilds een opdracht geeft.", "Opdracht: het werk dat in de offerte of het voorstel is omschreven."] },
      { h: "2. Toepasselijkheid", p: ["Deze voorwaarden gelden voor iedere offerte en overeenkomst tussen opdrachtnemer en opdrachtgever. Afwijkingen gelden alleen als ze schriftelijk zijn afgesproken. Algemene voorwaarden van de opdrachtgever zijn niet van toepassing."] },
      { h: "3. Offertes en voorstellen", p: ["Offertes en voorstellen zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld. Een opdracht komt tot stand zodra de opdrachtgever de offerte schriftelijk of per e-mail accepteert."] },
      { h: "4. Uitvoering", p: ["Opdrachtnemer voert de opdracht zorgvuldig en naar beste kunnen uit. Genoemde planningen zijn een inschatting en geen fatale termijnen, tenzij uitdrukkelijk anders is afgesproken."] },
      { h: "5. Medewerking van de opdrachtgever", p: ["De opdrachtgever zorgt tijdig voor de informatie, teksten, beelden, toegangsgegevens en feedback die nodig zijn om de opdracht uit te voeren. Vertraging hierin kan leiden tot een aangepaste planning of extra kosten."] },
      { h: "6. Meerwerk", p: ["Werk dat buiten de omschrijving van de opdracht valt, is meerwerk. Opdrachtnemer overlegt vooraf over meerwerk en de kosten daarvan en voert het pas uit na akkoord van de opdrachtgever."] },
      { h: "7. Prijzen en betaling", p: ["Alle prijzen zijn in euro's en exclusief btw, tenzij anders vermeld. Facturen worden betaald volgens de termijnen in de offerte. Is er geen termijn afgesproken, dan geldt een betalingstermijn van 14 dagen na factuurdatum. Bij te late betaling mag opdrachtnemer het werk opschorten en de wettelijke rente en redelijke incassokosten in rekening brengen."] },
      { h: "8. Oplevering en acceptatie", p: ["Na oplevering heeft de opdrachtgever 14 dagen om het resultaat te controleren en eventuele gebreken te melden. Gemelde gebreken die binnen de afgesproken opdracht vallen, herstelt opdrachtnemer kosteloos. Na deze termijn, of zodra het resultaat in gebruik wordt genomen, geldt de oplevering als geaccepteerd."] },
      { h: "9. Intellectueel eigendom", p: ["Na volledige betaling krijgt de opdrachtgever het recht om het opgeleverde resultaat te gebruiken voor het afgesproken doel. Opdrachtnemer mag het resultaat noemen en tonen in zijn portfolio, tenzij schriftelijk anders is afgesproken. Onderdelen van derden, zoals software, lettertypen en beelden, vallen onder de licentievoorwaarden van die derden."] },
      { h: "10. Hosting, onderhoud en diensten van derden", p: ["Afspraken over hosting en onderhoud worden apart vastgelegd. Voor diensten van derden, zoals hosting, domeinregistratie, formulierdiensten en koppelingen, gelden de voorwaarden van die partijen. Opdrachtnemer is niet aansprakelijk voor storingen of wijzigingen bij deze derden."] },
      { h: "11. Aansprakelijkheid", p: ["De aansprakelijkheid van opdrachtnemer is beperkt tot directe schade en tot maximaal het bedrag dat voor de betreffende opdracht is gefactureerd. Opdrachtnemer is niet aansprakelijk voor indirecte schade, zoals gederfde winst, omzetverlies of verlies van gegevens. Deze beperking geldt niet bij opzet of bewuste roekeloosheid."] },
      { h: "12. Overmacht", p: ["Bij overmacht, zoals ziekte, storingen bij derden of andere omstandigheden buiten de invloed van opdrachtnemer, worden de verplichtingen opgeschort zolang de overmacht duurt. Duurt de overmacht langer dan 60 dagen, dan mogen beide partijen de overeenkomst schriftelijk ontbinden."] },
      { h: "13. Geheimhouding en privacy", p: ["Beide partijen houden vertrouwelijke informatie die zij van elkaar ontvangen geheim. Opdrachtnemer gaat zorgvuldig om met persoonsgegevens, zoals beschreven in de privacyverklaring. Waar nodig sluiten partijen een verwerkersovereenkomst."] },
      { h: "14. Beëindiging", p: ["Beëindigt de opdrachtgever de opdracht tussentijds, dan betaalt hij het werk dat tot dat moment is verricht en de kosten die al zijn gemaakt."] },
      { h: "15. Toepasselijk recht", p: ["Op deze voorwaarden en alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Noord-Nederland, tenzij de wet anders bepaalt."] },
    ],
  },
  en: {
    meta: {
      title: "Terms and conditions | Kevin Rebuilds",
      description: "The general terms and conditions of Kevin Rebuilds for designing and building websites, web apps and automations.",
    },
    eyebrow: "Terms",
    title: "Terms and conditions",
    updated: UPDATED_EN + " · version 1.0",
    intro:
      "These general terms and conditions apply to all quotes, assignments and agreements of Kevin Rebuilds for designing, building and maintaining websites, web apps and automations.",
    note: "This is a translation for convenience. In case of any difference, the Dutch version (Algemene voorwaarden) prevails.",
    blocks: [
      { h: "1. Definitions", ul: ["Contractor: Kevin Rebuilds, based in Emmen, the Netherlands.", "Client: the party that gives Kevin Rebuilds an assignment.", "Assignment: the work described in the quote or proposal."] },
      { h: "2. Applicability", p: ["These terms apply to every quote and agreement between contractor and client. Deviations only apply if agreed in writing. The client's own terms and conditions do not apply."] },
      { h: "3. Quotes and proposals", p: ["Quotes and proposals are non-binding and valid for 30 days, unless stated otherwise. An assignment is formed as soon as the client accepts the quote in writing or by email."] },
      { h: "4. Execution", p: ["The contractor carries out the assignment carefully and to the best of their ability. Timelines are estimates and not strict deadlines, unless explicitly agreed otherwise."] },
      { h: "5. Client cooperation", p: ["The client provides the information, texts, images, access details and feedback needed for the assignment in good time. Delays may lead to an adjusted timeline or additional costs."] },
      { h: "6. Additional work", p: ["Work outside the description of the assignment is additional work. The contractor discusses additional work and its costs in advance and only carries it out after the client's approval."] },
      { h: "7. Prices and payment", p: ["All prices are in euros and exclude VAT, unless stated otherwise. Invoices are paid according to the terms in the quote. If no term was agreed, payment is due within 14 days of the invoice date. In case of late payment, the contractor may suspend the work and charge statutory interest and reasonable collection costs."] },
      { h: "8. Delivery and acceptance", p: ["After delivery, the client has 14 days to review the result and report any defects. Reported defects within the agreed assignment are fixed free of charge. After this period, or as soon as the result is put into use, the delivery is considered accepted."] },
      { h: "9. Intellectual property", p: ["After full payment, the client obtains the right to use the delivered result for the agreed purpose. The contractor may mention and show the result in their portfolio, unless agreed otherwise in writing. Third-party components such as software, fonts and images are subject to the licence terms of those third parties."] },
      { h: "10. Hosting, maintenance and third-party services", p: ["Arrangements for hosting and maintenance are agreed separately. Third-party services such as hosting, domain registration, form services and integrations are subject to those parties' terms. The contractor is not liable for outages or changes at these third parties."] },
      { h: "11. Liability", p: ["The contractor's liability is limited to direct damage and to no more than the amount invoiced for the assignment concerned. The contractor is not liable for indirect damage, such as lost profit, lost revenue or loss of data. This limitation does not apply in case of intent or deliberate recklessness."] },
      { h: "12. Force majeure", p: ["In case of force majeure, such as illness, third-party outages or other circumstances beyond the contractor's control, obligations are suspended for as long as it lasts. If force majeure lasts longer than 60 days, either party may terminate the agreement in writing."] },
      { h: "13. Confidentiality and privacy", p: ["Both parties keep confidential information received from each other secret. The contractor handles personal data carefully, as described in the privacy statement. Where necessary, the parties conclude a data processing agreement."] },
      { h: "14. Termination", p: ["If the client terminates the assignment early, the client pays for the work carried out and the costs incurred up to that moment."] },
      { h: "15. Governing law", p: ["Dutch law applies to these terms and all agreements. Disputes are submitted to the competent court in the Noord-Nederland district, unless the law provides otherwise."] },
    ],
  },
};
