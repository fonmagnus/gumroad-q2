let links = document.links;

const addStyles = function () {
  let styles = `
    * {
      font-family: sans-serif;
    }

  	.modal {
      display: none; 
      position: fixed; 
      z-index: 1; 
      padding-top: 100px; 
      left: 0;
      top: 0;
      width: 100%; 
      height: 100%; 
      overflow: auto; 
      background-color: rgb(0,0,0); 
      background-color: rgba(0,0,0,0.4); 
    }

    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
    }

    /* The Close Button */
    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    iframe {
      width:100%;
      height:500px;
    }
  `;

  var styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};
addStyles();

const addModal = {
  addCloseBtn: function() {
    closeBtn = document.createElement('span');
    closeBtn.setAttribute('class', 'close');
    closeIcon = document.createTextNode('x');
    closeBtn.appendChild(closeIcon);
    return closeBtn;
  },
  addModalContent: function() {
    modalContent = document.createElement('div');
    modalContent.setAttribute('id', 'gumroadModalContent');
    modalContent.setAttribute('class', 'modal-content');
    modalContent.appendChild(this.addCloseBtn());
    return modalContent;
  },
  addModal: function() {
    console.log('here')
    modal = document.createElement('div');
    modal.setAttribute('id', 'gumroadModal');
    modal.setAttribute('class', 'modal');
    modal.appendChild(this.addModalContent());
    document.body.appendChild(modal);
    return modal;
  }
}
  
const popUpModal = function() {
  let modal = document.getElementById('gumroadModal');
  let span = document.getElementsByClassName('close')[0];
  modal.style.display = 'block';
  span.onclick = function () {
    modal.style.display = 'none';
  }      
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

const addIframeToModal = function(link) {
  let currentIframe = document.getElementById("gumroadIframe");
  if (currentIframe) {
    currentIframe.outerHTML = '';
  }

  let iframe = document.createElement('iframe');
  iframe.src = link;
  iframe.setAttribute('id', `gumroadIframe`)

  let modalContent = document.getElementById('gumroadModalContent');
  modalContent.appendChild(iframe);
}

for (let i = 0; i < links.length; i++) {
  if (links[i].href.includes('https://gumroad.com') || 
      links[i].href.includes('https://gum.co')) {
      
      links[i].target = `gumroadIframe-${links[i].href}`
      links[i].onclick = function (event) {
        event.preventDefault();
        addModal.addModal();
        popUpModal();
        addIframeToModal(links[i].href);
      }
  }
}
