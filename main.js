let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let clearAll = document.getElementById('clearAll')
let save = document.getElementById('save')
let clientWidth = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight
let previousPoint

canvas.width = clientWidth
canvas.height = clientHeight

canvas.addEventListener('touchmove', function(e){
    e.preventDefault()
    let penType = document.querySelector('input[name="penType"]:checked').value
    let {pageX, pageY} = e.touches[0]
    // let pageX = e.touches[0].pageX
    // let pageY = e.touches[0].pageY

    if(penType === 'pen'){
        if(previousPoint){
            context.strokeStyle = 'green'
            context.lineWidth = 4
            context.fill = 'red'
            context.beginPath()
            context.moveTo(previousPoint.pageX, previousPoint.pageY)
            context.lineTo(pageX, pageY)
            context.stroke()
        }
        previousPoint = {pageX, pageY}
    }else if(penType === 'eraser'){
        context.clearRect(pageX - 10, pageY - 10, 20, 20)
    }
})
canvas.addEventListener('touchend', function(){
    previousPoint = null
})
save.onclick = function(){
    // var canvas = document.getElementById('canvas')
    var data = canvas.toDataURL('image/png')
    var newWindow = window.open('about:blank', 'image from canvas')
    newWindow.document.write('<img src="'+data+'" alt="from canvas"/>')
}
clearAll.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height)
}