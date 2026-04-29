/**
 * Utilidades de Seguridad Globales para Boti Dival
 * Proporciona soporte de encriptación incluso en contextos no seguros (HTTP)
 */

const SecurityUtils = {
    /**
     * Implementación SHA-256 en JS Puro
     * @param {string} ascii 
     * @returns {string} hash hexadecimal
     */
    sha256(ascii) {
        function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
        var mathPow = Math.pow, maxWord = mathPow(2, 32), result = '', words = [], i, j;
        var asciiBitLength = ascii.length * 8, hash = [], k = [];
        var isPrime = [2], getComposite = function(num) {
            for (i=0; i<isPrime.length; i++) if (num % isPrime[i] === 0) return true;
            return false;
        };
        for (var num = 3; k.length < 64; num++) {
            if (!getComposite(num)) {
                isPrime.push(num);
                k.push((mathPow(num, 1/3) * maxWord) | 0);
                hash.push((mathPow(num, 1/2) * maxWord) | 0);
            }
        }
        ascii += '\x80';
        while (ascii.length % 64 - 56) ascii += '\x00';
        for (i = 0; i < ascii.length; i++) {
            j = ascii.charCodeAt(i);
            words[i >> 2] |= j << ((3 - i) % 4) * 8;
        }
        words[words.length] = ((asciiBitLength / maxWord) | 0);
        words[words.length] = (asciiBitLength);
        for (j = 0; j < words.length;) {
            var w = words.slice(j, j += 16), oldHash = hash;
            hash = hash.slice(0, 8);
            for (i = 0; i < 64; i++) {
                var w15 = w[i - 15], w2 = w[i - 2];
                var a = hash[0], e = hash[4];
                var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
                hash = [(temp1 + temp2) | 0].concat(hash);
                hash[4] = (hash[4] + temp1) | 0;
            }
            for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
        }
        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                var b = (hash[i] >> (j * 8)) & 255;
                result += ((b < 16) ? '0' : '') + b.toString(16);
            }
        }
        return result;
    }
};
