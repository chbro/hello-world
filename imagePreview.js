var imagePreview = function(id) {
    var img = document.getElementById(id)
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d')
    function procecssImage () {
        var imgWidth = img.width,
            imgHeight = img.height,
            worker = new Worker('a.js')
        canvas.width = imgWidth
        canvas.height = imgHeight
        context.drawImage(img, 0, 0, imgWidth, imgHeight)
        worker.addEventListener('message', function(e) {
            var imgData = e.data
            context.putImageData(imgData, 0, 0)
            document.body.appendChild(canvas)
        }, false)
        worker.postMessage(context.getImageData(0, 0, imgWidth, imgHeight))
    }
    img.addEventListener('load', procecssImage, false)
}