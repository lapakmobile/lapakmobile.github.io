import { Product } from '../types';

/**
 * Service to fetch real-time prices for products.
 * In a real application, this would call a backend API like VIP Reseller or Digiflazz.
 * For this demo, we simulate an API call with random price fluctuations.
 */
export const priceService = {
  /**
   * Fetches updated prices for a specific product.
   * @param productId The ID of the product to fetch prices for.
   * @returns A promise that resolves to the updated product or null if not found.
   */
  async getUpdatedPrices(product: Product): Promise<Product> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Return the original product with real-time flag
    // We remove the fluctuation logic to keep prices stable as requested
    return {
      ...product,
      isRealTime: true
    };
  }
};
