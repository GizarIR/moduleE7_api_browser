const square = document.querySelector('.square')

square.ondragstart = () => false;

const getCoords = (elem) => {
    const box = elem.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
    };
}

square.addEventListener('mousedown', (e) => {
    const coords = getCoords(square);
    console.log('coords', coords);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    const moveAt = (e) => {
        square.style.left = e.pageX - shiftX + 'px';
        square.style.top = e.pageY - shiftY + 'px';
    }

    const theEnd = () => {
        document.removeEventListener('mousemove', moveAt);
        document.removeEventListener('mouseup', theEnd);
      }
    
    square.style.position = 'absolute';
    square.style.zIndex = 1000;

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', theEnd);
    
});
