class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
      <div id="backdrop">
        <div id="modal">
          <header>
            <slot name="title"><h1>Default Header</h1></slot>
          </header>
          <section id="main">
            <slot></slot>
          </section>
          <section id="actions">
            <button>Cancel</button>
            <button>Confirm</button>
          </section>
        </div>
      </div>
    `;
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
}

customElements.define('nn-modal', Modal);
