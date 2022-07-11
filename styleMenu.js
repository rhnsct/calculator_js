
function respondToClick(clicked_id) {
    checkState(clicked_id)

}

function checkState(identity) {
    if (identity == 'closed') {
        cache.classList.add('menuAnimate');
        document.getElementById(identity).id = 'opened';
    }   else {
        cache.classList.remove('menuAnimate');
        document.getElementById(identity).id = 'closed';
    }
}


function respondHover(hover_id) {
    if (hover_id == 'closed') {
        document.getElementById('info').style.display = 'block'
    }
}

function exitHover() {
    document.getElementById('info').style.display = 'none'
}