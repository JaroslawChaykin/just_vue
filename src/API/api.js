const API_KEY = '07666bdcf5fc98a34e38be556548d2caf17e691156b82438a172295636a0384d';
const BASE_URL = 'https://min-api.cryptocompare.com/data/';

const options = {
    headers: {
        authorization: API_KEY
    }
};
const AGGREGATE_INDEX = '5';
const tickersHandlers = new Map();

const socket = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);

socket.addEventListener('message', (e) => {
    const {TYPE: type, FROMSYMBOL: currency, PRICE: newPrice} = JSON.parse(e.data);
    if (type !== AGGREGATE_INDEX || newPrice === undefined) return;
    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach(fn => fn(newPrice))
});

function sendToTickerOnWs(message) {
    const stringifiedMessage = JSON.stringify(message);
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(stringifiedMessage);
        return;
    }
    socket.addEventListener('open', () => {
        socket.send(stringifiedMessage);
    }, {once: true});
}
function subcribeToTickerOnWs(ticker) {
    sendToTickerOnWs({
        'action': 'SubAdd',
        subs: [`5~CCCAGG~${ticker}~USD`]
    })
}
function unsubcribeFromTickerOnWs(ticker) {
    sendToTickerOnWs({
        'action': 'SubRemove',
        subs: [`5~CCCAGG~${ticker}~USD`]
    })
}

export const API = {
    async getCryptoCodes() {
        return await fetch(`${BASE_URL}all/coinlist?summary=true`, options).then(data => data.json());
    },
    subscribeToTickers(ticker, cb) {
        const subscribers = tickersHandlers.get(ticker) || [];
        tickersHandlers.set(ticker, [...subscribers, cb]);
        subcribeToTickerOnWs(ticker);
    },
    unsubscribeFromTickers(ticker) {
        tickersHandlers.delete(ticker)
        unsubcribeFromTickerOnWs(ticker)
    },
};