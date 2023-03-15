export const createAdsGallery = (ads, config = {}) => {
  const adDatasToViewItems = (ads) => {
    return ads.map(adDataToViewItem).join("");
  };

  const createThumbnail = (thumbnail) => `<div class="taboola-ad-img-container">
                <img class="taboola-ad-img" src="${thumbnail[0]?.url}" loading="lazy"/>
            </div>`;

  const createDescription = (
    description
  ) => `<div class="taboola-ad-desc-container">
            <p class="taboola-ad-desc">${description}</p>
        </div>`;

  const createBranding = (
    branding
  ) => `<div class="taboola-ad-comp-label-container">
            <span class="taboola-ad-comp-label"><b>${branding}</b></span>
        </div>`;

  const adDataToViewItem = (adData) => {
    const { branding, description, thumbnail, name, url } = adData;
    const linkTargetAttr = config.openLinksInNewTab ? "_blank" : "_self";

    return `
        <div class="taboola-ads-gallery-item">
            <a href="${url}" target="${linkTargetAttr}">
                ${createThumbnail(thumbnail)}
                ${createDescription(description)}
                ${config.addBranding ? createBranding(branding) : ""}
            </a>
        </div>
      `;
  };

  return `<div class="taboola-ads-gallery">${adDatasToViewItems(ads)}</div>`;
};
