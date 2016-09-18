function isupper(ch) {
    if (ch >= 'A' && ch <= 'Z') {
        return true;
    }
    return false;
}

function isdigit(ch) {
    if (ch >= '0' && ch <= '9') {
        return true;
    }
    return false;
}

function isLegalVin(vin) {
    if (vin.length < 17) {
        return false;
    }
    var sum = 0;
    var vinCheckArray = new Array(1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 0, 7, 0, 9, 2, 3, 4, 5, 6, 7, 8, 9);
    var posCheckArray = new Array(8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2);
    for (var i = 0; i < vin.length; i++) {
        var ch = vin[i];
        if (ch == 'I' || ch == 'O' || ch == 'Q' ||
            !(isupper(ch) || isdigit(ch))) {
            return false;
        }
        var vinCheck, posCheck;
        if (isdigit(ch)) {
            vinCheck = ch.charCodeAt(0) - "0".charCodeAt(0);
        } else {
            vinCheck = vinCheckArray[ch.charCodeAt(0) - "A".charCodeAt(0)];
        }
        posCheck = posCheckArray[i];
        // console.log(vinCheck);
        // console.log(posCheck);
        sum += vinCheck * posCheck;
    }
    console.log(sum);

    var checkChar = vin[8];
    var checkCode = sum % 11;
    if ((checkCode < 10 && checkChar.charCodeAt(0) - "0".charCodeAt(0) == checkCode) ||
        (checkCode == 10 && checkChar == 'X')) {
        return true;
    }
    return false;
}
