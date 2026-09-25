# Google Bedrijfsprofiel, Search Console en Bing: stappenplan

Deze stappen doe je zelf, omdat ze inloggen op jouw Google- en Microsoft-account en verificatie van je bedrijf vragen. Alle teksten hieronder kun je zo kopiëren.

---

## 1. Google Bedrijfsprofiel (lokale vindbaarheid in Emmen)

**Waar:** https://business.google.com → *Nu beheren* (log in met je Google-account).

### Stappen
1. **Bedrijfsnaam:** `Kevin Rebuilds`
2. **Bedrijfscategorie** (hoofdcategorie): `Webdesigner`
   Aanvullende categorieën (bij *Profiel bewerken → Categorieën*): `Softwarebedrijf` en `Internetbureau` (kies wat Google aanbiedt en het dichtst in de buurt komt).
3. **Wil je een locatie toevoegen die klanten kunnen bezoeken?** → **Nee**. Je werkt online en ontvangt geen klanten op een adres, dus je wordt een *servicegebiedbedrijf*. Je thuisadres blijft verborgen.
4. **Servicegebied:** `Emmen`, `Drenthe`, en eventueel omliggende plaatsen (`Coevorden`, `Hoogeveen`, `Assen`) of `Nederland`.
5. **Contactgegevens:** je telefoonnummer (optioneel) en website `https://www.kevinrebuilds.com/`
6. **Verificatie:** Google vraagt meestal om een korte video of een code per post/telefoon. Volg de instructies. Zonder verificatie verschijnt je profiel niet.

### Beschrijving (max. 750 tekens, kopieer en plak)
> Kevin Rebuilds ontwerpt en bouwt websites, webapps en automatiseringen op maat voor ondernemers en bedrijven. Vanuit Emmen (Drenthe) werk ik voor bedrijven in de regio en in de rest van Nederland. Je werkt rechtstreeks met mij, van het eerste gesprek tot de oplevering. Denk aan een professionele bedrijfswebsite of landingspagina, een klantportaal of dashboard dat past bij jouw manier van werken, of een automatisering die je systemen koppelt en handmatig werk vermindert. Na een kennismaking ontvang je een helder voorstel met een duidelijke prijs.

### Diensten (bij *Diensten* toevoegen, zonder prijs)
| Dienst | Omschrijving |
| --- | --- |
| Website op maat | Professionele bedrijfswebsite of landingspagina, snel en mobielvriendelijk. |
| Webapp / klantportaal | Klantportaal, dashboard of interne tool op maat. |
| Automatisering | Systemen koppelen en handmatig werk verminderen. |

### Links met meting (optioneel)
Gebruik als website-link: `https://www.kevinrebuilds.com/?utm_source=google&utm_medium=organic&utm_campaign=bedrijfsprofiel`
Zo zie je later in Search Console en statistieken hoeveel bezoekers via je profiel komen.

### Na het aanmaken
- **Foto's:** je portret (`src/assets/kevin-head.webp`) als profielfoto, je logo (favicon) en een paar screenshots van je werk (bijvoorbeeld Different Hair!).
- **Openingstijden:** vul je werktijden in (bijv. ma–vr 9:00–17:00).
- **Eerste bericht (post):** bijvoorbeeld een aankondiging van je vernieuwde website, met een link naar `/websites/`.
- **Reviews:** stuur Frank (Different Hair!) de reviewlink (*Profiel → Reviews vragen*). Voorbeeldbericht:
  > Hoi Frank, ik heb een Google-profiel voor Kevin Rebuilds aangemaakt. Zou je een korte review willen schrijven over hoe het bouwen van de Different Hair-website is gegaan? Dat helpt me enorm. Hier is de link: [reviewlink]. Alvast bedankt!
- Reageer altijd op reviews, ook kort.

---

## 2. Google Search Console (inzicht in je vindbaarheid)

**Waar:** https://search.google.com/search-console → *Property toevoegen*.

### Aanbevolen: verificatie via Cloudflare (DNS)
1. Kies **Domein** en vul in: `kevinrebuilds.com`
2. Google toont een **TXT-record** (`google-site-verification=…`).
3. Ga in Cloudflare naar **kevinrebuilds.com → DNS → Records → Add record**:
   - Type: `TXT` · Name: `@` · Content: de code van Google → *Save*.
4. Klik in Search Console op **Verifiëren** (kan enkele minuten duren).

Met deze methode hoef je niets aan de website te veranderen, en je ziet alle varianten van je domein (met en zonder www).

### Alternatief: verificatie via de website (meta-tag)
Kies **URL-voorvoegsel** → `https://www.kevinrebuilds.com/` → methode **HTML-tag**. Kopieer alleen de code tussen `content="…"` en bouw de site zo:

```powershell
$env:PUBLIC_GOOGLE_SITE_VERIFICATION="<code>"; npm run build
```

Upload daarna `dist/` opnieuw en klik op *Verifiëren*.

### Na verificatie
1. **Sitemaps** → vul in: `sitemap.xml` → *Indienen*.
2. **URL-inspectie** → plak `https://www.kevinrebuilds.com/` → *Indexering aanvragen*. Doe hetzelfde voor `/en/`, `/websites/`, `/webapps/` en `/automatisering/`.
3. Kijk na 2–4 weken bij **Prestaties** op welke zoekwoorden je verschijnt. Dat zijn de beste onderwerpen voor blogs.

---

## 3. Bing Webmaster Tools (Bing, DuckDuckGo en ChatGPT-zoeken)

**Waar:** https://www.bing.com/webmasters → log in met een Microsoft-account.

1. Kies **Importeren vanuit Google Search Console**. Dit is het snelst, want je site en sitemap worden automatisch overgenomen.
2. Of voeg de site handmatig toe en verifieer via Cloudflare (CNAME/TXT) of via een meta-tag:
   ```powershell
   $env:PUBLIC_BING_SITE_VERIFICATION="<code>"; npm run build
   ```
3. Controleer bij **Sitemaps** dat `https://www.kevinrebuilds.com/sitemap.xml` is ingediend.

Bing is belangrijk voor AI-zoeken: ChatGPT-search en Copilot gebruiken de Bing-index.
