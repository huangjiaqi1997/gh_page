import axios from 'axios';

const PLAY_SONG = 'PLAY_SONG';
const COLLECT_SONG = 'COLLECT_SONG';
const REMOVE_SONG = 'REMOVE_SONG';
const REMOVE_ALL = 'REMOVE_ALL';
const GET_PLAYLIST = 'GET_PLAYLIST';

export const playSong = (index) => ({
  index,
  type: PLAY_SONG
});
export const collectSong = (index) => ({
  index,
  type: COLLECT_SONG
})
export const removeSong = (index) => ({
  index,
  type: REMOVE_SONG
})
export const removeAll = (index) => ({
  type: REMOVE_ALL
})
const getSuccess = (data) => ({
  type: GET_PLAYLIST, payload: data
})

export const getPlayList = () => {
  return dispatch => {
    // axios.get('/getplaylist')
    axios.get('https://api.douban.com/v2/music/search?q=%E9%BB%84%E5%AE%B6%E9%A9%B9&count=10')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(getSuccess(res.data.data))
        }
      })
  }
}

// db.musics.insert({name: '不再犹豫', isColl: false, lrc: '不再犹豫lrc', img: 'http://pic.xiami.net/images/album/img29/2629/141531470201454.jpg', cate: 'rock', singer: {name: 'Beyond', info: '8万关注 200首歌'}, src: '../../data/Beyond-不再犹豫.mp3'})

const initialState = {
  // playIndex === -1 表示列表为空


  // playIndex: -1,
  playIndex: 0,
  playList:
    [
      {
        id: 'guanghuisuiyue', name: '光辉岁月', isColl: false, lrc: '光辉岁月lrc', img: 'http://pic.xiami.net/images/album/img29/2629/141111342055044.jpg', cate: 'rock', singer: {name: 'Beyond', info: '8万关注 200首歌'}, src: '../../data/Beyond-光辉岁月.mp3'
      },
      {
        id: 'dadi', name: '大地', isColl: false, lrc: '大地lrc', img: 'http://pic.xiami.net/images/album/img29/2629/141641342055060.jpg', cate: 'rock', singer: {name: 'Beyond', info: '8万关注 200首歌'}, src: '../../data/Beyond-大地.mp3'
      },
      {
        id: 'buzaiyouyu', name: '不再犹豫', isColl: false, lrc: '不再犹豫lrc', img: 'http://pic.xiami.net/images/album/img29/2629/141531470201454.jpg', cate: 'rock', singer: {name: 'Beyond', info: '8万关注 200首歌'}, src: '../../data/Beyond-不再犹豫.mp3'
      },
      {
        id: 'changcheng', name: '长城', isColl: false, lrc: '长城lrc', img: 'http://pic.xiami.net/images/album/img29/2629/141461402886250.jpg', cate: 'rock', singer: {name: 'Beyond', info: '8万关注 200首歌'}, src: '../../data/Beyond-长城.mp3'
      }
    ]
}

const playReducer = (state=initialState, action) => {
  switch (action.type) {
    case PLAY_SONG:
      return {
        ...state,
        playIndex: action.index
      }
    case COLLECT_SONG:
      return {
        ...state,
        playList: state.playList.map((item, i) => {
          if (i === action.index) {
            item.isColl = !item.isColl;
          }
          return item;
        })
      }
    case REMOVE_SONG:
      return {
        ...state,
        playList: state.playList.filter((item, i) =>
          i !== action.index
        )
      }
    case REMOVE_ALL:
      return {
        ...state,
        playList: []
      }
    case GET_PLAYLIST:
      return {
        ...state,
        playList: action.payload,
        // 同时playList设为第一首，0
        playIndex: 0
      }
    default:
     return state;
  }
}

export default playReducer;