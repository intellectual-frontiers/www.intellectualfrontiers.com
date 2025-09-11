// src/utils/citations.js
// Citation formatting utilities for defensive disclosures

// --- Helpers ---
function cleanNamePart(part) {
    return part.replace(/\.$/, ""); // remove trailing periods
}

function toSentenceCase(str) {
    if (!str) return "";
    const words = str.split(" ");
    return words
        .map((word, i) => {
            if (i === 0) return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            if (word === word.toUpperCase()) return word; // keep acronyms
            return word.toLowerCase();
        })
        .join(" ");
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

// --- APA (7th ed) ---
function formatAuthorAPA(fullName) {
    const parts = fullName.trim().split(" ").map(cleanNamePart);
    const lastName = parts.pop();
    const initials = parts.map(n => n[0].toUpperCase() + ".").join(" ");
    return `${lastName}, ${initials}`;
}

export function formatAuthorsAPA(authors) {
    if (authors.length === 1) return formatAuthorAPA(authors[0]);
    if (authors.length <= 20) {
        const formatted = authors.map(formatAuthorAPA);
        const last = formatted.pop();
        return formatted.join(", ") + ", & " + last;
    }
    const formatted = authors.slice(0, 19).map(formatAuthorAPA);
    const last = formatAuthorAPA(authors[authors.length - 1]);
    return formatted.join(", ") + ", ... " + last;
}

export function getAPADate(dateStr) {
    const date = new Date(dateStr);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`;
}

// --- MLA (9th ed) ---
function formatAuthorMLA(fullName, isFirstAuthor = false) {
    const parts = fullName.trim().split(" ").map(cleanNamePart);
    const lastName = parts.pop();
    const firstNames = parts.join(" ");
    return isFirstAuthor ? `${lastName}, ${firstNames}` : `${firstNames} ${lastName}`;
}

export function formatAuthorsMLA(authors) {
    if (authors.length === 1) return formatAuthorMLA(authors[0], true);
    if (authors.length === 2)
        return formatAuthorMLA(authors[0], true) + ", and " + formatAuthorMLA(authors[1]);
    return formatAuthorMLA(authors[0], true) + ", et al.";
}

export function getMLADate(dateStr) {
    const date = new Date(dateStr);
    const months = [
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
        "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// --- Chicago (17th ed, bibliography style) ---
function formatAuthorChicago(fullName, isFirstAuthor = false) {
    const parts = fullName.trim().split(" ").map(cleanNamePart);
    const lastName = parts.pop();
    const firstNames = parts.join(" ");
    return isFirstAuthor ? `${lastName}, ${firstNames}` : `${firstNames} ${lastName}`;
}

export function formatAuthorsChicago(authors) {
    if (authors.length === 1) return formatAuthorChicago(authors[0], true);
    if (authors.length === 2)
        return formatAuthorChicago(authors[0], true) + " and " + formatAuthorChicago(authors[1]);
    if (authors.length === 3)
        return (
            formatAuthorChicago(authors[0], true) +
            ", " +
            formatAuthorChicago(authors[1]) +
            ", and " +
            formatAuthorChicago(authors[2])
        );
    return formatAuthorChicago(authors[0], true) + ", et al.";
}

export function getChicagoDate(dateStr) {
    const date = new Date(dateStr);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// --- AMA ---
function formatAuthorAMA(fullName) {
    const parts = fullName.trim().split(" ").map(cleanNamePart);
    const lastName = parts.pop();
    const initials = parts.map(n => n[0].toUpperCase()).join("");
    return `${lastName} ${initials}`;
}

export function formatAuthorsAMA(authors) {
    if (authors.length <= 6) return authors.map(formatAuthorAMA).join(", ");
    return authors.slice(0, 3).map(formatAuthorAMA).join(", ") + ", et al.";
}

export function getAMADate(dateStr) {
    const date = new Date(dateStr);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// --- NLM ---
function formatAuthorNLM(fullName) {
    const parts = fullName.trim().split(" ").map(cleanNamePart);
    const lastName = parts.pop();
    const initials = parts.map(n => n[0].toUpperCase()).join("");
    return `${lastName} ${initials}`;
}

export function formatAuthorsNLM(authors) {
    if (authors.length <= 6) return authors.map(formatAuthorNLM).join(", ");
    return authors.slice(0, 6).map(formatAuthorNLM).join(", ") + ", et al.";
}

export function getNLMDate1(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year} ${month} ${day}`;
}

export function getNLMDate(dateStr) {
    const date = new Date(dateStr);
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${year} ${month} ${day}`;
}

// --- Main Citation Generator ---
/**
 * Generate all citation formats for a post
 * @param {Object} post - Post object containing title, publishDate, disclosureAuthors, slug
 * @param {string} siteOrigin - Site origin URL
 * @param {Function} getFormattedDateWithLongMonth - Date formatting function
 * @returns {Object} Object containing all citation formats
 */
export function generateCitations(post, siteOrigin, getFormattedDateWithLongMonth) {
    const citationUrl = `${siteOrigin}/${post.slug || 'current-page'}`;
    const authors = post.disclosureAuthors || [];
    const hasAuthors = authors && authors.length > 0;

    return {
        default: hasAuthors
            ? `${authors.join(', ')}. "${post.title}." <em>Intellectual Frontiers Journal</em>, ${getFormattedDateWithLongMonth(post.publishDate)}. ${citationUrl}`
            : `"${post.title}." <em>Intellectual Frontiers Journal</em>, (${getFormattedDateWithLongMonth(post.publishDate)}). ${citationUrl}`,

        apa: hasAuthors
            ? `${formatAuthorsAPA(authors)} (${getAPADate(post.publishDate)}). ${toSentenceCase(post.title)}. <em>Intellectual Frontiers Journal</em>. ${citationUrl}`
            : `(${getAPADate(post.publishDate)}). ${toSentenceCase(post.title)}. <em>Intellectual Frontiers Journal</em>. ${citationUrl}`,

        mla: hasAuthors
            ? `${formatAuthorsMLA(authors)}. "${toTitleCase(post.title)}." <em>Intellectual Frontiers Journal</em>, ${getMLADate(post.publishDate)}, ${citationUrl}`
            : `"${toTitleCase(post.title)}." <em>Intellectual Frontiers Journal</em>, ${getMLADate(post.publishDate)}, ${citationUrl}`,

        chicago: hasAuthors
            ? `${formatAuthorsChicago(authors)}. "${toTitleCase(post.title)}." <em>Intellectual Frontiers Journal</em>. ${getChicagoDate(post.publishDate)}. ${citationUrl}.`
            : `"${toTitleCase(post.title)}." <em>Intellectual Frontiers Journal</em>. ${getChicagoDate(post.publishDate)}. ${citationUrl}.`,

        ama: hasAuthors
            ? `${formatAuthorsAMA(authors)}. ${toSentenceCase(post.title)}. <em>Intellectual Frontiers Journal</em>. Published ${getAMADate(post.publishDate)}. Accessed ${getAMADate(new Date())}. ${citationUrl}`
            : `${toSentenceCase(post.title)}. <em>Intellectual Frontiers Journal</em>. Published ${getAMADate(post.publishDate)}. Accessed ${getAMADate(new Date())}. ${citationUrl}`,

        nlm: hasAuthors
            ? `${formatAuthorsNLM(authors)}. ${toSentenceCase(post.title)}. Intellectual Frontiers Journal [Internet]. ${getNLMDate(post.publishDate)} [cited ${getNLMDate(new Date())}]; Available from: ${citationUrl}`
            : `${toSentenceCase(post.title)}. Intellectual Frontiers Journal [Internet]. ${getNLMDate(post.publishDate)} [cited ${getNLMDate(new Date())}]; Available from: ${citationUrl}`
    };
}

// Export helper functions in case they're needed elsewhere
export { toSentenceCase, toTitleCase };