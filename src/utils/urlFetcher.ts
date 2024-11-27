import * as cheerio from 'cheerio';

export const fetchTextFromUrl = async (url: string): Promise<string> => {
  try {
    // Utilizziamo un proxy CORS per aggirare le restrizioni
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Errore durante il recupero della pagina');
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Rimuove elementi non testuali
    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    $('iframe').remove();
    $('header').remove();
    $('nav').remove();
    $('footer').remove();
    $('aside').remove();
    $('[role="complementary"]').remove();
    $('[role="banner"]').remove();
    $('[role="navigation"]').remove();
    
    // Estrae il contenuto principale
    let mainContent = '';
    
    // Cerca il contenuto principale in ordine di priorità
    const selectors = [
      'article',
      '[role="main"]',
      'main',
      '.content',
      '.post-content',
      '.article-content',
      '#content',
      '.main-content'
    ];
    
    for (const selector of selectors) {
      const element = $(selector);
      if (element.length > 0) {
        mainContent = element.text();
        break;
      }
    }
    
    // Se non trova contenuto principale, prende il body
    if (!mainContent) {
      mainContent = $('body').text();
    }
    
    // Pulisce il testo
    return mainContent
      .replace(/\s+/g, ' ')  // Normalizza gli spazi
      .replace(/\n+/g, '\n') // Normalizza le newline
      .replace(/[^\S\n]+/g, ' ') // Rimuove spazi multipli mantenendo newline
      .trim();
      
  } catch (error) {
    console.error('Errore durante il fetch:', error);
    throw new Error('Errore durante il recupero del contenuto della pagina');
  }
};