function isIP(ipAddress) {
    const ipParts = ipAddress.split('.');
    if (ipParts.length !== 4) {
      // IP address must have exactly 4 parts separated by periods
      return false;
    }
    for (let i = 0; i < ipParts.length; i++) {
      const ipPart = parseInt(ipParts[i], 10);
      if (isNaN(ipPart) || ipPart < 0 || ipPart > 255) {
        // Each part of the IP address must be a number between 0 and 255
        return false;
      }
    }
    return true;
}

module.exports = { isIP };