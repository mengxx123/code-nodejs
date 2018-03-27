const officegen = require('officegen')
const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')
const conversion = require("phantom-html-to-pdf")()

function genPdf(tables, dbPath) {

    // let sequelize
    for (let table of tables) {

    }
    // var pdfo = new pdf();
    // var text = 'What you wanna write to the pdf document.';
    //
    // pdf.pipe(fs.createWriteStream('Aim.pdf'));
    // pdfo.text(text,0,0);
    // pdfo.end();


    return new Promise(function(resolve, reject){
        // var doc = new PDFDocument();
        // doc.pipe(fs.createWriteStream('table.pdf'));
        // doc.font('asd.ttf')
        // doc.text('232323')
        // doc.end()

        console.log(path.resolve(dbPath, 'html/index.html'))
        let html = fs.readFileSync(path.resolve(dbPath, 'html/index.html'), 'utf-8')
        let style = fs.readFileSync(path.resolve(dbPath, 'html/index.css'), 'utf-8')
        html = html.replace(/\/\* auto \*\//, style)
        // console.log(html)

        conversion({ html: html }, function(err, pdf) {
            var output = fs.createWriteStream(path.resolve(dbPath, 'table.pdf'))
            console.log(pdf.logs);
            console.log(pdf.numberOfPages);
            // since pdf.stream is a node.js stream you can use it
            // to save the pdf to a file (like in this example) or to
            // respond an http request.
            pdf.stream.pipe(output);

            resolve()
        });


    })
}

module.exports = genPdf
