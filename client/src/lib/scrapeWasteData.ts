import axios from 'axios';
import * as cheerio from 'cheerio';

interface ScrapedWasteItem {
  name: string;
  category: string;
  imageUrl: string;
  description?: string;
}

async function scrapeWasteItems(): Promise<ScrapedWasteItem[]> {
  try {
    // Add headers to make request more browser-like
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'nl-BE,nl;q=0.9,en-US;q=0.8,en;q=0.7',
      'Connection': 'keep-alive',
    };

    // Try the main sorting guide URL
    console.log('Attempting to fetch data from betersorteren.be...');
    const urls = [
      'https://www.betersorteren.be/nl/sorteergids',
      'https://www.betersorteren.be/nl/afvalwijzer',
      'https://www.betersorteren.be/nl'
    ];

    for (const url of urls) {
      console.log(`Trying URL: ${url}`);
      const response = await axios.get(url, { headers });
      console.log(`Response status for ${url}:`, response.status);
      console.log('Response headers:', response.headers);
      console.log('First 500 chars of response:', response.data.substring(0, 500));

      const $ = cheerio.load(response.data);

      // Log the HTML structure
      console.log('Page title:', $('title').text());
      console.log('Main content classes:', $('#main-content').attr('class'));

      // Try different selectors that might contain waste items
      const selectors = [
        '.waste-item', 
        '.sorting-guide-item',
        '.item-container',
        '.waste-category',
        'article'
      ];

      for (const selector of selectors) {
        console.log(`Checking selector: ${selector}`);
        console.log(`Found ${$(selector).length} elements`);
      }
    }

    // Return empty array for now while debugging
    return [];

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch data:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        message: error.message
      });
    } else {
      console.error('Unexpected error during scraping:', error);
    }
    return [];
  }
}

export async function initializeWasteData() {
  const items = await scrapeWasteItems();
  console.log('Scraped waste items:', items);
  return items;
}