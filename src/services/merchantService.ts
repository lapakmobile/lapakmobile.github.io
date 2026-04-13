export const merchantService = {
  getXmlFeedUrl: () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/api/products/xml`;
  },
  
  getJsonApiUrl: () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/api/products`;
  },

  downloadFeed: async () => {
    const url = merchantService.getXmlFeedUrl();
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'lapakmobile-google-feed.xml');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};
