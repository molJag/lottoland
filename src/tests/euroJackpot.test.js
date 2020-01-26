const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Lottoland</title>

    <link rel="stylesheet" href="css/main.css" />
    <link rel="icon" href="images/favicon.ico" />
  </head>

  <body>
    <main class="lottery-main">
        <header class="lottery-header">
            <section class="lottery-nav-top-section">
                <img src="./images/lottoland-logo-green.svg" alt="logo" class="lottery-logo">
                <nav class="lottery-navigation-top">
                    <ul class="lottery-log-menu">
                        <li class="lottery-nav-item">Register</li>
                        <li class="lottery-nav-item">Login</li>
                    </ul>
                </nav>
            </section>
            <section class="lottery-nav-main-section">
                <nav class="lottery-navigation-main">
                    <label for="hamburger-menu">&#9776;</label>
                    <input type="checkbox" id="hamburger-menu"/>
                    <ul class="lottery-nav-list">
                        <li class="lottery-nav-item"><a href="#">EuroMillions</a></li>
                        <li class="lottery-nav-item active"><a href="#">EuroJackpot</a></li>
                        <li class="lottery-nav-item"><a href="#">GermanLotto</a></li>
                        <li class="lottery-nav-item"><a href="#">More jackpots</a></li>
                        <li class="lottery-nav-item"><a href="#">Promotions</a></li>
                        <li class="lottery-nav-item"><a href="#">Scratchcards</a></li>
                        <li class="lottery-nav-item"><a href="#">Instant Win</a></li>
                        <li class="lottery-nav-item"><a href="#">Games</a></li>
                    </ul>
                </nav>
            </section>
        </header>
        <article class="results-wrapper">
            <header class="results-header">
                <h1>EuroJackpot Results & Winning Numbers</h1>
            </header>
            <section class="results-body">
                <header class="results-body-header"><span>EuroJackpot</span>Results</header>
                <div class="results-special"></div>
                <table class="results-table">
                    <thead>
                            <tr>
                                <th>Tier</th>
                                <th>Match</th>
                                <th>Winners</th>
                                <th>Amount</th>
                            </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </section>
        </article>
        <footer></footer>
    </main>
  </body>
</html>`);

global.window = dom.window;
global.document = dom.window.document;
global.fetch = require("node-fetch");

var assert = require('assert');
var expect = require('chai').expect;

const main = require('../js/main');

describe('EuroJackpot Class', () => {
    let mockResponse;
    let euroJackpot;
    let apiUtils;
    const doc = dom.window.document;

    beforeEach(() => {
        mockResponse = {
            "last": {
                "nr": 410,
                "currency": "EUR",
                "date": {
                    "full": "Die Lottozahlen vom Freitag, den 24.01.2020",
                    "day": 24,
                    "month": 1,
                    "year": 2020,
                    "hour": 21,
                    "minute": 0,
                    "dayOfWeek": "Freitag"
                },
                "closingDate": "24.01.2020, 19:00",
                "lateClosingDate": "24.01.2020, 20:10",
                "drawingDate": "24.01.2020, 21:00",
                "numbers": [
                    5,
                    12,
                    20,
                    29,
                    48
                ],
                "euroNumbers": [
                    7,
                    9
                ],
                "jackpot": "68",
                "marketingJackpot": "68",
                "specialMarketingJackpot": "68",
                "climbedSince": 6,
                "Winners": 1223986,
                "odds": {
                    "rank0": {
                        "winners": 0,
                        "specialPrize": 0,
                        "prize": 0
                    },
                    "rank1": {
                        "winners": 0,
                        "specialPrize": 0,
                        "prize": 6800000000
                    },
                    "rank2": {
                        "winners": 5,
                        "specialPrize": 0,
                        "prize": 52394970
                    },
                    "rank3": {
                        "winners": 11,
                        "specialPrize": 0,
                        "prize": 8405610
                    },
                    "rank8": {
                        "winners": 44441,
                        "specialPrize": 0,
                        "prize": 2140
                    },
                    "rank9": {
                        "winners": 57545,
                        "specialPrize": 0,
                        "prize": 1600
                    },
                    "rank10": {
                        "winners": 92558,
                        "specialPrize": 0,
                        "prize": 1430
                    },
                    "rank4": {
                        "winners": 77,
                        "specialPrize": 0,
                        "prize": 400260
                    },
                    "rank5": {
                        "winners": 1298,
                        "specialPrize": 0,
                        "prize": 21370
                    },
                    "rank6": {
                        "winners": 2126,
                        "specialPrize": 0,
                        "prize": 10140
                    },
                    "rank11": {
                        "winners": 233844,
                        "specialPrize": 0,
                        "prize": 1020
                    },
                    "rank7": {
                        "winners": 3275,
                        "specialPrize": 0,
                        "prize": 5640
                    },
                    "rank12": {
                        "winners": 788806,
                        "specialPrize": 0,
                        "prize": 740
                    }
                }
            },
            "next": {
                "nr": 411,
                "currency": "EUR",
                "date": {
                "full": "Die Lottozahlen vom Freitag, den 31.01.2020",
                "day": 31,
                "month": 1,
                "year": 2020,
                "hour": 21,
                "minute": 0,
                "dayOfWeek": "Freitag"
                },
                "closingDate": "31.01.2020, 19:00",
                "lateClosingDate": "31.01.2020, 20:10",
                "drawingDate": "31.01.2020, 21:00",
                "jackpot": "84",
                "marketingJackpot": "84",
                "specialMarketingJackpot": "84",
                "climbedSince": 7
            }
        };
        euroJackpot = new main.EuroJackpot(mockResponse);
        apiUtils = new main.ApiUtils(mockResponse);
    });

    it('should euro jackpot class be defined', () => {
        expect(euroJackpot).to.not.be.undefined;
    });

    it('should have correctly inserted the list of results in the dom', () => {
        //remove the list from the dom
        document.querySelector('.results-header').innerHTML = '';

        // should have removed the node from the dom
        expect(document.querySelector('.results-number-list')).to.equal(null);

        // call the method the same way it is done in the constructor, with the api utils
        euroJackpot.printResultNumbers(apiUtils.getResultNumbers(), apiUtils.getEuroNumbers());
        expect(document.querySelector('.results-number-list')).to.not.be.undefined;

        // check the length of the li elements - should be 7
        expect(document.querySelectorAll('.results-number-list li')).to.have.lengthOf(7);

        // Retrieves li elements in the list
        const nodesLI = document.querySelectorAll('.results-number-list li');
        // check contents
        expect(nodesLI[0].textContent).to.equal('5');
        expect(nodesLI[1].textContent).to.equal('12');
        expect(nodesLI[2].textContent).to.equal('20');
        expect(nodesLI[3].textContent).to.equal('29');
        expect(nodesLI[4].textContent).to.equal('48');
        expect(nodesLI[5].textContent).to.equal('7');
        expect(nodesLI[6].textContent).to.equal('9');
    });

    it('should insert the date in the appropriate section', () => {
        const resultBodyHeader = document.querySelector('.results-body-header');
        // remove content generated in the constructor
        resultBodyHeader.innerHTML = '';
        expect(resultBodyHeader.textContent).to.equal('');

        // call the method to insert the date
        euroJackpot.printEuroJackpotDate(apiUtils.getEuroJackpotDate());

        // check that the title and the date have been added
        expect(resultBodyHeader).to.not.be.undefined;
        expect(resultBodyHeader.textContent).to.equal('EuroJackpot Results for Mon Feb 24 2020');
    });

    it('should insert table rows', () => {
        // Remove table rows
        const tbody = document.querySelector('table.results-table tbody');
        tbody.innerHTML = '';
        expect(tbody.innerHTML).to.equal('');

        // call the method to create the table content
        euroJackpot.printTable(apiUtils.getRanking());

        // check that the table has been filled
        expect(tbody.innerHTML).to.not.empty;
        expect(tbody.querySelectorAll('tr')).to.have.lengthOf(12);
    });

});

