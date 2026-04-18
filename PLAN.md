# PLAN.md — thebiomedicalgeek.com

> File di pianificazione del progetto. Aggiornare dopo ogni sessione di lavoro.
> Ultima modifica: 2026-04-13

---

## 1. Stato del sito

### Architettura generale

Sito personale portfolio + blog in **vanilla HTML/CSS/JS** — nessun framework, nessun build step, nessun package manager. Hosting su **Netlify** con deploy automatico da GitHub (`main` branch → produzione in ~30s).

Tre pagine principali:
- `index.html` — homepage (hero, about, experience timeline, skills, contatto + modal CV)
- `blog.html` — indice blog; fetcha e parsa tutti i post registrati client-side
- `post.html` — reader condiviso; fetcha un singolo `.md` via URL param `?p=slug`

I post vivono in `posts/*.md` con YAML frontmatter (`title`, `date`, `category`, `excerpt`). Ogni slug va aggiunto manualmente all'array `POST_FILES` in `blog.html`. Le immagini vanno in `posts/images/`.

### Scelte tecniche importanti

| Scelta | Dettaglio |
|---|---|
| **Markdown parser custom** | `renderMarkdown()` in `post.html` — parser inline senza librerie. Supporta h2/h3, bold/em, code, pre (con lang), ul/ol, blockquote, hr, immagini, figure con caption, video mp4, embed YouTube/Vimeo, link con validazione URL |
| **Mermaid.js condizionale** | Caricato via `await import()` dentro `init()` solo se il post contiene blocchi `.mermaid`. Risparmia ~700KB su tutti i post senza diagrammi |
| **Prism.js** | 7 linguaggi caricati da CDN (Python, SQL, Bash, JS, Java, R, YAML) per syntax highlighting |
| **Netlify Function** | `netlify/functions/send-cv.js` — invia il CV PDF via nodemailer/Gmail. Richiede env vars: `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `SITE_URL` |
| **Design system** | CSS inline in ogni file (limite architetturale noto). Variabili condivise: `--terra` (#00D4FF), `--ink` (#0D1117), `--cream` (#E8EDF2). Font: Space Mono (heading), JetBrains Mono (label/UI), IBM Plex Sans (body) |
| **Security** | CSP via `netlify.toml`. XSS prevenuto nel parser markdown (validazione schema URL: solo `https?://`, `mailto:`, `/`, `#`). CORS ristretto a `SITE_URL` nella function |
| **Accessibilità** | Skip-to-content link, `aria-expanded` dinamico sul nav toggle, `:focus-visible` con outline visibile, `prefers-reduced-motion`, touch target ≥44px, `<main>` landmark su tutte le pagine |
| **SEO** | Meta description, OG tags, Twitter Card, canonical, `robots.txt`, `sitemap.xml` (4 URL, aggiornamento manuale) |
| **Footer year** | Anno dinamico via JS `new Date().getFullYear()` |

### Miglioramenti già implementati (sessione 2025-2026)

- [x] Fix IntersectionObserver duplicato (nav active state)
- [x] XSS nel parser markdown (validazione URL)
- [x] CORS ristretto da `*` a `SITE_URL` nella Netlify Function
- [x] `aria-expanded` sul nav toggle (dinamico + reset su link click)
- [x] `:focus-visible` con outline su tutti e 3 i file
- [x] Touch target nav toggle ≥44×44px
- [x] Modal scroll lock (`body.overflow = hidden`)
- [x] `<main id="main-content">` in tutti i file (era `<div>` in blog.html)
- [x] Skip-to-content link (tutti e 3 i file)
- [x] `prefers-reduced-motion` CSS (tutti e 3 i file)
- [x] `netlify.toml` con CSP, X-Frame-Options, nosniff, Referrer-Policy
- [x] `sitemap.xml` creato
- [x] `robots.txt` creato
- [x] `favicon.svg` creato (32×32, "GQ" in --terra su --ink)
- [x] Meta SEO completi (description, OG, Twitter Card, canonical) su tutte le pagine
- [x] Mermaid.js: supporto blocchi nel parser + caricamento condizionale
- [x] Category labels blog preview: "data engineering"→"data eng", "sport & mindset"→"sport"
- [x] Footer year dinamico

### Miglioramenti ancora da fare

| # | Fix | Priorità | Note |
|---|---|---|---|
| 1 | `og:image` — immagine 1200×630px per social sharing | Media | Richiede creare un asset grafico |
| 2 | CSS shared stylesheet | Bassa | Refactor architetturale: estrarre CSS comune in un file esterno |
| 3 | `sitemap.xml` auto-aggiornata | Bassa | Richiederebbe un build step o Netlify plugin |
| 4 | Blog preview cards in `index.html` collegate ai post reali (href attuale: `blog.html`) | Bassa | Collegare le card direttamente a `post.html?p=slug` |
| 5 | ~~Protezione anti-bot form CV — honeypot + timing check~~ | ~~Alta~~ | ✅ Implementato. Upgrade a Cloudflare Turnstile se i bot continuano. |

---

## 2. Backlog articoli

### Approvati ✅

| ID | Titolo | Categoria | Fonte |
|---|---|---|---|
| A | "Quando la rete neurale non sa di non sapere" | `machine learning eng` | Tesi: uncertainty quantification, MC Dropout, TCP vs MCP |
| C | "Biomeccanica dell'anca: quanto pesa stare in piedi su una gamba sola" | `biomed eng` | Biomeccanica lez. 06-07 |
| D | "Cosa succede al tuo corpo in un crash a 50 km/h" | `biomed eng` | Biomeccanica lez. 16 |
| E | "Osseointegrazione: perché un impianto dentale è più ingegneria che medicina" | `biomed eng` | Biomeccanica lez. 18 + 03-04 |
| F | "Il sonno spiegato con i dati: cosa succede davvero di notte" | `health` | Tesi + sleep literature |
| 2 | "La spalla: l'articolazione più mobile del corpo (e il prezzo che si paga)" | `biomed eng` | Biomeccanica lez. 13 |
| 3 | "Quanto pesa la testa? La meccanica della colonna vertebrale" | `biomed eng` | Biomeccanica lez. 15 |
| 4 | "La caviglia regge 5 volte il tuo peso — come è possibile" | `biomed eng` | Biomeccanica lez. 11 |
| 6 | "Come funziona una protesi di ginocchio" | `biomed eng` | Biomeccanica lez. 10 |
| 8 | "La legge di Wolff: l'osso si adatta al carico (e cosa succede agli astronauti)" | `biomed eng` | Biomeccanica lez. 03-04 |
| 9 | "Viti e piastre: come l'ingegneria fissa una frattura" | `biomed eng` | Biomeccanica lez. 08 |
| 10 | "Fratture da stress: perché i corridori si rompono il piede senza cadere" | `biomed eng` | Biomeccanica lez. 03 |
| 11 | "Osteoporosi: quando l'osso diventa spugna" | `biomed eng` | Biomeccanica lez. 02-03 |
| 12 | "L'osso è più resistente dell'acciaio per unità di peso — la struttura che lo rende possibile" | `biomed eng` | Biomeccanica lez. 02 |
| 23 | "K-complexes e sleep spindles: i segnali misteriosi del cervello addormentato" | `health` | Tesi + sleep literature |
| 24 | "Apnea del sonno: quando la respirazione si ferma di notte (e tu non lo sai)" | `health` | Tesi + letteratura |
| 25 | "Sei un gufo o un'allodola? I cronotipi e il gene che decide per te" | `health` | Fisiologia circadiana |
| 26 | "L'adenosina: la molecola che ti fa venire sonno (e perché il caffè funziona davvero)" | `health` | Fisiologia del sonno |
| 27 | "REM behavior disorder: quando reciti i tuoi sogni nel sonno" | `health` | Neurologia clinica |
| 28 | "Sonno e memoria: cosa fa il cervello di notte con quello che hai studiato" | `health` | Neuroscienze |
| 29 | "HRV nel sonno: il cuore che rivela la salute del sistema nervoso autonomo" | `health` | Medicina sportiva |

### Da valutare ⬜

#### `biomed eng` — Articolazioni
| ID | Titolo | Fonte |
|---|---|---|
| 1 | "Perché il LCA si rompe sempre nello stesso modo" | Biomeccanica lez. 09 |
| 5 | "Gomito del tennista: la scienza di un'infiammazione che devasta" | Biomeccanica lez. 14 |
| 7 | "L'apparato locomotore: il sistema di leve più efficiente che esista" | Biomeccanica lez. 12 |

#### `biomed eng` — Osso e fratture
*(tutti approvati — vedi sezione Approvati)*

#### `biomed eng` — Fluidi biologici
| ID | Titolo | Fonte |
|---|---|---|
| 13 | "Il flusso del sangue nell'aorta non è Poiseuille — perché il cuore complica tutto" | Fluidi: Morbiducci |
| 14 | "Dove nascono le placche aterosclerotiche — la risposta è nella fluidodinamica" | Fluidi: "beyond Poiseuille flow" |
| 15 | "Valvole cardiache: quattro porte che si aprono 100.000 volte al giorno" | Fluidi: fluidi_biologici |
| 16 | "Cosa sono davvero 120/80 e perché cambiano" | Fluidi: idrostatica |
| 17 | "I capillari e il paradosso di Laplace: perché i vasi più piccoli non esplodono" | Fluidi: idrostatica |
| 18 | "Il sangue non è un liquido normale: reologia e flusso non-newtoniano" | Fluidi: emodinamica |

#### `biomed eng` — Dispositivi e storia
| ID | Titolo | Fonte |
|---|---|---|
| 19 | "BIOMEMS: i chip che vivono dentro il tuo corpo" | BIOMEMS.pdf |
| 20 | "Il pacemaker: 70 anni di ingegneria salvavita in 30 grammi" | Cultura generale + biomed |
| 21 | "Come funziona una risonanza magnetica — senza formule" | Cultura generale |
| 22 | "Ultrasuoni diagnostici: il suono che vede dentro il corpo" | Cultura generale |
| 37 | "Imhotep e la prima protesi della storia: 3000 anni fa in Egitto" | Biomeccanica lez. 01 |
| 39 | "Legge di Wolff e l'ingegneria strutturale: forma è funzione" | Biomeccanica lez. 03 |

#### `health` — Sonno e neuroscienze
*(tutti approvati — vedi sezione Approvati)*

#### `health` — Biochimica della vita
| ID | Titolo | Fonte |
|---|---|---|
| 41 | "ATP: produciamo 40 kg di energia al giorno — come è possibile" | Biochimica: metabolismo |
| 42 | "Aminoacidi essenziali e BCAA: la scienza vera dietro il marketing sportivo" | Biochimica: proteine |

#### `machine learning eng`
| ID | Titolo | Fonte |
|---|---|---|
| 30 | "Il problema del label noise: quando i dottori non sono d'accordo tra loro" | Tesi |
| 31 | "Perché la tua rete neurale mente sulla fiducia — e come scoprirlo" | Tesi |
| 32 | "L'AI che classifica il sonno: quello che funziona e quello che non funziona ancora" | Tesi |

#### `sport`
| ID | Titolo | Fonte |
|---|---|---|
| 33 | "Cadenza di corsa: perché 180 spm non è un mito (e i dati lo dimostrano)" | Biomeccanica corsa |
| 34 | "La posizione in bici: aerodinamica, potenza e schiena in conflitto" | Biomeccanica + triathlon |
| 35 | "DOMS: il dolore muscolare post-allenamento non è acido lattico (mai lo è stato)" | Fisiologia muscolare |
| 36 | "VO2max: il numero che definisce un atleta (e fino a dove si può spingere)" | Fisiologia |

#### `data eng`
| ID | Titolo | Fonte |
|---|---|---|
| H | "Leggere segnali EEG in Python: parsing EDF da zero con MNE" | Tesi: dhedfreader.py |

### Scartati ❌
| ID | Titolo | Motivo |
|---|---|---|
| B | "Da TensorFlow 1.14 a Keras/TF2: migrare un modello" | Troppo tecnico/specifico |
| G | "Telemedicina cardiovascolare" | Non abbastanza interessante |
| I | "WSL2 + CUDA + Conda: setup ML su Windows" | Troppo tecnico/tutorial |
| 38 | "Leonardo da Vinci e la biomeccanica" | Scartato |

---

## 3. Esplorazione materiale Polito

Base path: `C:/Users/heart/Documents/claude_food/Polito/`

### Sbobine — Copertura per cartella

Legenda priorità: 🔴 alta · 🟡 media · ⚪ bassa/skip · 📦 solo zip (serve estrazione)

| Priorità | Cartella | Argomento reale | File | % letta | Articoli proposti |
|---|---|---|---|---|---|
| 🔴 | `BIOMECCANICA appunti` | Biomeccanica articolare, osso, crash, impianti, protesi | 18 lezioni PDF + 10 appunti | **5%** | C, D, E, 1-12, 37, 39 |
| 🔴 | `BIOCHIMICA_sbobine` | Chimica organica, proteine/enzimi, carboidrati, DNA, lipidi, metabolismo (Lez00-27 + 6 sbobine tematiche + 8 tutorial + 11 esercizi) | ~53 DOCX | **0%** | 40, 41, 42 |
| 🔴 | `FLUIDI appunti` + `Fluidi_Sbobine` | Emodinamica, flusso pulsatile, turbolenza (Kolmogorov), beyond Poiseuille, fluidi biologici | ~30 PDF | **5%** | 13-18 |
| 🔴 | `BIOIMM` → **Bioimmagini** | MRI (`MR.docx/pdf`), Ultrasuoni (`US.docx/pdf`), dispensa completa (`combinepdfbioimmagini.pdf`) | ~5 file | **0%** | 21, 22 + nuovi |
| 🔴 | `BES` → **Bioelettronica e Strumentazione** | Biopotenziali, ECG/EEG, defibrillatore, elettrobisturi, sicurezza elettrica dispositivi medici (Lez00-38 + 13 esercizi + 6 sbobine tematiche: Normative, Sicurezza, Biopotenziali, ElettroBisturi, Defibrillatore, ECG/EEG) | ~60 DOCX | **0%** | nessuno ancora — potenziale altissimo |
| 🔴 | `CIDB` → **ML per Dati Biomedici** | SOM, KNN, SVM, deep learning, fuzzy logic, Bayes, regressione, clustering — tutto applicato al biomedico (17 PDF slide + appunti merged) | ~20 PDF | **0%** | nessuno ancora — ML applicato |
| 🔴 | `BIOMEMS appunti` + `BIOMEMS sbobine` | Microsensori impiantabili, lab-on-chip, drug delivery, COMSOL (Lez00-21) | 1 PDF + 21 DOCX | **5%** | 19 |
| 🔴 | `BIOINFO sbobine` | Genomica, sequenze, banche dati, allineamento (Lez01-21 + Lab 01-08) | 28 DOCX | **3%** | nessuno ancora |
| 🟡 | `B&C_sbobine` | Biomateriali e colture cellulari (1 sbobine DOCX + esercitazioni + simulazione esame) | 4 DOCX | **0%** | nessuno ancora |
| 🟡 | `PSM appunti` | Progettazione software medicali (solo domande d'esame + foto, poco materiale) | ~3 file | **0%** | potenziale basso |
| 📦 | `BIONANO.zip` | Bionanotecnologie | solo zip | **0%** | nessuno ancora |
| 📦 | `ESB.zip` | sconosciuto | solo zip | **0%** | nessuno ancora |
| 📦 | `EIM.zip` | sconosciuto | solo zip | **0%** | nessuno ancora |
| 📦 | `DSM.zip` | sconosciuto | solo zip | **0%** | nessuno ancora |
| ⚪ | `SOLIDI appunti` + `SOLIDI_sbobine` | Meccanica dei solidi | ~5 file | **0%** | skip |
| ⚪ | `3D sbobine` | Modellazione 3D strutture biologiche | sconosciuto | **0%** | skip |
| ⚪ | `IOT sbobine` | Internet of Things | sconosciuto | **0%** | skip |
| ⚪ | `TELEMEDICINA appunti` + `_sbobine` | Telemedicina | 2 PDF | **35%** | skip |
| — | `BIOCHIMICA_appunti` | Temi d'esame (duplicati, poco valore) | ~50 PDF | **10%** | skip |

### TESI — Copertura

| Sotto-progetto | Contenuto | % |
|---|---|---|
| `prove_DSNL` (TF1.14) | Codice Python letto bene (train.py, model.py, trainer.py, data_loader) | **65%** |
| `prove_DSNL_keras` (TF2) | Struttura vista, codice parzialmente letto | **40%** |
| `prove_corbiere` | README letto, scopo chiaro (MCP vs TCP su SVHN) | **50%** |
| `usleep` | Solo struttura e TODO | **20%** |
| Note/mail | `mail.txt` e `things-to-do.txt` letti | **80%** |
| Dataset (EDF files) | File binari — non leggibili | N/A |

### Cheatsheets — Copertura

22 file TXT tutti descritti → **80%**

### Stima globale

**~10% del contenuto totale effettivamente letto.**
Il restante 90% è stato identificato per nome file — gli articoli proposti si basano su titoli + conoscenza generale degli argomenti, non sui contenuti specifici delle sbobine.

### Ordine di esplorazione concordato

Priorità alta 🔴:
1. `BIOMECCANICA appunti` — 18 lezioni PDF, contenuto ancora non letto
2. `BIOCHIMICA_sbobine` — 28 lezioni + 6 sbobine tematiche + 8 tutorial
3. `BES` (Bioelettronica e Strumentazione) — 60 DOCX: defibrillatore, ECG/EEG, elettrobisturi, biopotenziali — potenziale molto alto
4. `CIDB` (ML per Dati Biomedici) — SVM, fuzzy, Bayes, deep learning su dati clinici
5. `FLUIDI appunti` + `Fluidi_Sbobine` — emodinamica, flusso pulsatile, turbolenza
6. `BIOIMM` (Bioimmagini) — MRI, Ultrasuoni
7. `BIOMEMS sbobine` — 21 lezioni (Lez00-21), molto più ricco del singolo PDF
8. `BIOINFO sbobine` — genomica, sequenze, allineamento

Priorità media 🟡:
9. `B&C_sbobine` — biomateriali e colture (poco materiale)
10. `PSM appunti` — software medicali (poco materiale)

Da estrarre prima 📦:
11. `BIONANO.zip`, `ESB.zip`, `EIM.zip`, `DSM.zip`

Skip ⚪:
- `SOLIDI`, `3D`, `IOT`, `TELEMEDICINA`
