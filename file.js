const http = require('http');
const request = require('request');
const JSONStream = require('JSONStream');
const es = require('event-stream');
const fs = require('fs');
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');

const dataObj = {
    streets: [],
};
let json = {};
console.log('Loading data...');
request({url: 'https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json'})
.on('end', () => {
    json = JSON.stringify(dataObj);
    fs.writeFileSync('data.json', json, 'utf8');
    console.log('Loaded');
})
.pipe(JSONStream.parse('features.*.properties.STREET'))
.pipe(es.mapSync((data) => {
    if (dataObj.streets.indexOf(data) !== -1) {
        return;
    }
    console.log(data);
    dataObj.streets.push(data);
}));

const serve = serveStatic('./', {'index': ['index.html', 'index.htm']});

const server = http.createServer(onRequest = (req, res) => {
    serve(req, res, finalhandler(req, res))
  })

server.listen(8000);

