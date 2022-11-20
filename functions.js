function checkKey(key) {
    if (key[38] || key[87] || key[40] || key[83] || key[37] || key[65] || key[39] || key[68]) {
        return true;
    }
    return false;
}

function boxCollision(a, b) {
    return !(
        ((a.trueY + a.trueHeight) < (b.trueY)) ||
        (a.trueY > (b.trueY + b.trueHeight)) ||
        ((a.trueX + a.trueWidth) < b.trueX) ||
        (a.trueX > (b.trueX + b.trueWidth))
    );
}