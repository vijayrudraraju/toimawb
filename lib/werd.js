function reinitializePersonalIndex() {
    $('#textarea1').data('numStrokes',0);
    $('#textarea1').data('wordIndex',['',0,[],[]]);
    $('#textarea1').data('phraseIndex',['',0,[],[]]);
    $('#textarea1').data('paragraphIndex',['',0,[],[]]);
}

/*
Paragraphs
*/

function indexParagraph(paragraph,index) {
    for (var i=0;i<paragraph.length;i++) {
        indexParagraphHelper(paragraph.slice(i),index,paragraph.slice(0,i));
    }
}
function indexParagraphHelper(paragraph,index,buffer) {
    if (paragraph !== '') {
        var foundIndex = index.indexOf(paragraph[0]);
        if (foundIndex === -1) {
            index.push(paragraph[0]);
            index.push(0);
            index.push(['',0,[],[]]);
            index.push([buffer.slice()]);
            foundIndex = index.indexOf(paragraph[0]);
        } else {
            index[foundIndex+1]++;

            var isNew = true;
            var candidates = [];
            for (var i=0;i<index[foundIndex+3].length;i++) {
                if (buffer.length === index[foundIndex+3][i].length) {
                    candidates.push(index[foundIndex+3][i].slice());
                }
            }

            var hitCount = 0;
            for (var i=0;i<candidates.length;i++) {
                hitCount = 0;
                for (var j=0;j<candidates[i].length;j++) {
                    if (candidates[i][j] === buffer[j]) {
                        hitCount++;
                    }
                }
                if (hitCount === buffer.length) {
                    isNew = false;
                    break;
                }
            }

            if (isNew && buffer.length > 0) {
                index[foundIndex+3].push(buffer.slice());
            }
        }

        if (paragraph[1] !== undefined) {
            buffer.push(paragraph[0]);
            indexParagraphHelper(paragraph.slice(1),index[foundIndex+2],buffer.slice());
        } else {
            var terminalIndex = index[foundIndex+2].indexOf('');
            index[foundIndex+2][terminalIndex+1]++;
        }
    }
}

/*
Phrases
*/

// indexing
function indexPhrase(phrase,index) {
    for (var i=0;i<phrase.length;i++) {
        indexPhraseHelper(phrase.slice(i),index,phrase.slice(0,i)); 
    }
}
function indexPhraseHelper(phrase,index,buffer) {
    if (phrase !== '') {
        var foundIndex = index.indexOf(phrase[0]);
        if (foundIndex === -1) {
            index.push(phrase[0]);
            index.push(0);
            index.push(['',0,[],[]]);
            index.push([buffer.slice()]);
            foundIndex = index.indexOf(phrase[0]);
        } else {
            index[foundIndex+1]++;

            var isNew = true;
            var candidates = [];
            for (var i=0;i<index[foundIndex+3].length;i++) {
                if (buffer.length == index[foundIndex+3][i].length) {
                    candidates.push(index[foundIndex+3][i].slice());
                }
            }

            var hitCount = 0;
            for (var i=0;i<candidates.length;i++) {
                hitCount = 0;
                for (var j=0;j<candidates[i].length;j++) {
                    if (candidates[i][j] == buffer[j]) {
                        hitCount++;
                    }
                }
                if (hitCount === buffer.length) {
                    isNew = false;
                    break;
                }
            }

            if (isNew && buffer.length > 0) {
                index[foundIndex+3].push(buffer.slice());
            }
        }

        if (phrase[1] !== undefined) {
            buffer.push(phrase[0]);
            indexPhraseHelper(phrase.slice(1),index[foundIndex+2],buffer.slice());
        } else {
            var terminalIndex = index[foundIndex+2].indexOf('');
            index[foundIndex+2][terminalIndex+1]++;
        }
    }
}
// retrieval
function retrievePhraseQueryTree(phrase,index,result,buffer) {
    if (phrase[0] !== '') {
        var foundIndex = index.indexOf(phrase[0]);
        // if the letter is not found return nothing
        if (foundIndex === -1) {
            return '';     
        }

        //buffer += phrase[0] + ' ';
        buffer.push(phrase[0]);

        if (phrase[1] !== undefined) {
            result = retrievePhraseQueryTree(phrase.slice(1),index[foundIndex+2],result,buffer.slice());
        } else {
            result = phraseSubTreeToText(retrievePhraseSubTree(index[foundIndex+2],[]),[],buffer.slice());
        }
    }
    return result;
}
function retrievePhraseSubTree(index,result) {
    console.log('subindex');
    console.log(index);
    if (index[0] === null) {
        return result;
    }
    for (var i=0;i<index.length;i+=4) {
        result.push(index[i]); 
        result.push(retrievePhraseSubTree(index[i+2],[])); 
        result.push(index[i+3]); 
    }
    return result;
}
function phraseSubTreeToText(subTree,result,buffer) {
    for (var i=0;i<subTree.length;i+=3) {
        if (subTree[i] !== '') {
            buffer.push(subTree[i]);
            result = phraseSubTreeToText(subTree[i+1],result,buffer.slice());
            buffer.pop(); 
        }
    }
    result.push(buffer);
    return result;
}

/*
Words
*/

// indexing
// concatenated triplets
// key
// strength
// down
function indexWord(word,index) {
    var wordArray = word.split('');
    //console.log('wordArray');
    //console.log(wordArray);
    for (var i=0;i<wordArray.length;i++) {
        indexWordHelper(wordArray.slice(i),index,wordArray.slice(0,i));
    }
}
function indexWordHelper(word,index,buffer) {
    if (word != '') {
        var foundIndex = index.indexOf(word[0]);
        if (foundIndex === -1) {
            index.push(word[0]);
            index.push(0);
            index.push(['',0,[],[]]);
            index.push([buffer.slice()]);
            foundIndex = index.indexOf(word[0]);
        } else {
            index[foundIndex+1]++;

            var isNew = true;
            var candidates = [];
            for (var i=0;i<index[foundIndex+3].length;i++) {
                if (buffer.length === index[foundIndex+3][i].length) {
                    candidates.push(index[foundIndex+3][i].slice());
                }
            }

            var hitCount = 0;
            for (var i=0;i<candidates.length;i++) {
                hitCount = 0;
                for (var j=0;j<candidates[i].length;j++) {
                    if (candidates[i][j] === buffer[j]) {
                        hitCount++;
                    }
                }
                if (hitCount === buffer.length) {
                    isNew = false;
                    break;
                }
            }

            if (isNew && buffer.length > 0) {
                index[foundIndex+3].push(buffer.slice());
            }
        }

        if (word[1] !== undefined) {
            buffer.push(word[0]);
            indexWordHelper(word.slice(1),index[foundIndex+2],buffer.slice());
        } else {
            var terminalIndex = index[foundIndex+2].indexOf('');
            index[foundIndex+2][terminalIndex+1]++;
        }
    }
}

// retrieval
function retrieveWordQueryTree(word,index,result,buffer) {
    //console.log('retrieveWordQueryTree',word,index,result,buffer);
    if (word[0] !== '') {
        var foundIndex = index.indexOf(word[0]);
        // if the letter is not found return nothing
        if (foundIndex === -1) {
            return '';     
        }

        buffer.push(word[0]);
        if (word[1] !== undefined) {
            // traverse to the correct subtree
            result = retrieveWordQueryTree(word.slice(1),index[foundIndex+2],result,buffer);
        } else {
            // retrieve the subtree and convert to text
            var subtree = retrieveWordSubTree(index[foundIndex+2],[]);
            result = wordSubTreeToText(subtree,[],buffer.join(''));
        }
    } 

    return result;
}
function retrieveWordSubTree(index,result) {
    for (var i=0;i<index.length;i+=4) {
        result.push(index[i]); 
        result.push(retrieveWordSubTree(index[i+2],[])); 
        result.push(index[i+3]); 
    }
    return result;
}
function wordSubTreeToText(subtree,result,buffer) {
    var prefixArray = [];
    for (var i=0;i<subtree.length;i+=3) {
        if (subtree[i] !== '') {
            buffer += subtree[i];
            result = wordSubTreeToText(subtree[i+1],result,buffer);
            buffer = buffer.substring(0,buffer.length-1);
        }
    }
    result.push(buffer);
    return result;
}
