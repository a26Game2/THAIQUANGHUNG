function sumToNA(n) {
    return n * (n + 1) / 2;
}

function sumToNB(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sumToNC(n) {
    if (n <= 1) return n;
    return n + sumToNC(n - 1);
}

sumToNA(15);
sumToNB(15);
sumToNC(15);