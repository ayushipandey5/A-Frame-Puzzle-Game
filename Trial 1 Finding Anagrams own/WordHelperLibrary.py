import pandas as pd
import Constants as const
from collections import Counter


class word:
    def __init__(self):
        self.word = ""
        self.letters = []
        self.freqRank = 0


class Dictionary:
    def __init__(self):
        self.dictionary = ""
        self.__LoadData__()

    def __LoadData__(self):
        listOfWords = []
        global finalWordList
        colnames=['Rank', 'Word', 'Pos', 'Freq'] 
        data1 = pd.read_csv(const.wordListFilePath, names=colnames, header=None)
        data2 = pd.read_csv(const.oxfordDict, names=colnames, header=None)
        data3 = pd.read_csv(const.restEnglishWords, names=colnames, header=None)
        listOfWords.append(data1)
        listOfWords.append(data2)
        listOfWords.append(data3)
        finalWordList = pd.concat(listOfWords, axis=0, ignore_index=True)
        
        #finalWordList.to_csv('output.csv')

class Anagrams:
    def return_anagrams(self, letters: str) -> list:
        assert isinstance(letters,str), 'Scrambled letters should only be of type string.'
        letters = letters.lower()
        letters_count = Counter(letters)
        anagrams = set()
        words = finalWordList
        for rank, word in finalWordList.iterrows():
            if (pd.isnull(word['Word'])):
                continue
            dictWord = word["Word"].lower()
            if not set(dictWord) - set(letters):
                check_word = set()
                for k, v in Counter(dictWord).items():
                    if v <= letters_count[k]:
                        check_word.add(k)
                if check_word == set(dictWord):
                    anagrams.add(dictWord)
        print(anagrams)



#Just for Debugging
#dict = Dictionary()
#anag = Anagrams()
#print(anag.return_anagrams("Anagram"))
listWord = {'amgarn', 'mar', 'anagram', 'na', 'naga', 'ama', 'grama', 'aga', 'nam', 'ram', 'ga', 'ara', 'amar', 'manga', 'man', 'g', 'n', 'rama', 'angara', 'amaga', 'a', 'gnar', 'ana', 'garn', 'nag', 'amang', 'arm', 'ran', 'gam', 'm', 'ar', 'naa', 'naam', 'mang', 'aam', 'gra', 'anam', 'mana', 'rang', 'aa', 'arna', 'amara', 'agama', 'maga', 'gara', 'rana', 'raman', 'r', 'mara', 'ra', 'nagara', 'marang', 'am', 'raga', 'agar', 'rag', 'anama', 'gan', 'agra', 'an', 'arn', 'gar', 'gram', 'aranga', 'ma', 'ganam', 'nama', 'mr', 'mag', 'ragman', 'mangar', 'amra', 'nar'}
print(len(listWord))



