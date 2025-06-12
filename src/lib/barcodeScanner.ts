/**
 * Mock implementation of barcode scanning functionality.
 * This file provides simulated barcode scanning capabilities for development and testing.
 */

/**
 * Simulates scanning a barcode from a video stream.
 *
 * @param videoElement - The HTMLVideoElement displaying the video stream.
 * @returns A promise that resolves with the scanned barcode string or null if no barcode is found.
 */
export function scanBarcode(videoElement: HTMLVideoElement): Promise<string | null> {
  return new Promise((resolve, reject) => {
    try {
      // Simulate scanning delay
      setTimeout(() => {
        // Mock barcode database
        const mockBarcodes = [
          '3017620422003', // Nutella
          '3017620425035', // Pâtes Panzani
          '3245390096265', // Yaourt Nature Danone
          '3228857000166', // Lait Demi-écrémé Lactel
          '3560070976478', // Jus d'orange Carrefour
          '123456789012'   // Produit Test
        ];
        
        // Randomly select a barcode
        const randomIndex = Math.floor(Math.random() * mockBarcodes.length);
        const barcode = mockBarcodes[randomIndex];
        
        console.log('Mock barcode detected:', barcode);
        resolve(barcode);
      }, 2000); // Simulate 2 second scanning process
    } catch (err) {
      console.error("Error in mock barcode scanner:", err);
      reject(err);
    }
  });
}

/**
 * Stops the current barcode scanning process.
 * In this mock implementation, this is a no-op function.
 */
export function stopScan(): void {
  console.log("Mock barcode scanner stopped.");
}

/**
 * Simulates fetching product information based on a barcode.
 * In a real application, this would call an external API like Open Food Facts.
 *
 * @param barcode - The barcode string.
 * @returns A promise that resolves with product information or null if not found.
 */
export async function getProductInfo(barcode: string): Promise<any | null> {
  console.log(`Attempting to get product info for barcode: ${barcode}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock product database
  const mockProducts: Record<string, any> = {
    '3017620422003': {
      name: 'Nutella',
      category: 'Épicerie',
      quantity: '400g',
      expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    },
    '3017620425035': {
      name: 'Pâtes Panzani',
      category: 'Féculents',
      quantity: '500g',
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    },
    '3245390096265': {
      name: 'Yaourt Nature Danone',
      category: 'Produits laitiers',
      quantity: '4x125g',
      expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    },
    '3228857000166': {
      name: 'Lait Demi-écrémé Lactel',
      category: 'Produits laitiers',
      quantity: '1L',
      expirationDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    },
    '3560070976478': {
      name: 'Jus d\'orange Carrefour',
      category: 'Boissons',
      quantity: '1L',
      expirationDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    },
    '123456789012': {
      name: 'Produit Test',
      category: 'Test',
      quantity: '100g',
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    }
  };

  // Check if barcode exists in our mock database
  if (barcode in mockProducts) {
    console.log("Product found:", mockProducts[barcode]);
    return mockProducts[barcode];
  }
  
  // For unknown barcodes, return a generic product
  return {
    name: `Produit (${barcode})`,
    category: 'Divers',
    quantity: '1 unité',
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
  };
}