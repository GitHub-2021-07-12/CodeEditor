import {Mock} from '../../Units/Mock/Mock.js';


export class Playground {
    static url_execute = '/api/execute';


    __language = '';
    __theme = '';


    _editor = null;
    _elements = {};


    get language() {
        return this.__language;
    }
    set language(language) {
        this.__language = language;
        this._elements.select_syntax.value = this.language;
        this._editor.session.setMode(`ace/mode/${this.language}`);
    }

    get text() {
        return this._editor.getValue();
    }
    set text(text) {
        this._editor.setValue(text.trim());
    }

    get theme() {
        return this.__theme;
    }
    set theme(theme) {
        this.__theme = theme;
        this._elements.select_theme.value = this.theme;
        this._editor.setTheme(`ace/theme/${this.theme}`);
    }


    _button_clear__on_click() {
        this.outputContainer__clear();
    }

    _button_run__on_click() {
        this.run();
    }

    _elements__define() {
        this._elements = {
            button_clear: document.querySelector('#playground__button_clear'),
            button_run: document.querySelector('#playground__button_run'),
            editor: document.querySelector('#playground__editor'),
            outputContainer: document.querySelector('#playground__outputContainer'),
            select_syntax: document.querySelector('#playground__select_syntax'),
            select_theme: document.querySelector('#playground__select_theme'),
            template: document.querySelector('#playground__template'),
        };
    }

    _eventListeners__add() {
        this._elements.button_clear.addEventListener('click', this._button_clear__on_click.bind(this));
        this._elements.button_run.addEventListener('click', this._button_run__on_click.bind(this));
        this._elements.select_syntax.addEventListener('change', this._select_syntax__on_change.bind(this));
        this._elements.select_theme.addEventListener('change', this._select_theme__on_change.bind(this));
    }

    _outputItem__create() {
        let outputItem = this._elements.template.content.querySelector('.playground__outputItem').cloneNode(true);
        this._elements.outputContainer.append(outputItem);

        return outputItem;
    }

    _outputItem_data__set(outputItem, data) {
        outputItem.textContent = data.status == 'success' ? data.output : data.error;
        outputItem.setAttribute('status', data.status);
    }

    _select_syntax__on_change(event) {
        this.language = event.target.selectedOptions[0].value;
    }

    _select_theme__on_change(event) {
        this.theme = event.target.selectedOptions[0].value;
    }


    constructor(opts = {}) {
        this.init(opts);
    }

    init({
        language = 'javascript',
        theme = 'chrome',
    } = {}) {
        this._elements__define();
        this._eventListeners__add();
        this._editor = ace.edit(this._elements.editor);

        this.language = language;
        this.theme = theme;
    }

    outputContainer__clear() {
        this._elements.outputContainer.textContent = '';
    }

    async run() {
        let outputItem = this._outputItem__create();

        let fetch_opts = {
            body: {
                code: this.text,
                language: this.language,
            },
            method: 'post',
        };
        let response_json = await Mock.fetch(this.constructor.url_execute, fetch_opts);
        let response_data = JSON.parse(response_json);

        this._outputItem_data__set(outputItem, response_data);
    }
}
