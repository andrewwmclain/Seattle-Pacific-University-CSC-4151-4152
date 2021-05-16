const socket = io('');
//test
// socket.emit('join-room', ROOM_ID, 10);
// socket.on('user-connected', userId => {
//     console.log('user connected' + userId + "????");
// });
//test end

const videoGrid = document.getElementById('video-grid')
// const myPeer = new Peer(undefined, {
//     host: '/',
//     port: '3001'
// })

const myPeer = new Peer();

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        alert('user connected')
        connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected', userId => {
    // alert('user disconnected')
    let rateUserBox = document.getElementsByClassName("rateUser")[0]
    rateUserBox.style.display = "block"
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})


function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

document.getElementById("hangUpButton").addEventListener("click", function(){
    window.location.href = "/"
})