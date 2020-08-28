/**
 * Treat xml tag
 * @param {*} xml 
 */
const verifyXml = (xml) => {
    return xml.replace(/>\s+</g, '><')
        .replace(/\s+</g, '<')
        .replace(/>\s+/g, '>')
        .replace(/<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)/g, '<\$1\$2>\$3')
        .replace(/<(\w+?)>([^<]+)/g, '<\$1>\$2</\$1>')
        .replace(/&/g, '&amp;');
}

/**
 * Treat object reponse
 * @param {*} object 
 * @param {*} header 
 */
const treatsObject = (object, header) => {
    object.header = header
    if (object.OFX.BANKMSGSRSV1) {
        object.OFX.BANKMSGSRSV1 = {
            ...object.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS,
            ...object.OFX.BANKMSGSRSV1.STMTTRNRS.BANKACCTFROM
        }
        return object;
    }
    else {
        object.OFX.BANKMSGSRSV1 = {
            ...object.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS,
            DTEND: object.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTEND,
            DTSTART: object.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.DTSTART,
            BANKACCTFROM: object.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.CCACCTFROM
        }
        delete object.OFX.CREDITCARDMSGSRSV1
        return object;
    }
}

module.exports = { verifyXml, treatsObject }