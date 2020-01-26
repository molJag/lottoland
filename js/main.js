{
    /**
     * Api Utils Class
     * 
     * Used to extract data from a API response
     * @example
     * const apiUtils = new ApiUtils(response);
     */
    class ApiUtils {

        /**
         * @param {object} response - Api call's response object
         */
        constructor(response = {}) {
            this.response = response;
        }

        /** 
         * Get the results numbers 
         * @returns {string[]} results numbers in an array
         */
        getResultNumbers() {
            return (this.response.last && this.response.last.numbers) || [];
        }

        /** 
         * Gets the euro numbers
         * @returns {string[]} euro numbers in an array
        */
        getEuroNumbers() {
            return (this.response.last && this.response.last.euroNumbers) || [];
        }

        /**
         * Get the ranking list
         * @returns {object[]} ranking list
         */
        getRanking() {
            return (this.response.last && this.response.last.odds) || [];
        }

        /**
         * Get the date of the euro jackpot
         * @returns {object} date
         */
        getEuroJackpotDate() {
            return (this.response.last && this.response.last.date);
        }
    }

    /**
     * Result table class
     * 
     * Class used to build the result table
     */
    class EuroJackpot {

        /**
         * @param {*} apiResponse 
         */
        constructor(apiResponse = {}) {
            this.apiUtils = new ApiUtils(apiResponse);
            this.DOM = {table: document.querySelector('table.results-table tbody')};
            this.DOM.resultHeader = document.querySelector('.results-header');
            this.DOM.resultBodyHeader = document.querySelector('.results-body-header');
            this.matchs = [
                '5 Numbers + 2 Euronumbers',
                '5 Numbers + 1 Euronumber',
                '5 Numbers + 0 Euronumbers',
                '4 Numbers + 2 Euronumbers',
                '4 Numbers + 1 Euronumber',
                '4 Numbers + 0 Euronumber',
                '3 Numbers + 2 Euronumbers',
                '2 Numbers + 2 Euronumbers',
                '3 Numbers + 1 Euronumber',
                '3 Numbers + 0 Euronumbers',
                '1 Number + 2 Euronumbers',
                '2 Numbers + 1 Euronumber'
            ];
            this.romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII']
            this.printTable(this.apiUtils.getRanking());
            this.printResultNumbers(this.apiUtils.getResultNumbers(), this.apiUtils.getEuroNumbers());
            this.printEuroJackpotDate(this.apiUtils.getEuroJackpotDate());
        }

        /**
         * Inserts rows in the result table
         * @param {object[]} rankingList 
         */
        printTable(rankingList) {
            let index = 0;
            delete rankingList.rank0;
            for (const rank in rankingList) {
                // create new row
                let node = document.createElement('tr');
                // and adds result in the row
                node.innerHTML = `
                    <td>${index < 13 ? this.romanNumbers[index] : index}</td>
                    <td>${this.matchs[index]}</td>
                    <td>${rankingList[rank].winners}x</td>
                    <td>&euro;${rankingList[rank].prize.toLocaleString()}</td>
                `;
                this.DOM.table.appendChild(node);
                index++;
            }
        }

        /**
         * Build and inserts eurojackpot numbers into the section
         * @param {string[]} resultNumbers 
         * @param {string[]} euroNumbers 
         */
        printResultNumbers(resultNumbers = [], euroNumbers = []) {
            const ulNode = document.createElement('ul');
            ulNode.classList.add('results-number-list');
            // Loop over result numbers list
            for (let index = 0, length = resultNumbers.length; index < length; index++) {
                let liNode = document.createElement('li');
                liNode.textContent = resultNumbers[index];
                ulNode.appendChild(liNode);
            }

            // Loop over euro numbers list
            for (let index = 0, length = euroNumbers.length; index < length; index++) {
                let liNode = document.createElement('li');
                liNode.textContent = euroNumbers[index];
                // add a specific class to distinguish from others numbers
                liNode.classList.add('euro-number');
                ulNode.appendChild(liNode);
            }
            return this.DOM.resultHeader.appendChild(ulNode);
        }

        printEuroJackpotDate(date = {}) {
            let textContent = '<strong>EuroJackpot Results</strong>';
            if (date.year && date.month && date.day && typeof date.hour !== undefined && typeof date.minute !== undefined) {
                const euroDate = new Date(date.year, date.month, date.day, date.hour, date.minute);
                textContent += ` for ${euroDate.toDateString()}`;
            }
            this.DOM.resultBodyHeader.innerHTML = textContent;
        }
    }

    /********************************/
    /************* API call *********/

    // fetch eurojackpot results
    const loadResults = () => {
        const props = {
            method: 'GET',
            mode: 'cors',
            cache: 'default' 
        };
        return fetch('https://media.lottoland.com/api/drawings/euroJackpot', props);
    };

    // And then...
    loadResults().then((response) => {
        // if the response is successfull
        if(response.ok) {
            return response.json();
        }
    }).then((myJson) => {
        // Initialize the EuroJackpot
        new EuroJackpot(myJson);
    }).catch((err) => err);

    exports.ApiUtils = ApiUtils;
    exports.EuroJackpot = EuroJackpot;
};
