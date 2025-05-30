// src/lib/barcodeScanner.ts

import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';

/**
 * Global variable to store the current barcode reader instance.
 * This helps in stopping the scanning process when needed.
 */
let codeReader: BrowserMultiFormatReader | null = null;

/**
 * Placeholder function for scanning a barcode from a video stream.
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

  const hints = new Map();
  // You can specify which barcode formats to look for to improve performance
  // hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.EAN_13, BarcodeFormat.QR_CODE]);

  return new Promise((resolve, reject) => {
    codeReader!
      .decodeFromVideoDevice(undefined, videoElement, (result: Result | null, error: Error | null) => {
        if (result) {
          // Barcode found
          console.log('Barcode detected:', result.getText());
          codeReader?.reset(); // Stop scanning after detection
          codeReader = null;
          resolve(result.getText());
        }

        // Optionally handle errors, but for continuous scanning,
        // errors like 'NotFoundException' are expected between detections.
        // console.error(error);
      })
      .catch((err) => {
        console.error("Error starting barcode scanner:", err);
        reject(err); // Reject the promise on scanner start error
      });
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
 * In a real application, this would call an external API.
 *
 * @param barcode - The barcode string.
 * @returns A promise that resolves with product information or null if not found.
 */
export async function getProductInfo(barcode: string): Promise<any | null> {
  console.log(`Attempting to get product info for barcode: ${barcode}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data: return product info for a specific barcode
  if (barcode === '123456789012') {
    console.log("Mock product found for barcode 123456789012");
 return {
 name: 'Mock Product Example',
 category: 'Mock Category',
 expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
 };
  } else {
    console.log("No mock product found for this barcode.");
 return null; // Product not found
  }
}