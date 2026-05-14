/**
 * Service for interacting with Google Apps Script API
 * Allows CRUD operations for orders using Google Sheets as a database
 */
export const gasService = {
  async saveOrder(order: any, contact: { whatsapp: string, email: string }) {
    const apiUrl = import.meta.env.VITE_GAS_API_URL;
    if (!apiUrl || apiUrl.includes('YOUR_DEPLOYMENT_ID')) {
      console.warn('VITE_GAS_API_URL not configured. Skipping GAS upload.');
      return null;
    }

    try {
      const payload = {
        ...order,
        whatsapp: contact.whatsapp,
        email: contact.email
      };

      // Using 'no-cors' mode can be tricky with GAS because it redirects.
      // Standard fetch with body usually works for Web Apps deployed as 'Anyone'.
      const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'no-cors', // Common for GAS to avoid pre-flight issues in some setups
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return { status: 'submitted' }; // With no-cors we can't see the response body
    } catch (error) {
      console.error('Error saving order to GAS:', error);
      throw error;
    }
  },

  async fetchOrders() {
    const apiUrl = import.meta.env.VITE_GAS_API_URL;
    if (!apiUrl || apiUrl.includes('YOUR_DEPLOYMENT_ID')) return [];

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Failed to fetch from GAS');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders from GAS:', error);
      return [];
    }
  }
};
