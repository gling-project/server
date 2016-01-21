myApp.service("imageService", function () {

    this.resizeImage = function (img, width, height) {
        return this.cropImage(img, width, height);
    };


    this.cropImage = function (img, width, height) {

        //convert img to htmlImage
        var imgHtml = document.createElement("img");
        imgHtml.setAttribute('src', img);
        var src = imgHtml;

        // check scale
        var crop = width == 0 || height == 0;
        var xscale = width / src.width;
        var yscale = height / src.height;
        var scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);

        // create empty canvas
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : Math.round(src.width * scale);
        canvas.height = height ? height : Math.round(src.height * scale);
        canvas.getContext("2d").scale(scale, scale);

        // crop it top center
        var right, top;
        right = ((src.width * scale) - canvas.width) * 0.5;
        top = ((src.height * scale) - canvas.height) * 0.5;
        canvas.getContext("2d").drawImage(src, -(right / scale), -(top / scale));
        var image64 = canvas.toDataURL();

        return image64;
    }


});