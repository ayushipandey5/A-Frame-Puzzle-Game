import ApiHelper.Constants as const
from bs4 import BeautifulSoup as soup
import urllib3 as urlHelper

# request_headers =\
# {\
#     "Accept-Language": "en-US,en;q=0.5",\
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",\
#     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",\
#     "Referer": "http://google.com",\
#     "Connection": "keep-alive" 
# }
request_headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
class words:
    def __init__(self, word, length, score):
        self.length = length
        self.word = word
        self.score = score


def AnagramFinder(word):
    my_url = const.apiUrl.replace("[Word]", word)
    https = urlHelper.PoolManager()
    url_client=https.request('Get', my_url, headers = request_headers)
    page_html=url_client.data
    url_client.close()
    page_soup = soup(page_html, "html.parser")
    orderedList = page_soup.findAll("div", {"class": "wordblock"})
    anagramWords = []
    for lists in orderedList:
        try:
            currWord = lists.find("a").get_text()
        except: 
            currWord = ""
        try:
            score = lists.find("sub").get_text()
        except: 
            score = ""
        try:
            length = lists.find("a")['data-length']
        except: 
            length = len(currWord)
        anagramWords.append(words(currWord, length, score))
    return anagramWords

            



