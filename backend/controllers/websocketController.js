async function startWebSocket(req, res) {
    const wssPort = process.env.WSS_PORT;
    res.render('websocket', {wssPort});
}

module.exports = { startWebSocket };