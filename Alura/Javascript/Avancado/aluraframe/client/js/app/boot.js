'use strict';

System.register(['./controllers/NegociacaoController'], function (_export, _context) {
  "use strict";

  var getInstance, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      getInstance = _controllersNegociacaoController.getInstance;
    }],
    execute: function () {
      negociacaoController = getInstance();


      document.querySelector('.form').onsubmit = negociacaoController.add.bind(negociacaoController);
      document.querySelector('#apaga').onclick = negociacaoController.esvazia.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map