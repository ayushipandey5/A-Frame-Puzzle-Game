import pandas as pd
import Constants as const


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
        data = pd.read_csv(const.wordListFilePath)
        print(data.head())


#Just for Debugging
dict = Dictionary()


