const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(localMediaStream => {
            console.log(localMediaStream);

            //  DEPRECIATION : 
            //       The following has been depreceated by major browsers as of Chrome and Firefox.
            //       video.src = window.URL.createObjectURL(localMediaStream);
            //       Please refer to these:
            //       Depreceated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
            //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject

            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error('Oh no!', err);
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // get the original pixels
        let pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        pixels = redEffect(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
        console.log(pixels);
    }, 16);
}

function takePhoto() {
    // Will not work so long as Wes' server blocks the download request
    // play the sound
    // snap.currentTime = 0;
    // snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src=${data} alt="Handsome Man />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0] + 100; // RED
        pixels.data[i + 500] = pixels.data[i + 1] - 050; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2] + 0.5; // BLUE
    }
    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);