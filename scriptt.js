const button = $('button');
const envelope = $('.envelope');
var flipped = false;

function pullOut() {
    return new TimelineMax()
        .to('.flap', 1, {
            rotationX: 180,
            ease: Power1.easeInOut
        }, 'scaleBack')
        .to('.invitation', 1, {
            scale: 1.9,
            ease: Power4.easeInOut,
        }, 'scaleBack')
        .set('.flap', {
            zIndex: 0
        })
        .to('.card', 1, {
            y: '0%',
            scaleY: 1.3,
            ease: Circ.easeInOut,
        })
        .set('.mask', {
            overflow: 'visible',
            onComplete: function() {
                envelope.toggleClass('is-open');
            }
        })
        .to('.mask', 1.3, {
            'clip-path': 'inset(0 0 0% 0)',
            ease: Circ.easeInOut,
        }, 'moveDown')
        .to('.card', 1.3, {
            y: '100%',
            scaleY: 1,
            ease: Circ.easeInOut,
        }, 'moveDown')
        .to('button', 1, { // Botão sobe junto com a abertura do envelope
            y: '180px',
            ease: Circ.easeInOut,
            onComplete: function() { // Adicionado onComplete aqui
                toggleText(); // Chama toggleText() após a animação pullOut()
            }
        }, 'moveDown+=0.15');
}

function toggleFlip() {
    if (!envelope.hasClass('is-open')) {
        return;
    }

    const ry = flipped ? 0 : 180;
    const buttonY = flipped ? '180px' : '240px';
    flipped = !flipped;

    TweenMax.to('.card', 1, {
        rotationY: ry,
        ease: Power4.easeInOut,
        onComplete: toggleText
    });

    TweenMax.to('button', 1, { // Botão só se move aqui após a folha ser virada
        y: buttonY,
        ease: Circ.easeInOut
    });
}

function toggleText() {
    var text = flipped ? 'Clique para Voltar' : 'Clique para Virar';
    button.toggleClass('invert', flipped).text(text);
}

button.one('click', pullOut);
button.on('click', toggleFlip);
