import './utils/array-helpers.js';
import {
    notasService as nService
} from './notas/service.js';
import {
    timeoutPromise,
    retry
} from './utils/promise-helpers.js';
import {
    takeUntil,
    debounceTime,
    partialize,
    compose
} from './utils/operators.js';
import {
    EventEmitter
} from './utils/event-emitter.js';

const operations = compose(partialize(debounceTime, 500),
    partialize(takeUntil, 3));

const action = operations(() => {
    retry(3, 3000, () => timeoutPromise(100, nService.sumItens('2143')))
        .then(total => EventEmitter.emit('itensTotalizados', total))
        .catch(console.error)
});

document.querySelector('#myButton').onclick = action;