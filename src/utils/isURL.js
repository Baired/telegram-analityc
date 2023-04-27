function isURL(domain) {
    // Regular expression for matching URLs
    const regex = /^(https?):\/\/([^\s/:]+\.[^\s/:]+|[^\s/:]+\.[^\s/:]+[^\s/]*|[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)(\/.*)?$/i;
    
    // Match the input string against the regular expression
    const matches = domain.match(regex);

    // If there's no match, return false
    if (!matches) {
      return false;
    }

    // Extract the protocol, hostname, and path from the matched string
    const protocol = matches[1];
    const hostname = matches[2];
    const path = matches[3];
    
    // If either protocol or hostname is missing, return false
    if (!protocol || !hostname) {
      return false;
    
    }
    return true;
}
  
module.exports = { isURL }