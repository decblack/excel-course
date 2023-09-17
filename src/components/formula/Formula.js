import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }

    toHTML() {
        super.toHTML();

        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(event) {
        console.log('Formula: onInput', event.target.textContent);
        console.log(this.$root);
    }

    onClick(event) {
        console.log(event);
    }
}
