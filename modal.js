class NamNguyenUniqueModal extends HTMLElement {
  constructor() {
    super();
    this._title = 'Default Title';
    this._message =
      'This is the default message show when displaying the modal';
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.hasAttribute('title')) this._title = this.getAttribute('title');
    if (this.hasAttribute('message'))
      this._message = this.getAttribute('message');
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // switch (name) {
    //   case 'opened': {
    //     if (this.hasAttribute('opened')) {
    //       this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
    //       this.shadowRoot.querySelector('#backdrop').style.pointerEvents =
    //         'all';
    //       this.shadowRoot.querySelector('#modal').style.opacity = 1;
    //       this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    //     }
    //   }
    // }
  }

  static get observedAttributes() {
    return ['opened'];
  }

  open() {
    this.setAttribute('opened', '');
  }

  close() {
    this.removeAttribute('opened');
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        #modal {
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          opacity: 0;
          pointer-events: none;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal
        {
          opacity: 1;
          pointer-events: all;
        }

        #main {
          padding: 1rem;
        }

        header {
          padding: 1rem;
        }

        header h1 {
          font-size: 1.25rem;
        }

        ::slotted(h1) {
          font-size: 1.25rem;
        }

        #actions {
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button {
          margin: 0 0.25rem;
        }
      </style>
      <div>
        <p>Please confirm your choice</p>
        <button id="triggerButton">Show detail & confirm</button>
        <div id="backdrop">
          <div id="modal">
            <header>
              <slot name="title"><h1>${this._title}</h1></slot>
            </header>
            <section id="main">
              <slot name="message">${this._message}</slot>
            </section>
            <section id="actions">
              <button id="cancelButton">Cancel</button>
              <button id="confirmButton">Confirm</button>
            </section>
          </div>
        </div>
      </div>
    `;

    let cancelButton = this.shadowRoot.querySelector('#cancelButton');
    cancelButton.addEventListener('click', this.close.bind(this));
    let confirmButton = this.shadowRoot.querySelector('#confirmButton');
    confirmButton.addEventListener('click', this.close.bind(this));
    let triggerButton = this.shadowRoot.querySelector('#triggerButton');
    triggerButton.addEventListener('click', this.open.bind(this));
  }
}

customElements.define('nn-modal', NamNguyenUniqueModal);
