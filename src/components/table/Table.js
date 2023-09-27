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
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();
            let insideMousemove = false;
            const mousemoveIntervalMS = 50;

            // trigger to reduce mousemove handling
            const setMousemoveInsideTrigger = () => {
                insideMousemove = true;
                setTimeout(
                    () => insideMousemove = false,
                    mousemoveIntervalMS
                );
            }


            if ($resizer.$el.classList.contains('col-resize')) {
                // resize column
                const cellsSelector =
                    `[data-cell-col="${$parent.$el.innerText}"]`;
                let cellsHeightSum = coords.height;
                $(cellsSelector).each((nextElement) => {
                    cellsHeightSum += $(nextElement).getCoords().height;
                });
                $resizer.height((cellsHeightSum ) + 'px');

                // optimizaition 1: cache elements to resize
                const elements = $(cellsSelector).elements();


                document.onmousemove = (e) => {
                    if (insideMousemove === true) return;
                    // optimizaition 2: trigger to reduce mousemove handling
                    setMousemoveInsideTrigger();

                    const delta = Math.floor(e.pageX - coords.right);
                    const newWidth = coords.width + delta;

                    $parent.width(newWidth + 'px');

                    elements.forEach((nextElement) => {
                        $(nextElement).width(newWidth + 'px');
                    });

                    $resizer.opacity(0.5);
                };
            } else {
                // resize row
                document.onmousemove = (e) => {
                    if (insideMousemove === true) return;
                    // optimizaition 2: trigger to reduce mousemove handling
                    setMousemoveInsideTrigger();

                    const delta = Math.floor(e.pageY - coords.bottom);
                    const newHeight = coords.height + delta;

                    $parent.height(newHeight + 'px');


                    $resizer.width((coords.width) + 'px');
                    $resizer.opacity(0.5);
                };
            }

            document.onmouseup = () => {
                document.onmousemove = null;
                $resizer.height(null);
                $resizer.width(null);
                $resizer.opacity(null);
            };
        }
    }
}
