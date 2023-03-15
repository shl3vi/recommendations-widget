import { jest } from "@jest/globals";

describe("widget", () => {
  beforeEach(() => {
    window.recommendationsWidgetConfig = someWidgetConfig;
    window.document.body.innerHTML =
      '<div id="taboola-recommendations-widget-placeholder"></div>';
  });

  it("should be able to render all section", async () => {
    const sponsoredResponse = {
      list: [aRecommendation("sponsored"), aRecommendation("organic")],
    };
    mockApiResponseWith(sponsoredResponse);

    await loadWidgetScript();

    const sponsoredSection = document.querySelector(
      "#taboola-section-sponsored"
    );
    expect(sponsoredSection).not.toBe(null);

    const organicSection = document.querySelector("#taboola-section-organic");
    expect(organicSection).not.toBe(null);
  });

  describe("sponsored", () => {
    it("should open sponsored ads in new tab", async () => {
      const sponsoredResponse = { list: [aRecommendation("sponsored")] };
      mockApiResponseWith(sponsoredResponse);

      await loadWidgetScript();

      const adItem = getAdLink("sponsored");
      expect(adItem.getAttribute("target")).toBe("_blank");
    });

    it("should lazy load images", async () => {
      const sponsoredResponse = { list: [aRecommendation("sponsored")] };
      mockApiResponseWith(sponsoredResponse);

      await loadWidgetScript();

      const adItem = getAdImg("sponsored");
      expect(adItem.getAttribute("loading")).toBe("lazy");
    });
  });

  describe("organic", () => {
    it("should open organic content in same tab", async () => {
      const sponsoredResponse = { list: [aRecommendation("organic")] };
      mockApiResponseWith(sponsoredResponse);

      await loadWidgetScript();

      const adItem = getAdLink("organic");
      expect(adItem.getAttribute("target")).toBe("_self");
    });
  });

  it("should not explode", async () => {
    const someBadResponse = "someBadResponse";
    mockApiResponseWith(someBadResponse);

    await loadWidgetScript();
  });
});

const someWidgetConfig = {
  appType: "desktop",
  apiKey: "f9040ab1b9c802857aa783c469d0e0ff7e7366e4",
  sourceId: "some-source-id",
  sourceType: "video",
  numOfAdsInSponsoredSection: 6,
  publisherId: "taboola-templates",
};

const aRecommendation = (origin) => ({
  origin,
  description: "",
  thumbnail: [{ url: "" }],
  branding: "",
  url: "",
});

const loadWidgetScript = async () => {
  import(`../../dist/main.bundle.js?someParamForReload=${Date.now()}`);
  await new Promise((r) => setTimeout(r, 500));
};

const mockApiResponseWith = (data) =>
  (global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(data) })
  ));

const getAdLink = (origin) =>
  document.querySelector(
    `#taboola-section-${origin} .taboola-ads-gallery-item a`
  );

const getAdImg = (origin) =>
  document.querySelector(
    `#taboola-section-${origin} .taboola-ads-gallery-item img`
  );
