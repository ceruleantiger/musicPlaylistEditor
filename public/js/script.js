function getSong() {

    let songTitle = document.getElementById('songTitleTextField').value.trim()
    console.log('songTitle: ' + songTitle)
    if(songTitle === '') {
        return alert('Please enter a Song Title')
    }

    //let songsDiv = document.getElementById('songs_div')
    //songsDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let title = document.getElementById('title')
            let table = document.getElementById('searchresult')
            title.textContent = `Songs matching: ${songTitle}`
            table.innerHTML = ''
            let resultObj = JSON.parse(xhr.responseText)
            let songs = resultObj.results

            songs.forEach(song => {
              //create table row
              let row = document.createElement('tr')
              //fill in cells in the row
              let butcell = document.createElement('td')
              let add = document.createElement('button')
              add.textContent = String.fromCodePoint(0x2795)
              add.addEventListener('click', () => addtoPlaylist(song))
              butcell.appendChild(add)

              let titlec = document.createElement('td')
              titlec.textContent = song.trackName
              let artistc = document.createElement('td')
              artistc.textContent = song.artistName
              let imgc = document.createElement('td')
              let img = document.createElement('img')
              img.src = song.artworkUrl100
              img.alt = "artwork"
              imgc.appendChild(img)

              row.appendChild(butcell)
              row.appendChild(titlec)
              row.appendChild(artistc)
              row.appendChild(imgc)
              
              table.appendChild(row)
            });
          /*let response = JSON.parse(xhr.responseText)
 			songsDiv.innerHTML = songsDiv.innerHTML + `
			<h1>Songs matching: ${songTitle} </h1>
      <p>${xhr.responseText}</p>
			`*/
      }
    }
    xhr.open('GET', `/songs?title=${songTitle}`, true)
    xhr.send()
}

//Attach Enter-key Handler
const ENTER=13

let playlist = []
let expire = 5 * 24 * 60 * 60 * 1000  //5 days

function addtoPlaylist(song) {
  playlist.push(song)
  savetoStorage()
  getPlaylist()
}

function removefromPlaylist(index) {
  playlist.splice(index, 1)
  savetoStorage()
  getPlaylist()
}

function up(index) {
  if (index>0) {
    let temp = playlist[index-1]
    playlist[index-1] = playlist[index]
    playlist[index] = temp
    savetoStorage()
    getPlaylist()
  }
}

function down(index) {
  if (index < playlist.length-1) {
    let temp = playlist[index+1]
    playlist[index+1] = playlist[index]
    playlist[index] = temp
    savetoStorage()
    getPlaylist()
  }
}

function getPlaylist() {
  let table = document.getElementById('playlist')
  table.innerHTML = ''

  playlist.forEach((song, index) => {
    let row = document.createElement('tr')

    let butcell = document.createElement('td')
    let remove = document.createElement('button')
    let upbu = document.createElement('button')
    let downbu = document.createElement('button')

    remove.textContent = String.fromCodePoint(0x2796)
    remove.addEventListener('click', () => removefromPlaylist(index))
    butcell.appendChild(remove)
    upbu.textContent = String.fromCodePoint(0x1F53C)
    upbu.addEventListener('click', () => up(index))
    butcell.appendChild(upbu)
    downbu.textContent = String.fromCodePoint(0x1F53D)
    downbu.addEventListener('click', () => down(index))
    butcell.appendChild(downbu)

    let titlec = document.createElement('td')
    titlec.textContent = song.trackName
    let artistc = document.createElement('td')
    artistc.textContent = song.artistName
    let imgc = document.createElement('td')
    let img = document.createElement('img')
    img.src = song.artworkUrl100
    img.alt = "artwork"
    imgc.appendChild(img)

    row.appendChild(butcell)
    row.appendChild(titlec)
    row.appendChild(artistc)
    row.appendChild(imgc)
    
    table.appendChild(row)
  });
}

function savetoStorage() {
  let memory = {data: playlist, expireat: Date.now()+expire }
  localStorage.setItem("playlist", JSON.stringify(memory))
}

function loadStorage() {
  let storage = localStorage.getItem("playlist")
  if (!storage) {
    playlist = []
    return
  }
  let storeObj = JSON.parse(storage)
  //allow the playlist to be forgotten after an expiry period or date
  if (storeObj.expireat && Date.now()>storeObj.expireat) {
    localStorage.removeItem("playlist")
    playlist = []
    return
  }

  playlist = storeObj.data
}

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}


document.addEventListener('DOMContentLoaded', function() {
  loadStorage()
  getPlaylist()
  
  document.getElementById('submit_button').addEventListener('click', getSong)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)
  
})
