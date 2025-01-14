function sanitizeInput(input) {
  if (input === null || input === undefined) {
    return input;
  }
  if (typeof input !== 'string') {
    return input;
  }
  return input.replace(/<[^>]*>?/gm, '');
}

module.exports = sanitizeInput;
