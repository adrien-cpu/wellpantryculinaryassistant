import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';

/**
 * Global variable to store the current barcode reader instance.
 * This helps in stopping the scanning process when needed.
 */
let codeReader: BrowserMultiFormatReader | null = null;

/**
 * Scans a barcode from a video stream.
 *
 * @param videoElement - The HTMLVideoElement displaying the video stream.
 * @returns A promise that resolves with the scanned barcode string or null if no barcode is found.
 */
export function scanBarcode(videoElement: HTMLVideoElement): Promise<string | null> {
  // If a reader instance already exists, clear it before starting a new scan.
  if (codeReader) {
    codeReader.reset();
    codeReader = null;
  }

  codeReader = new BrowserMultiFormatReader();

  return new Promise((resolve, reject) => {
    try {
      codeReader!
        .decodeFromVideoDevice(undefined, videoElement, (result: Result | null, error: Error | null) => {
          if (result) {
            console.log('Barcode detected:', result.getText());
            stopScan(); // Stop scanning after detection
            resolve(result.getText());
          }
          
          // Nous ne rejetons pas la promesse sur les erreurs de scan normales
          // car elles se produisent constamment pendant la recherche de codes-barres
          if (error && error.name !== 'NotFoundException') {
            console.error("Scanning error:", error);
          }
        })
        .catch((err) => {
          console.error("Error starting barcode scanner:", err);
          reject(err);
        });
    } catch (err) {
      console.error("Error initializing barcode scanner:", err);
      reject(err);
    }
    
    // Timeout après 15 secondes si aucun code-barres n'est trouvé
    setTimeout(() => {
      if (codeReader) {
        resolve(null);
      }
    }, 15000);
  });
}

/**
 * Stops the current barcode scanning process.
 */
export function stopScan(): void {
  if (codeReader) {
    codeReader.reset();
    codeReader = null;
    console.log("Barcode scanner stopped.");
  }
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
  
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Base de données simulée de produits
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

  // Vérifier si le code-barres existe dans notre base de données simulée
  if (barcode in mockProducts) {
    console.log("Product found:", mockProducts[barcode]);
    return mockProducts[barcode];
  }
  
  // Pour les codes-barres inconnus, retourner un produit générique
  return {
    name: `Produit (${barcode})`,
    category: 'Divers',
    quantity: '1 unité',
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
  };
}