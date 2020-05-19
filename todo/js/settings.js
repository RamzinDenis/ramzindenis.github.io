const settings = document.querySelectorAll('.fa-cogs, .list-notes__text_small');
const $ = {};
let noop;
let settingsData = {
    remove : false,
    fontStyle: false,
    textShadow: false
}

settings.forEach(icon => icon.onclick = event => {
    settingsWindow.open()
});

// callback for removing on YES button
function callback(id) {
    return function() {
    remove(id)
    }
}


function _createModal(options) {
    const DEFAULT_HEIGHT = '250px';
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('hidden')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close='true'>
			<div class="modal-window" style = 'width: ${options.width || DEFAULT_WIDTH}; min-height: ${options.height || DEFAULT_HEIGHT}'>
				<div class="modal-header">
					<div class='modal-title'>${options.title || 'Window'}</div>
					<span class='modal-close' data-close = 'true'>&times; </span>
				</div>
				<div class="modal-body" data-content ='true'>
                  ${options.content || ''}
					
				</div>
			</div>
        </div> `);
        
        const footer = _createModalFooter(options.footerButtons);
        modal.querySelector('[data-content]').after(footer);
        document.body.prepend(modal);

        return modal;
};

function _createModalFooter(buttons = []) {
    if(buttons.length === 0) return document.createElement('div');

    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');

    buttons.forEach(btn=> {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('btn');
        $btn.classList.add(`${btn.type || 'secondary'}`);
        $btn.onclick = btn.handler || noop;

        wrap.appendChild($btn)
    })

    return wrap;
};

$.modal = function(options) {
    const $modal = _createModal(options);

    const modal = {
        open() {
             $modal.classList.add('open');
            $modal.classList.remove('hidden');
        },
        close() {
            
            $modal.classList.remove('open');
            $modal.classList.add('hidden')
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    }
    const listener = event => {
        if (!event.target.dataset.close) return;
        modal.close()
    }

    $modal.addEventListener('click', listener)

    return modal;    
};

const removeWindow = $.modal({
    width: '400px',
    height: '220px',
    title: `<h4 class='title'> Are you sure? </h4>`,
    footerButtons: [{
        text:'Cancel',
        type:'primary',
        handler() {
            
            removeWindow.close()
             
        }
    }, {
        text:'Yes',
        type:'secondary',
        handler() {
           noop(); 
            removeWindow.close()             
        }
    }]
})

const settingsWindow = $.modal({
    width: 400 + 'px',
    title: `<i class="fas fa-cogs"></i> <h4 class="title">Settings</h4>`,
    footerButtons: [{
        text:'Save changes',
        type:'primary',
        handler() {
            settingsWindow.close()
             saveSetting()
        }
    }, {
        text:'Cancel',
        type:'secondary',
        handler() {
            settingsWindow.close()
        }
    }]
})



settingsWindow.setContent(`<div class="check">
<span class='text'> Validation on remove: </span>
<button class='toggle toggle-remove'><span class='ball ball-remove'></span></button>
</div>

<div class="check">
<span class='text'>Todo list font-style cursive:  </span>
<button class='toggle'><span class='ball'></span></button>
</div>

<div class="check">
<span class='text'> Left-column menu textshadow: </span>
<button class='toggle'><span class='ball'></span></button>
</div>

`)


/// === Local Storage for settings=== ///
function saveSetting() {
  localStorage.setItem('settings', JSON.stringify(settingsData)) 
}

if(localStorage.getItem('settings')) {
    const removeButton = document.querySelector('.toggle-remove')
    settingsData = JSON.parse(localStorage.getItem('settings'))
    removeButton.setAttribute('checked', `${settingsData.remove}`) 
    if(settingsData.remove)  {
        document.querySelector('.ball-remove').classList.add('move');
        removeButton.classList.add('light-blue')
    }else {
        removeButton.removeAttribute('checked')
    }
    settingsToggle()
}

/// === /Local Storage for settings=== ///


function settingsToggle() {
    document.querySelectorAll('.toggle').forEach(toggle => toggle.onclick = event => {

        // to fix errors when you missing the ball
        if(event.target.closest('.ball')) {
        const ball = event.target.closest('.ball');
        ball.classList.toggle('move');
        toggle.classList.toggle('light-blue');

            // atribbute toggle
          if(toggle.getAttribute('checked')) {
            toggle.removeAttribute('checked')
            settingsData.remove = false;
            saveSetting()
          }else {
              toggle.setAttribute('checked' ,'true')
              settingsData.remove = true;
              saveSetting()
          }  
      }
    });
};
// Validation on removing items
function confirm(target) {
    if(document.querySelector('.toggle-remove').getAttribute('checked')) {
        removeWindow.setContent(`
        <div class='remove'>
        <i class="fas fa-trash-alt"></i>
        <span class="text">You are deleting <br> <strong>${target.closest('.todo-item__wrap').textContent}</strong> </span>
        </div>
        `);
        removeWindow.open();
        return true;
        
    }
  }

  settingsToggle()
