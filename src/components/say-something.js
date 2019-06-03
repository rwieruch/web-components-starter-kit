const template = document.createElement('template');

template.innerHTML = `
  <style>
    h2 {
      background-color: blue;
    }
  </style>

  <h2>Hello: <span>World</span></h2>
`;

class SaySomething extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$headline = this._shadowRoot.querySelector('h2');
    this.$span = this._shadowRoot.querySelector('span');
  }

  connectedCallback() {
    if(!this.hasAttribute('color')) {
      this.setAttribute('color', 'orange');
    }

    if(!this.hasAttribute('text')) {
      this.setAttribute('text', '');
    }

    this._render();
  }

  static get observedAttributes() {
    return ['color', 'text'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch(name) {
      case 'color':
        this._color = newVal;
        break;
      case 'text':
        this._text = newVal;
        break;
    };

    this._render();
  }

  _render() {
    this.$headline.style.color = this._color;
    this.$span.innerHTML = this._text;
  }
}

window.customElements.define('say-something', SaySomething);
