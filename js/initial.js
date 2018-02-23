// Remove this function ---- fixed
const readline = require('readline');
const fs = require('fs');

const fileNames = ['../csv/India2011.csv', '../csv/IndiaSC2011.csv', '../csv/IndiaST2011.csv'];
const labels = ['GEN', 'ST', 'SC'];
const agegroup = {};
const eduCategory = {};
let fileRead = 0;

function cb() {
  fileRead += 1;

  if (fileRead === 3) {
    /* Create first file to plot for i.e agegroup versus number of literate persons */

    fs.writeFile('../plot1.json', JSON.stringify(agegroup), (err) => {
      if (err) {
        // console.log(err);
        return 0;
      }

      // console.log('success');
      return 1;
    });
    /* Create second file to plot for category versus number of literate persons */

    fs.writeFile('../plot2.json', JSON.stringify(eduCategory), (err) => {
      if (err) {
        // console.log(err);
        return 0;
      }

      // console.log('success');
      return 1;
    });
  }
}

for (let i = 0; i < fileNames.length; i += 1) { // FIXME: Replace with forEach --fixed
  const lr = readline.createInterface({
    input: fs.createReadStream(fileNames[i]),
  });
    // const lr = new LineByLineReader(fileNames[i]);
  lr.line_count = 0; // FIXME: Use boolean to identify header
  lr.label = labels[i];

  lr.on('line', function fo(line) { // FIXME: Unnecessary named function. Use Arrow function instead.
    this.line_count += 1;
    if (this.line_count === 1) {
      /* using header to avoid hardcoding in the else section ---- fixed */
      const values = line.split(',');

      for (let j = 0; j < values.length; j += 1) { // FIXME: Avoid for loop.
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
          agegroup[values[this.age_index]] += parseInt(values[this.literate_index], 10); // FIXME: Reduce Code Duplication here!
        } else {
          agegroup[values[this.age_index]] = parseInt(values[this.literate_index], 10);
        }
      }
      /* for reading data according to education category */


      if (this.label in eduCategory) {
        // console.log(this.label);
        eduCategory[this.label] += parseInt(values[this.literate_index], 10); // FIXME: Reduce Code Duplication here.
      } else {
        eduCategory[this.label] = parseInt(values[this.literate_index], 10);
      }
    }
  });

  lr.on('close', cb);
}
