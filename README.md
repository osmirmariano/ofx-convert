# ofx-convert #

** Biblioteca para converter arquivo ofx para json e json para ofx para todos os formatos dos bancos.

## Aplicação ##
Converter OFX para JSON
```js
const ofx = require('ofx-convertjs');

const file = fs.readFileSync('exemplo.ofx', 'utf8')
const data = ofx.toJson(file);
```

Converter JSON para OFX
```js
const ofx = require('ofx-convertjs');

const json = {id: 1, name: 'json'}
const data = ofx.toOfx(json);
```

## License ##

Este projeto é licenciado sobre MIT License - [LICENSE.md](LICENSE.md) para mais detalhes vide arquivo

## Perfil ##
* Criador: **Osmir Custódio Mariano** - osmirmarianocc@gmail.com
* Link do npm https://www.npmjs.com/package/ofx-convertjs
