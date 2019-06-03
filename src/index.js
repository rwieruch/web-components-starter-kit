import './components/say-something.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>

  <div>
    <h1>Web Components with Webpack Starter Kit</h1>

    Text: <input type="text" />

    <say-something></say-something>
    <say-something color="red"></say-something>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this._shadowRoot.querySelector('input');
    this.$input.addEventListener('input', this._handleChange.bind(this));

    this.$allSaySomething = this._shadowRoot.querySelectorAll('say-something');
  }

  _handleChange() {
    this.$allSaySomething.forEach(element => {
      element.setAttribute('text', this.$input.value)
    });
  }
}

window.customElements.define('my-app', App);
