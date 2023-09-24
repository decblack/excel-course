import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';
    curX = null;
    curY = null;
    cellToResize = null;


    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable();
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target);
            const resizerDefaultHeight = $resizer.getCoords().height;
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();

            const cellsSelector =
                `[data-cell-col="${$parent.$el.innerText}"]`;
            let cellsHeightSum = coords.height;
            $(cellsSelector).each((nextElement) => {
                cellsHeightSum += $(nextElement).getCoords().height;
            });
            $resizer.height((cellsHeightSum ) + 'px');

            document.onmousemove = (e) => {
                const delta = Math.floor(e.pageX - coords.right);
                const newWidth = coords.width + delta;
                $parent.width(newWidth + 'px');

                $(cellsSelector).each((nextElement) => {
                    $(nextElement).width(newWidth + 'px');
                    $resizer.opacity(0.5);
                });
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                $resizer.height(null);
                $resizer.opacity(null);
            };
        }
    }
}
