#import ApiHelper.Constants as const
from bs4 import BeautifulSoup as soup
import urllib3 as urlHelper
from urllib.parse import urljoin
import time
from random import randint
apiUrl = 'https://anagram-solver.io/words-for/[Word]'
baseUrl = "https://anagram-solver.io"

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


def ParseAnagrams(page_soup,  anagramWords):
    # my_url = apiUrl.replace("[Word]", word)
    # https = urlHelper.PoolManager()
    # url_client=https.request('Get', my_url, headers = request_headers)
    # page_html=url_client.data
    # url_client.close()
    #page_soup = soup(page_html, "html.parser")
    orderedList = page_soup.findAll("div", {"class": "wordblock"})
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
def GetDataFromUrl(url):
    baseUrl = url
    https = urlHelper.PoolManager()
    url_client=https.request('Get', baseUrl, headers = request_headers)
    page_html=url_client.data
    url_client.close()
    return page_html

def Is_pageScrapable(s):
    try:
        p = int(s)
        if(p != 1):
            return True
        return False
    except ValueError:
        return False
    
def AnagramFinder(word):
    urlsToScrape = []
    baseUrl = apiUrl.replace("[Word]", word)
    page_html = GetDataFromUrl(baseUrl)
    page_soup = soup(page_html, "html.parser")
    orderedList = page_soup.findAll("nav", {"class": "nav-pagination"})
    for lists in orderedList:
        try:
            paginationLink = lists.findAll("a", {"class": "page-link"})
            for pageLinks in paginationLink:
                pageNumber = pageLinks.get_text().strip()
                if (Is_pageScrapable(pageNumber)):
                    urlsToScrape.append(urljoin(baseUrl,pageLinks.get('href')))
        except: 
            pass
    anagramWords = []
    ParseAnagrams(page_soup, anagramWords)
    for url in urlsToScrape:
        page_html = GetDataFromUrl(url)
        page_soup = soup(page_html, "html.parser")
        ParseAnagrams(page_soup, anagramWords)
        #time.sleep(randint(1, 2))
    return anagramWords


# start_time = time.time()
# words = AnagramFinder("beautiful")
# for thisWord in words:
#     print(thisWord.word)
# print("--- %s seconds ---" % (time.time() - start_time))

            



