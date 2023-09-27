class Dom {
    constructor(selector) {
        this.$els = typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : selector;

        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    each(f) {
        this.$els.forEach(($nextElement) => {
            f($nextElement);
        });
    }

    elements() {
        return this.$els;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    clear() {
        this.html('');
        return this;
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    width(value) {
        if (value === undefined) {
            return this.$el.style.width;
        } else {
            this.$el.style.width = value;
            return this;
        }
    }

    height(value) {
        if (value === undefined) {
            return this.$el.style.height;
        } else {
            this.$el.style.height = value;
            return this;
        }
    }

    opacity(value) {
        if (value === undefined) {
            return this.$el.style.opacity;
        } else {
            this.$el.style.opacity = value;
            return this;
        }
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const nativeEl = document.createElement(tagName);
    if (classes) {
        nativeEl.classList.add(classes);
    }
    return $(nativeEl);
}
