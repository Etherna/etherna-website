export const getWordsCount = (text: string) => {
  const separators = [
    "000d", // \r - carriage return
    "000a", // \n - new line
    "000b", // \v - vertical tab
    "000c", // \f - form feed
    "0085", // NEL - next line
    "2028", // LS - line separator
    "2029", // PS - paragraph separator
    "200d", // ZWJ - zero width joiner
    "1f1e6", // Regional indicator symbol letter A
    "1f1ff", // Regional indicator symbol letter Z
    "200b", // Zero width space
    "200c", // Zero width non-joiner
    "200d", // Zero width joiner
    "3031", // Vertical Kana repeat mark 1
    "3032", // Vertical Kana repeat mark 2
    "3033", // Vertical Kana repeat mark 3
    "3034", // Vertical Kana repeat mark 4
    "3035", // Vertical Kana repeat mark 5
    "309b", // Combining Katakana-Hiragana voiced sound mark
    "309c", // Combining Katakana-Hiragana semi-voiced sound mark
    "30a0", // Katakana-Hiragana double hyphen
    "30fc", // Katakana-Hiragana long vowel mark
    "ff70", // Halfwidth Katakana-Hiragana prolonged sound mark
    "02c2", // Modifier letter left arrowhead
    "02c5", // Modifier letter down arrowhead
    "02d2", // Modifier letter centred right half ring
    "02d7", // Modifier letter minus sign
    "02de", // Modifier letter rhotic hook
    "02df", // Modifier letter cross accent
    "02e5", // Modifier letter extra-high tone bar
    "02eb", // Modifier letter voiced uvular stop
    "02ed", // Modifier letter unvoiced uvular stop
    "02ef", // Modifier letter lowered tone bar
    "055a", // Armenian apostrophe
    "055b", // Armenian emphasis mark
    "055c", // Armenian exclamation mark
    "055d", // Armenian comma
    "055e", // Armenian question mark
    "058a", // Armenian hyphen
    "05f3", // Hebrew punctuation geresh
    "a708", // Modifier letter triangular colon
    "a716", // Modifier letter low circumflex accent
    "a720", // Modifier letter apostrophe
    "a721", // Modifier letter reversed comma
    "a789", // Modifier letter colon
    "a78a", // Modifier letter short equals sign
    "ab5b", // Modifier letter small heng
    "0020", // space
    "00a0", // nbsp
    "0027", // ' - apostrophe
    "0022", // " - quotation mark
    "002e", // . - full stop
    "2018", // ‘ - left single quotation mark
    "2019", // ’ - right single quotation mark
    "2024", // ․ - one dot leader
    "2025", // ‥ - two dot leader
    "2026", // … - horizontal ellipsis
    "fe52", // ﹒- small full stop
    "ff07", // ＇ - fullwidth apostrophe
    "ff0e", // ． - fullwidth full stop
    "003a", // : - colon
    "00b7", // · - middle dot
    "0387", // · - greek ano teleia
    "055f", // ՟ - armenian abbreviation mark
    "05f4", // ״ - hebrew punctuation gershayim
    "2027", // ‧ - hyphenation point
    "fe13", // ︓ - presentation form for vertical colon
    "fe55", // ﹕ - small colon
    "ff1a", // ： - fullwidth colon
    "066c", // ٬ - arabic thousands separator
    "fe50", // ﹐ - small comma
    "fe54", // ﹔ - small semicolon
    "ff0c", // ， - fullwidth comma
    "ff1b", // ； - fullwidth semicolon
    "003f", // ? - question mark
    "00bf", // ¿ - inverted question mark
    "037e", // ; - greek question mark
    "055e", // ՞ - armenian question mark
    "061f", // ؟ - arabic question mark
    "1367", // ፧ - ethiopic question mark
    "1944", // ᥄ - limbu question mark
    "1945", // ᥅ - limbu exclamation mark
    "2047", // ⁇ - double question mark
    "07f8", // ߸ - nko comma
    "fe56", // ﹖ - small question mark
    "1802", // ᠂ - mongolian comma
    "1808", // ᠈ - mongolian manchu comma
    "2013", // – - en dash
    "2014", // — - em dash
    "3001", // 、 - ideographic comma
    "fe10", // ︐ - presentation form for vertical comma
    "fe11", // ︑ - presentation form for vertical ideographic comma
    "fe13", // ︓ - presentation form for vertical colon
    "fe31", // ︱ - presentation form for vertical em dash
    "fe32", // ︲ - presentation form for vertical en dash
    "fe50", // ﹐ - small comma
    "fe51", // ﹑ - small ideographic comma
    "fe55", // ﹕ - small colon
    "fe58", // ﹘ - small em dash
    "fe63", // ﹣ - small hyphen-minus
    "ff0c", // ， - fullwidth comma
    "ff0d", // － - fullwidth hyphen-minus
    "ff1a", // ： - fullwidth colon
    "ff64", // ､ - halfwidth ideographic comma
  ]

  let count = 0

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    const nextCode = text.charCodeAt(i + 1)
    const hex = code.toString(16).padStart(4, "0")
    const nextHex = nextCode.toString(16).padStart(4, "0")

    if (separators.includes(hex) && !separators.includes(nextHex)) {
      count++
    }
  }

  return count
}
