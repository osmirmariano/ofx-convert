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
            let xml = helper.verifyXml(content);
            dataParsed = xml2json.toJson(xml, {
                object: true,
            });
            return helper.treatsObject(dataParsed, header);
        }
    }

    /**
     * Method to convert json in OFX
     * @param {*} data 
     */
    toOfx(data) {
        let out = '';

        Object.keys(obj).forEach((name) => {
            const item = obj[name];
            const start = `<${name}>`;
            const end = `</${name}>`;

            if (item instanceof Object) {
                if (item instanceof Array) {
                    item.forEach((it) => {
                        out += `${start}\n${toOfx(it)}${end}\n`;
                    });
                    return;
                }
                return out += `${start}\n${toOfx(item)}${end}\n`
            }
            out += start + item + '\n';
        });

        return out;
    }
}

module.exports = new Ofx();