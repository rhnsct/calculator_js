const clearMyHistory = document.getElementById('clearMyHistory')

function respondToClick(clicked_id) {
    if (window.innerWidth < 920) {
        
        checkStateMobile(clicked_id)
    } else {
        
        checkState(clicked_id)
    }
}

function checkState(identity) {
    if (cache.classList.contains('hideIt')) {
        cache.classList.remove('hideIt')
        clearMyHistory.classList.remove('hideIt')
    }
    if (identity == 'closed') {
        cache.classList.add('displayIt');
        cache.classList.add('menuAnimate');
        clearMyHistory.classList.add('displayIt');
        document.getElementById(identity).id = 'opened';
    }   else {

        cache.classList.remove('menuAnimate');
        cache.classList.remove('displayIt');
        clearMyHistory.classList.remove('displayIt');
        document.getElementById(identity).id = 'closed';
    }
}

function checkStateMobile(identity) {
    if (cache.classList.contains('displayIt')) {
        cache.classList.remove('displayIt')
        cache.classList.remove('menuAnimate')
        clearMyHistory.classList.remove('displayIt')
    };
    if (identity == 'closed') {
        cache.classList.remove('hideIt');
        clearMyHistory.classList.remove('hideIt');
        document.getElementById(identity).id = 'opened';
    }   else {
        cache.classList.add('hideIt');
        clearMyHistory.classList.add('hideIt');
        document.getElementById(identity).id = 'closed';
    };
};

function clearEffects() {
    if (cache.classList.contains('hideIt')) {
        cache.classList.remove('hideIt');
        clearMyHistory.classList.remove('hideIt');
    };
    if (cache.classList.contains('displayIt')) {
        cache.classList.remove('displayIt');
        cache.classList.remove('menuAnimate');
        clearMyHistory.classList.remove('displayIt');
    };
};


function respondHover(hover_id) {
    if (hover_id == 'closed') {
        document.getElementById('info').style.display = 'block';
    };
}
;
function exitHover() {
    document.getElementById('info').style.display = 'none';
};

function checkSize() {
    if (window.innerHeight < 920 && window.innerWidth < 1370 && window.orientation == 90) {
        clearEffects()
    } else if (window.innerHeight < 1370 && window.innerWidth < 920 && document.getElementById('opened')) {
        console.log('nay')
        cache.classList.add('hideIt');
        clearMyHistory.classList.add('hideIt');
        document.getElementById('opened').id = 'closed';
    }   else if (document.getElementById('closed')) {
        cache.classList.add('hideIt');
        clearMyHistory.classList.add('hideIt');
        document.getElementById('closed').id = 'opened';
        document.getElementById('opened').id = 'closed';
    }
}
window.addEventListener("orientationchange", function() {
    let isit = document.getElementById('closed')
    console.log(isit)
    if (isit) {

        checkSize()
    }
  }, false);

