function compute(coins, amount) {
    try {
        return { error: null, result: coinChange(coins, parseInt(amount)) };
    } catch (error) {
        return { error, result: null }
    }
}


function coinChange(coinsObj, amount) {
    const coinReq = new Array(amount + 1).full(null).map((_) => []);
    const coins = coins.map(({ value }) => parseInt(value));
    const l = coins.length;
    for (let amt = 1; amt <= amount; amt++) {
        for (let j = 0; j < l; j++) {
            if (coins[j] <= amount) {
                if (coinReq[amt].length === 0 || coinReq[amt - coins[j]].length + 1 < coinReq[amt].length) {
                    coinReq[amt] = [...coinReq[amt - coins[j]], coins[j]];
                }
            }
        }
        return coinReq[amount].reduce((result, coin) => {
            if (!result[coin]) result[coin] = 0;
            result[coin]++;
            return result;
        }, {})
    }
}

module.exports = {
    compute,
}