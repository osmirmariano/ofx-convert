const xml2json = require('xml2json');
const helper = require('../helpers/helper');

class Ofx {
    constructor() {}
    /**
     * Method to convert ofx in JSON
     * @param {*} data 
     */
    toJson(data) {
        const ofx = data.split('<OFX>', 2);

        const headerString = ofx[0].split(/\r?\n/);
        const header = {};
        headerString.forEach((attrs) => {
            const headAttr = attrs.split(/:/,2);
            header[headAttr[0]] = headAttr[1];
        });

        const content = `<OFX>${ofx[1]}`;

        let dataParsed = null;

        try {
            dataParsed = xml2json.toJson(content, {
                object: true,
            });
            return helper.treatsObject(dataParsed, header);
        } catch (error) {
            var contentTra = helper.tratarXml(content)
            let xml = helper.verifyXml(contentTra);
            dataParsed = xml2json.toJson(xml, {
                object: true,
            });
            return helper.treatsObject(dataParsed, header);
        }
    }

    /**
     * Method to convert json in OFX
     * @param {*} obj
     */
     toOfx(obj) {
        let out = ''
        let head = ''

        const headerKeys = new Object(obj.header)
        Object.keys(headerKeys).map(item => {
          head += `${item}:${obj['header'][item]}\n`
        })
        out += head

        for (var prop in obj) {
          if (prop === 'header') continue
          out += obj[prop] instanceof Array ? '' : "<" + prop + ">";
          if (obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
              out += "<" + prop + ">";
              out += this.toOfx(new Object(obj[prop][array]));
              out += "</" + prop + ">";
            }
          } else if (typeof obj[prop] == "object") {
            out += this.toOfx(new Object(obj[prop]));
          } else {
            out += obj[prop];
          }
          out += obj[prop] instanceof Array ? '' : "</" + prop + ">";
        }

        out = out.replace(/<\/?[0-9]{1,}>/g, '');

        return out
  }
}

module.exports = new Ofx();