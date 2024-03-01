const giveCookie = async (req, res) => {
    const token = "Anjay"
    res.cookie(
        "api-auth", token,
        {
            expire: 360000 + Date.now(),
            httpOnly: true,
            secure: true
        }
    );
    res.json("Cookie given!");
}

module.exports = giveCookie;