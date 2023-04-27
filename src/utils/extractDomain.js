function extractDomain(url) {
    // Extract the domain name from a URL using a regular expression
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    const domain = matches && matches[1];
    return domain;
}

module.exports = { extractDomain }