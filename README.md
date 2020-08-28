# ofx-convert #

** Biblioteca para converter arquivo ofx para json e json para ofx para todos os formatos dos bancos.

## Aplicação ##

```js
const ofx = require('ofx-convertjs');

const file = fs.readFileSync('exemplo.ofx', 'utf8')
const data = ofx.toJson(file);
```

## License ##

Este projeto é licensiado sobre MIT License - [LICENSE.md](LICENSE.md) para mais detalhes vide arquivo

## Perfil ##
* Criador: **Osmir Custódio Mariano** - osmirmarianocc@gmail.com
* Link do npm https://www.npmjs.com/package/ofx-convertjs