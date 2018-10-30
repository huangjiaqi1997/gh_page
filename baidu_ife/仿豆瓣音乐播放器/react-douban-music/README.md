功能分析：
  1、登录
    弹出登录对话框

  2、播放列表收藏

  3、播放列表点击播放

  3、播放列表单条清除

  4、播放列表全部清除

  5、Side(查看\收起歌词)
    
  5、控制组件调节进度

  6、控制组件调节播放模式

  7、控制组件调节音量

  8、控制组件切换播放暂停

  9、控制组件上/下一首


Action：

  showLogin

  collectSong(id)

  playSong(id)

  removeSong(id)

  removeAll

  changeModel


state: {
  user: {
    isLogin
    info ..
  }

  global: {
    playingId // -> index
    model
  }
  
  playList: [
    {
      id,
      isColl,
      lrc,
      img,
      cate,
      singer: {
        name, info
      }
    }
  ]
}




  Head组件
    state: {
      showDialog
    }
    isLogin
    登录弹窗组件

  播放列表组件
    PlayingId
    playList
    playSong(id) - playingId改变
    removeSong(is)- playingId可能改变
    removeAll()- playingId改变
    collectSong(id)
    列表项组件

  Side组件
    state: {
      showLrc
    }
    PlayingId
    playList

  控制组件
    state: {
      isPlaying,
      vol,
      进度,
      播放模式,
    }
    isPlaying
    changeModel()
    playSong(id) -根据model和进度改变