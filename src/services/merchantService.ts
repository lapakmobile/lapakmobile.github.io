import { ALL_PRODUCTS } from '../constants';

export const merchantService = {
  generateXMLFeed: () => {
    const baseUrl = window.location.origin;
    
    let xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>LapakMobile - Top Up Game & Layanan Digital</title>
    <link>${baseUrl}</link>
    <description>Platform Top Up Game dan Layanan Digital Terpercaya di Indonesia. Proses instan 24/7.</description>
`;

    ALL_PRODUCTS.forEach(product => {
      const lowestPrice = product.packages.length > 0 
        ? product.packages.reduce((min, p) => {
            const priceVal = parseInt(p.price.replace(/[^0-9]/g, '')) || 0;
            return priceVal < min ? priceVal : min;
          }, Infinity)
        : 0;

      xml += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name} - LapakMobile</g:title>
      <g:description>Top Up ${product.name} murah dan instan di LapakMobile. Tersedia berbagai pilihan paket dengan harga terbaik.</g:description>
      <g:link>${baseUrl}/#product-${product.id}</g:link>
      <g:image_link>${product.image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${lowestPrice} IDR</g:price>
      <g:brand>${product.name}</g:brand>
      <g:google_product_category>Software &gt; Video Game Software</g:google_product_category>
    </item>\n`;
    });

    xml += `  </channel>
</rss>`;

    return xml;
  },

  downloadFeed: () => {
    const xmlContent = merchantService.generateXMLFeed();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'google-merchant-feed.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
