import { config } from "./get-config.js";

const TABOOLA_API_HOST = "http://api.taboola.com";
const taboolaApiUrl = new URL(
  `${TABOOLA_API_HOST}/1.0/json/${config.publisherId}/recommendations.get`
);
taboolaApiUrl.searchParams.append("app.type", config.appType);
taboolaApiUrl.searchParams.append("app.apikey", config.apiKey);
taboolaApiUrl.searchParams.append("count", config.numOfAdsInSponsoredSection);
taboolaApiUrl.searchParams.append("source.type", config.sourceType);
taboolaApiUrl.searchParams.append("source.id", config.sourceId);

export const fetchRecommendations = async () => {
  const res = await fetch(taboolaApiUrl.href);
  const data = await res.json();
  return data.list;
};
