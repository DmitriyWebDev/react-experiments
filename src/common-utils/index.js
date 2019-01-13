/**
 * Check valid credit card numbers (via Luhn algorithm checking)
 * https://gist.github.com/DiegoSalazar/4075533
 * @param value {string} - input string
 */
export function isValidCreditCardNumber (value = '') {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0
    let bEven = false
    value = value.replace(/\D/g, '')

    for (let n = value.length - 1; n >= 0; n--) {
        let cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10)

        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9
        }

        nCheck += nDigit
        bEven = !bEven
    }

    return (nCheck % 10) === 0
}

/**
 * Checks element in viewport
 * https://gist.github.com/davidtheclark/5515733
 * @param el {Object} - Dom node
 */
export function isAnyPartOfElementInViewport (el) {
    const rect = el.getBoundingClientRect()
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight)
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth)

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0)
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0)

    return (vertInView && horInView)
}

/**
 * Generates random id
 * https://gist.github.com/6174/6062387
 */
export function getRandomId () {
    return Math.random()
        .toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Returns a declension depended on Numeral
 * Output like 'яблоко','яблока','яблок'
 * Examples:
 * title=getDeclencionNounOfNumeric(1,['яблоко','яблока','яблок']); // Result: "яблоко"
 * title=getDeclencionNounOfNumeric(2,['яблоко','яблока','яблок']); // Result: "яблока"
 * title=getDeclencionNounOfNumeric(5,['яблоко','яблока','яблок']); // Result: "яблок"
 * @param number {number} - Int number
 * @param titles {array} - Ordered possible values of declension
 */
export function getDeclencionNounOfNumeric (number, titles) {
    const cases = [2, 0, 1, 1, 1, 2]
    return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ]
}

/**
 * Returns (Number) browser scrollbar width in pixels
 */
export function getScrollbarWidth () {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

/**
 * Prevents browser and synthetic event bubbling
 * @param event {object} - any browser or synthetic event
 */
export function stopEventPropagation (event) {
    event.stopPropagation()
    if( event.nativeEvent ) {
        event.nativeEvent.stopImmediatePropagation()
    }
}