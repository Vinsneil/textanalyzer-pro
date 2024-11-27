import * as cheerio from 'cheerio';

export const fetchTextFromUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Rimuove script, stili e altri elementi non testuali
    $('script').remove();
    $('style').remove();
    $('noscript').remove();
    $('iframe').remove();
    
    // Estrae il testo dal body
    const text = $('body').text()
      .replace(/\s+/g, ' ')  // Normalizza gli spazi
      .trim();
    
    return text;
  } catch (error) {
    throw new Error('Errore durante il recupero del contenuto della pagina');
  }
};