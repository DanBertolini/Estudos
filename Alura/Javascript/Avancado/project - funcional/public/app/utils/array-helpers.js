//Nome começando com $ para não conflitar com nomes da propria linguagem
if(!Array.prototype.$flatMap){
    Array.prototype.$flatMap = function(cb) {
        return this.map(cb).reduce((final, current) => final.concat(current), [])
    }
}