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
    // Using the sorting guide page which should contain waste items
    const response = await axios.get('https://www.betersorteren.be/nl/sorteergids');
    const $ = cheerio.load(response.data);
    const wasteItems: ScrapedWasteItem[] = [];

    // Select all waste item elements from the sorting guide
    $('.waste-item, .sorting-item').each((_, element) => {
      const item = $(element);
      const name = item.find('h3, .item-title').text().trim();
      const category = item.find('.category, .waste-type').text().trim();
      const imageUrl = item.find('img').attr('src') || '';
      const description = item.find('.description, .sorting-info').text().trim();

      if (name && category) {
        wasteItems.push({
          name,
          category,
          imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://www.betersorteren.be${imageUrl}`,
          description
        });
      }
    });

    return wasteItems;
  } catch (error) {
    console.error('Error scraping waste items:', error);
    return [];
  }
}

// Function to initialize the data
export async function initializeWasteData() {
  const items = await scrapeWasteItems();
  console.log('Scraped waste items:', items);
  return items;
}