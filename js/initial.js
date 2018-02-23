// Remove this function ---- fixed
const readline = require('readline'); // readline ---- fixed
const fs = require('fs');

const fileNames = ['India2011.csv', 'IndiaSC2011.csv', 'IndiaST2011.csv'];
const labels = ['GEN', 'ST', 'SC'];
const agegroup = {}; // FIXME: User proper variable name ---- fixed
const eduCategory = {};
let fileRead = 0;

<
div > < /div>
for (const i in fileNames) { // FIXME: Replace with Array.prototype.forEach --- fixed
    const lr = readline.createInterface({
        input: fs.createReadStream(fileNames[i]),
    });
    // const lr = new LineByLineReader(fileNames[i]);
    lr.line_count = 0;
    lr.label = labels[i];

    lr.on('line', function(line) {
        this.line_count++;
        if (this.line_count === 1) {
            /* using header to avoid hardcoding in the else section ---- fixed */
            const values = line.split(',');

            for (const j in values) {
                if (values[j] === 'Total/ Rural/ Urban') {
                    this.total_index = j;
                } else if (values[j] === 'Age-group') {
                    this.age_index = j;
                } else if (values[j] === 'Literate - Persons') {
                    this.literate_index = j;
                }
            }
        } else {
            const values = line.split(',');
            if (values[this.total_index] === 'Total' && values[this.age_index] !== 'Age not stated' && values[this.age_index] !== 'All ages') { // FIXME: Remove column number hard codings
                if (values[this.age_index] in agegroup) {
                    agegroup[values[this.age_index]] += parseInt(values[this.literate_index]);
                } else {
                    agegroup[values[this.age_index]] = parseInt(values[this.literate_index]);
                }
            }
            /* for reading data according to education category */


            if (this.label in eduCategory) {
                // console.log(this.label);
                eduCategory[this.label] += parseInt(values[this.literate_index]);
            } else {
                eduCategory[this.label] = parseInt(values[this.literate_index]);
            }
        }
    });

    lr.on('close', () => {
        fileRead++;

        if (fileRead === 3) {
            /* Create first file to plot for i.e agegroup versus number of literate persons */

            fs.writeFile('../plot1.json', JSON.stringify(agegroup), (err) => {
                if (err) {
                    return console.log(err);
                }
            });
            /* Create second file to plot for category versus number of literate persons */

            fs.writeFile('../plot2.json', JSON.stringify(eduCategory), (err) => {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}