function checkKey(key) {
    if (key[38] || key[87] || key[40] || key[83] || key[37] || key[65] || key[39] || key[68]) {
        return true;
    }
    return false;
}

function checkCollision(a, b) {
    if (!Array.isArray(b)) {
        return !(
            ((a.trueY + a.trueHeight) < (b.trueY)) ||
            (a.trueY > (b.trueY + b.trueHeight)) ||
            ((a.trueX + a.trueWidth) < b.trueX) ||
            (a.trueX > (b.trueX + b.trueWidth))
        );
    } else {
        for (let i = 0; i < b.length; i++) {
            return !(
                ((a.trueY + a.trueHeight) < (b[i].trueY)) ||
                (a.trueY > (b[i].trueY + b[i].trueHeight)) ||
                ((a.trueX + a.trueWidth) < b[i].trueX) ||
                (a.trueX > (b[i].trueX + b[i].trueWidth))
            );
        }
    }
}

function checkOutOfBounds(a) {
    return (
        (a.trueY > 0) ||
        ((a.trueY + a.trueHeight) < CANVAS_HEIGHT) ||
        (a.trueX > 0) ||
        ((a.trueX + a.trueWidth) > CANVAS_WIDTH)
    );
}