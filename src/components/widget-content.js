import { fetchRecommendations } from "../api-service.js";
import { createAdsGallery } from "./ads-gallery.js";
import { createSection } from "./section.js";

export const createWidgetContent = async () => {
  const recommendations = await fetchRecommendations();
  aggregateRecommendationsByOrigin(recommendations);
  return createRelevantSections();
};

const aggregateRecommendationsByOrigin = (recommendations) => {
  recommendations.forEach((recommendation) => {
    sections[recommendation.origin].recommendations.push(recommendation);
  });
};

const createRelevantSections = () => {
  return sectionsDisplayOrder
    .map((sectionName) => {
      const section = sections[sectionName];
      const shouldShowSection = !!section.recommendations.length;
      return shouldShowSection ? section.draw(section.recommendations) : "";
    })
    .join("");
};

const sections = {
  sponsored: {
    recommendations: [],
    draw: (recommendations) =>
      createSection(
        "sponsored",
        "More For you by Taboola",
        createAdsGallery(recommendations, {
          openLinksInNewTab: true,
          addBranding: true,
        })
      ),
  },
  organic: {
    recommendations: [],
    draw: (recommendations) =>
      createSection(
        "organic",
        "More For you",
        createAdsGallery(recommendations)
      ),
  },
};

const sectionsDisplayOrder = ["sponsored", "organic"];
