function sanitizeInput(input) {
    return input.replace(/<[^>]*>?/gm, '');
}

module.exports = sanitizeInput;