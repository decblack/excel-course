import {$} from '@core/dom';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');

        this.components = this.components.map((Component) => {
            const $domEl = $.create('div', Component.className);
            const component = new Component($domEl);

            $domEl.html(component.toHTML());
            $root.append($domEl);
            return component;
        });

        return $root;
    }

    render() {
        this.$el.append(this.getRoot());

        this.components.forEach((component) => component.init());
    }
}
