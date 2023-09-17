const CODES = {
    A: 65,
    Z: 90
}

function toCell(selected = false) {
    return `
        <div class="cell ${selected ? 'selected' : ''}" contenteditable></div>
    `;
}

function toColumn(col) {
    return `
        <div class="column">
            ${col}
        </div>
    `;
}

function createRow(info, content) {
    return `
        <div class="row">
            <div class="row-info">${info}</div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowSel = 1, colSel = 1, rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    rows.push(createRow('', cols));


    for (let i = 1; i <= rowsCount; i++) {
        const toCellSelected = (_, colIndex) =>
            toCell(rowSel == i && colSel == colIndex + 1);

        const row = createRow(
            i,
            new Array(colsCount)
                .fill('')
                .map(toCellSelected)
                .join('')
        );

        rows.push(row);
    }

    return rows.join('');
}
