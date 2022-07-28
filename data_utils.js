
function getSums(data) {
    let sums = [];
    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        for (let key in data[i]) {
            if (key != 'Year') {
                sum += parseInt(data[i][key]);
            } else {
                year = data[i][key];
            }
        }

        sums.push({'Year': year, 'Value': sum});
    }
    return sums;
}

function getDataPerField(data) {
    let allVals = {};
    for (let i = 0; i < data.length; i++) {
        let year = 0;
        let vals = {};
        for (let key in data[i]) {
            if (key == 'Year') {
                year = data[i][key];
            } else {
                vals[key] = parseInt(data[i][key]);
            } 
        }
        for (let key in vals) {
            if (!(key in allVals)) {
                allVals[key] = [];
            }
            allVals[key].push({'Year': year, 'Value': vals[key]});
        }
    }
    return allVals;
}

function getRelativePerField(data, sums) {
    let allRelative = {};
    for (let key in data) {
        for (let i = 0; i < data[key].length; i++) {
            if (!(key in allRelative)) {
                allRelative[key] = [];
            }
            allRelative[key].push({'Year': data[key][i].Year, 'Value': (data[key][i].Value/sums[i].Value)});
        }
    }
    return allRelative;
}
