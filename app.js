'strict';

const Cell = class {
    constructor(param) {
        this.doc = document;
        this.parent = param.parent;
        this.parent_doc = this.doc.querySelector(param.parent);
        this.cell = param.cell;
        this.heightCellAll = null;
        this.widthLength = param.widthLength;
        this.heightLength = param.heightLength;
        this.miro = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0],
            [1, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0],
        ];
        this.cellValue = 0;
    }
    init() {
        const start = this.parent_doc.querySelectorAll(`.${this.cell}`)[0].children[0];
        start.innerHTML = 'START';
        start.classList.add('pass');
        this.parent_doc.querySelectorAll(`.${this.cell}`)[this.heightLength-1].children[this.widthLength-1].innerHTML = 'END';
    }
    createHeightCell() {
        for(let i = 0; i < this.heightLength; i++) {
            const createHeightCell = this.doc.createElement('div');
            createHeightCell.classList.add(this.cell);
            this.parent_doc.appendChild(createHeightCell);

            this.createWidthCell(i);
        }
        this.heightCellAll = this.parent_doc.querySelectorAll(`.${this.cell}`);
    }
    createWidthCell(i) {
        for(let j=0; j < this.widthLength; j++) {
            const createWidthCell = this.doc.createElement('div');
            this.doc.querySelectorAll(`.${this.cell}`)[i].appendChild(createWidthCell);
        }
    }
    cellInjectValue() {
        for(let i=0; i<this.heightLength; i++) {
            for(let j=0; j<this.widthLength; j++) {
                this.handleClick(i, j);
            }
        }
    }
    handleClick(i, j) {
        this.heightCellAll[i].childNodes[j].addEventListener('click', (e) => {
            this.handleClickVerify(i, j, e);
            this.handleClickErrorVerify(i, j, e);
            this.handleErrorCheck(e);
        });
    }
    handleClickVerify(i, j, e) {
        if(!(typeof (i, j) !== 'undefined')) return;
        const cellState = this.miro[i][j];
        if(cellState === 0) return e.target.classList.add('pass');
        else if(cellState === 1) e.target.classList.add('wall');
    }
    handleErrorCheck(e) {
        if (e.target.classList.contains('wall')) {
            return alert('실패했습니다.');
            // this.handleErrorInit();
        }
    }
    handleErrorInit() {
        for(let i=0; i<this.heightLength; i++) {
            for(let j=0; j<this.widthLength; j++) {
                this.heightCellAll[i].childNodes[j].classList.remove('pass', 'wall');
                this.init();
            }
        }
    }
    handleClickErrorVerify(i, j, e) {
        let cellHasClass = '';
        if(this.heightCellAll[i+1]) cellHasClass += this.heightCellAll[i+1].children[j].classList;
        if(this.heightCellAll[i-1]) cellHasClass += this.heightCellAll[i-1].children[j].classList;
        if(this.heightCellAll[i].children[j+1]) cellHasClass += this.heightCellAll[i].children[j+1].classList;
        if(this.heightCellAll[i].children[j-1]) cellHasClass += this.heightCellAll[i].children[j-1].classList;

        if(!cellHasClass.length) {
            e.target.classList.remove('wall', 'pass');
            alert('블록을 건너띄면서 진행할수 없습니다.');
        } else {
            this.complete();
        }
    }
    complete() {
        if(this.parent_doc.querySelectorAll(`.${this.cell}`)[this.heightLength-1].children[this.widthLength-1].classList.length) {
            alert('완료');
        }
    }
    render() {
        this.createHeightCell();
        this.init();
        this.cellInjectValue();
        this.handleClickVerify();
    }
}
cellParam = {
    parent: '.root',
    cell: 'heightCell',
    widthLength: 7,
    heightLength: 7
};
const cell = new Cell(cellParam);
cell.render();