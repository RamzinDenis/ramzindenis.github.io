tableHTML = `
<div class='table-container__title'>
<h3 class='title'> <i class="fas fa-table"></i><span class='text'>Tables</span> </h3>
</div>
<div class='table-container__input'>
    <input class='col' type='text' min='4' max='10' placeholder="Col number"/>
    <input class='row' type='text' min='4' max='10' placeholder="Row number"/>
</div>
<div class="create-table">
<button class='submit'> Create table </button>
</div>
<div class='trash'>
<i class="fas fa-sync-alt"></i>
</div>
`
let dataTable = [];

document.querySelectorAll('.fa-table, .table').forEach(table => table.onclick = event => {
    if (document.querySelector('.table-container')) {
        document.querySelector('.table-container').remove()
    }

    else {
        const tableContainer = document.createElement('div');
        const selector = '.table-col'
        tableContainer.classList.add('table-container');
        tableContainer.innerHTML = tableHTML;
        rightCol.prepend(tableContainer)

        const table = document.createElement('table');
        table.classList.add('table');

        document.querySelector('.create-table').firstElementChild.onclick = () => {
            if (document.querySelector('td')) return;
            dataTable = [];
            const rowNumber = tableContainer.querySelector('.row').value;
            const colNumber = tableContainer.querySelector('.col').value;
            if (rowNumber > 6 || colNumber > 20) return;
            Table.createRow(rowNumber);
            document.querySelectorAll('tr').forEach(tr => {
                for (let i = 0; i < colNumber; i++) {
                    Table.createTableData(tr)
                }
            })
            dataTable.push(rowNumber, colNumber)
            Store.saveDataTable()

            tableContainer.querySelector('.row').value = '';
            tableContainer.querySelector('.col').value = '';

        }
        document.querySelector('.create-table').append(table)

        document.querySelector('.fa-sync-alt').addEventListener('click', removeTable)

        /// === CLASS TABLE BEGINS === ///

        class Table {
            constructor(id, text) {
                this.id = id
                this.text = text

                this.edit = function (e) {
                    const textArea = document.createElement('textarea');
                    const tableCell = e.target;

                    editStart(textArea, tableCell)
                    selectTextarea(textArea)
                    textArea.onkeydown = confirmEdit;

                    textArea.onblur = function () {
                        dataTable.find(data => data.id == id).text = textArea.value;
                        onBlur(textArea, tableCell)
                        Store.saveDataTable()
                    }
                }
                this.dragAndDrop = function (el, selector) {
                    function dragStart(e) {
                        this.style.opacity = '0.4';
                        e.dataTransfer.setData('number', id)
                        e.dataTransfer.effectAllowed = 'all';
                        e.dataTransfer.setData('text/html', this.innerHTML)
                        dragSrcEl = this;
                    }

                    function dragDrop(e) {
                        if (dragSrcEl != this) {
                            dragSrcEl.innerHTML = this.innerHTML;
                            dataTable.find(data => data.id == e.dataTransfer.getData('number')).text = dragSrcEl.textContent;

                            this.innerHTML = e.dataTransfer.getData('text/html');
                            dataTable.find(data => data.id == id).text = this.textContent;

                            Store.saveDataTable()
                        }
                        return false
                    }

                    function addEventsDragAndDrop(el, selector) {
                        el.addEventListener('dragstart', dragStart);
                        el.addEventListener('dragenter', dragEnter);
                        el.addEventListener('dragover', dragOver);
                        el.addEventListener('dragleave', dragLeave);
                        el.addEventListener('drop', dragDrop);
                        el.addEventListener('dragend', function (event) {
                            dragEnd(el, selector)
                        });
                    }
                    addEventsDragAndDrop(el, selector)

                    Store.saveDataTable()
                }
            }
            static createRow(value) {
                for (let i = 0; i < value; i++) {
                    const row = document.createElement('tr');
                    row.classList.add('table-row');
                    table.append(row)
                }
            }
            static createTableData(tr, id = Math.random(), text = '') {
                const tableCellData = new Table(id, text);
                const col = document.createElement('td');
                col.textContent = text;
                col.classList.add('table-col');
                col.ondblclick = tableCellData.edit;
                col.setAttribute('draggable', 'true')
                tableCellData.dragAndDrop(col, selector)
                tr.appendChild(col)
                dataTable.push(tableCellData)
            }
        }

        /// === CLASS TABLE ENDS === ///

        class Store {
            constructor(tableData) {
                this.td = tableData.pop()
                this.tr = tableData.pop()
            }
            static saveDataTable() {
                localStorage.setItem('table', JSON.stringify(dataTable))
            }
            static displayTable() {
                const tableData = JSON.parse(localStorage.getItem('table'));
                const {tr,td} = new Store(tableData);
                Table.createRow(tr);
                let j = 0;
                document.querySelectorAll('tr').forEach(tr => {
                    for (let i = 0; i < td; i++) {
                        Table.createTableData(tr, tableData[j].id, tableData[j].text)
                        j++
                    }
                })
                dataTable.push(document.querySelectorAll('tr').length, document.querySelector('tr').querySelectorAll('td').length)
                Store.saveDataTable()
            }
        }
        if (localStorage.getItem('table')) {
            Store.displayTable()
        }

        function removeTable() {
            table.innerHTML=``;
            localStorage.removeItem('table')
        }
    }
});
