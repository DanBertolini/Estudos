const events = new Map();

export const EventEmitter = {
    emit(topic, data) {
        const listeners = events.get(topic)
        if (listeners)
            listeners.forEach(listener => {
                listener(data);
            });
    },
    on(topic, listener) {
        if (!events.has(topic)) {
            events.set(topic, []);
        }

        events.get(topic).push(listener);
    }
}