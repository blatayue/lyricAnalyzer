import { evolve, flatten, invert, isEmpty, map, mapObjIndexed, pipe, reject, replace, split, trim, uniq } from 'ramda' // ramda golf ftw
import { getGeniusLyrics } from './apiHelpers';
import stm from 'stm'

// Regex is fun... said no one ever
const parseLyrics = evolve({
    lyrics: pipe(
      replace(/[!"#$%&()*+,\-./:;<=>?@[\]\^_`{|}~]/g, ""), // remove all punctuation except single quotes for contractions
      replace("\\", ""),
      split(' '),
      map(trim),
      reject(isEmpty)
    )
})

// morph lyrics into stems and original word obj
const stemWords = ({lyrics, ...songData} = songData) => ({
    stemmed: lyrics.map(
      word => ({
        stem: stm.stem(word),
        word
      })
    ),
    lyrics,
    ...songData,  
})

const makeFrequency = ({ stemmed, ...songData} = songData) =>  (
    {
        freq: stemmed.reduce(
            (freq, word) =>(
                {
                    ...freq,
                    [word.stem]: {
                    freq: freq[word.stem] ? freq[word.stem].freq+=1 : 1, //start at one or get freq and add one
                    // start new arr or spread old before new. Why the fuck did I do it this way
                    originalWords: freq[word.stem] ? uniq([...freq[word.stem].originalWords, word.word]) : [word.word]
                    }
                }), 
            {}
        ),
        ...songData // dependency injection fucktacular spectacular
    }
)

// Epitome of clever over readable.
const mapIndices = ({ freq, lyrics, ...songData} = songData) => {
    const analyzed = mapObjIndexed((freqObj, stemName) => (
      {
        ...freqObj,
        indices: flatten(freqObj.originalWords.map(word => invert(lyrics)[word])).map(Number)
      }
    ))(freq)
/* fuck, this is complex. ^ is explaned as follows
* basically the entire line above gets the unique words from the originals before stemming, then finds them in an inverted 
* array that is now an object with each word/array value as a key and an array of indexes from that array as the values. 
* The inverted array is an array of all the lyrics split into words
* This is a case where using "types" or just jsdoc obj type defs would help immensely in the mental model of the transformation
*/
    delete analyzed[""]; // it's been months since I had this all figured out, this is benign and a PITA, but works
    const datas = {
      ...analyzed,
      fullLyrics: lyrics,
      ...songData,
      uniqueLyrics: Object.keys(analyzed).length
    }
    return datas
}

export const analyzeWithGenius = query =>
    getGeniusLyrics(query)
    .then(parseLyrics)
    .then(stemWords)
    .then(makeFrequency)
    .then(mapIndices)
    .catch(console.log) // super fancy error handling