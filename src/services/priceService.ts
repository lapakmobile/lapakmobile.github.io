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
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate price fluctuation (±5%)
    const updatedPackages = product.packages.map(pkg => {
      const currentPrice = parseInt(pkg.price.replace(/[^0-9]/g, '')) || 0;
      if (currentPrice === 0) return pkg;

      const fluctuation = (Math.random() * 0.1 - 0.05); // -5% to +5%
      const newPrice = Math.round(currentPrice * (1 + fluctuation));
      
      return {
        ...pkg,
        price: `Rp ${newPrice.toLocaleString('id-ID')}`,
        isRealTime: true // Flag to indicate this price came from API
      };
    });

    return {
      ...product,
      packages: updatedPackages,
      isRealTime: true
    };
  }
};
