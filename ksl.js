/**
 * Created by danle on 4/13/16.
 */
var casper = require('casper').create({
    verbose: true,
    logLevel: 'error',
    clientScripts: ["public/lib/jquery.min.js", "public/lib/lodash.js"]
});

var fs = require('fs'),
    url = 'http://www.ksl.com/?nid=231&cat=554&category=16',
    title = [],
    price = [],
    output = [];

function outputJSON() {
    output.push({
        title: title,
        price: price
    });
    return JSON.stringify(output);
}

function getTitle() {
    var title = $('.adTitle a');
    return _.map(title, function(e) {
        return e.innerHTML;
    })
}
function getPrice() {
    var price = $('.priceBox a');
    return _.map(price, function(e) {
        return e.innerText.replace(/\'span.priceCents'/g,"");
    })
}

casper.start(url, function() {
    this.echo(this.getTitle());
    this.sendKeys('input#keywordInput', 'MacBook Pro');
    this.click('input#searchSubmit');
});

casper.waitForSelector('.adBox', function() {
    console.log('computer selector is loaded');
});

casper.then(function() {
    this.sendKeys('input#minPriceInput', '800');
    this.sendKeys('input#maxPriceInput', '1000');
    this.click('input#priceSubmit');
});

casper.then(function() {
    title = this.evaluate(getTitle);
});

casper.then(function() {
    price = this.evaluate(getPrice);
});

casper.run(function() {
    var data = outputJSON();
    fs.write('data.json', data, 'w');
    this.echo("\n Exection terminated").exit();
});