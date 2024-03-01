

const checkAuth = (req, res) => {
    try {
        res.json("Authenticated.");
    } catch (error) {
        res.status(500);
    }
}

module.exports = checkAuth