System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var View;
    return {
        setters: [],
        execute: function () {
            View = class View {
                constructor(selector, escape = false) {
                    this.elemento = $(selector);
                    this._escape = escape;
                }
                atualizaView(model) {
                    let template = this.template(model);
                    if (this._escape)
                        template = template.replace(/<script>[\s\S]*?<\/script>/, '');
                    this.elemento.html(template);
                }
            };
            exports_1("View", View);
        }
    };
});
