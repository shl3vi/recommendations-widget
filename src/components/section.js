export const createSection = (sectionName, title, content) => {
  return `
    <div id="taboola-section-${sectionName}" class="taboola-section">
        ${createHeader(title)}
        ${content}
    </div>`;
};

const createHeader = (title) => {
  return `
    <div class="taboola-section-header">
        <h3 class="taboola-section-header-title">${title}</h3>
    </div>
    `;
};
