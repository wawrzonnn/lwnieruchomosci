// =====================================================================
// LW Nieruchomości — Design Tokens (wariant 1a "ciepły / ludzki")
// Wersja JS/TS dla SvelteKit — importuj gdziekolwiek: import { tokens } from '$lib/design-tokens';
// Wartości 1:1 z zatwierdzonego projektu.
// =====================================================================

export const tokens = {
  color: {
    // tła
    bgPage:   '#E9E7E1',
    bgSite:   '#FBF8F2',
    bgCard:   '#FFFFFF',
    bgCream:  '#F1EFE6',
    bgCream2: '#F5F1E7',
    bgNav:    'rgba(251,248,242,.9)',
    // zieleń (marka)
    green:       '#2C4A38',
    greenInk:    '#23271F',
    greenSpec:   '#2C3A2E',
    greenBorder: '#363A2E',
    // złoto (akcent)
    gold:      '#B4894C',
    goldLight: '#E9D19A',
    goldSoft:  '#D9BE84',
    goldLogo:  '#E9D9AE',
    // tekst
    text:       '#23271F',
    textMuted:  '#6C7064',
    textMuted2: '#6E6C62',
    textNav:    '#4A4E42',
    textLabel:  '#9A8F6E',
    textQuote:  '#3B3F34',
    textOnGreen:'#F3EEE1',
    // obramowania
    border:        '#EFEADD',
    borderDivider: '#E8E2D5',
    borderNav:     '#ECE6D9',
    // nakładki
    overlayStrip: 'rgba(18,26,20,.62)',
    overlayCat:   'rgba(18,26,20,.44)',
    heroGradient: 'linear-gradient(105deg, rgba(18,26,20,.66) 0%, rgba(18,26,20,.3) 48%, rgba(18,26,20,.12) 100%)',
  },
  font: {
    display: "'Newsreader', Georgia, serif",
    body:    "'Hanken Grotesk', system-ui, sans-serif",
    // 'JetBrains Mono' — tylko wariant 1b, w 1a nieużywany
  },
  fontSize: {
    h1: '64px', h2: '38px', h3: '27px',
    offer: '21px', cat: '25px', svcTitle: '22px', stat: '34px',
    lead: '18px', body: '16px', bodyLg: '17px', sm: '15px', xs: '14px',
    eyebrow: '12px', micro: '11px',
  },
  space: {
    sectionX: '48px', gapCards: '24px', gapCats: '20px', gapCols: '56px',
    siteWidth: '1440px',
  },
  radius: { pill: '999px', card: '18px', btn: '12px', logo: '12px', sm: '8px' },
  shadow: {
    offer:  '0 20px 44px -30px rgba(30,40,30,.55)',
    cat:    '0 16px 30px -22px rgba(30,40,30,.5)',
    panel:  '0 26px 54px -32px rgba(30,40,30,.6)',
    search: '0 30px 60px -30px rgba(30,40,30,.4)',
    photo:  '0 30px 60px -34px rgba(0,0,0,.5)',
  },
};

export default tokens;
