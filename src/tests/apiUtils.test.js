global.fetch = require("node-fetch");
var assert = require('assert');
var expect = require('chai').expect;

const main = require('../js/main');

describe('ApiUtils Class', () => {
    let mockResponse;
    let apiUtils;
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
        apiUtils = new main.ApiUtils(mockResponse);
    });

    it('should ApiUtils be instantiated', () => {
        expect(apiUtils).to.not.be.undefined;
    });

    it('should equals results numbers', () => {
        expect(apiUtils.getResultNumbers()).to.deep.equal([5, 12, 20, 29, 48]);
    });

    it('should equals euro numbers', () => {
        expect(apiUtils.getEuroNumbers()).to.deep.equal([7,9]);
    });

    it('should equals date object', () => {
        expect(apiUtils.getEuroJackpotDate()).to.deep.equal({
            "full": "Die Lottozahlen vom Freitag, den 24.01.2020",
            "day": 24,
            "month": 1,
            "year": 2020,
            "hour": 21,
            "minute": 0,
            "dayOfWeek": "Freitag"
        });
    });

    it('should equals ranking list', () => {
        const rankingList = apiUtils.getRanking();
        expect((rankingList)).to.deep.equal({
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
        });
    });
});

