import {
        HYEventStore
} from 'hy-event-store'
import {
        getSongDetail,
        getSongLyric
} from '../service/api_player'
import {
        parseLyric
} from '../utils/parse-lyric'
const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
        state: {
                id: 0,

                currentSong: {},
                durationTime: 0,
                lyricInfo: [],

                currentTime: 0,
                currentLyricIndex: 0,
                currentLyricText: '',

                playModeIndex: 0, // 0: 循环播放 1: 单曲循环 2: 随机播放
                isPlaying: false,
        },
        actions: {
                playSongWithSongIDAction(ctx, id) {
                        // 修改播放状态
                        ctx.isPlaying = true;
                        ctx.id = id;
                        // 请求歌曲详情
                        getSongDetail(id).then(res => {
                                ctx.currentSong = res.data.songs[0];
                                ctx.durationTime = res.data.songs[0].dt;
                        })

                        // 请求歌词信息
                        getSongLyric(id).then(res => {
                                const lyric = parseLyric(res.data.lrc.lyric);
                                ctx.lyricInfo = lyric
                        })

                        // 播放歌曲
                        audioContext.stop();
                        audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
                        audioContext.autoplay = true;
                        audioContext.onCanplay(() => {
                                audioContext.play();
                        });

                        // 监听audiocontext的改变
                        this.dispatch("setupAudioContextListenerAction");
                },
                setupAudioContextListenerAction(ctx) {
                        // 监听歌曲可以播放
                        audioContext.onCanplay(() => {
                                audioContext.play()

                        })

                        // 监听歌曲播放时间
                        audioContext.onTimeUpdate(() => {
                                // 获取当前时间
                                const currentTime = audioContext.currentTime * 1000

                                // 修改status中的currentTime
                                ctx.currentTime = currentTime;

                                // 3.根据当前时间去查找播放的歌词
                                if (!ctx.lyricInfo.length) return
                                let i = 0
                                for (; i < ctx.lyricInfo.length; i++) {
                                        const lyricInfo = ctx.lyricInfo[i]
                                        if (currentTime < lyricInfo.time) {
                                                break
                                        }
                                }

                                // 设置当前歌词的索引和内容
                                const currentIndex = i - 1
                                if (ctx.currentLyricIndex !== currentIndex) {
                                        const currentLyricInfo = ctx.lyricInfo[currentIndex]
                                        ctx.currentLyricIndex = currentIndex
                                        ctx.currentLyricText = currentLyricInfo.text
                                }


                        })
                },
                changeMusicPlayStatusAction(ctx) {
                        ctx.isPlaying = !ctx.isPlaying
                        if (ctx.isPlaying) {
                                audioContext.play()
                        } else {
                                audioContext.pause()
                        }
                }
        }

});
export {
        audioContext,
        playerStore
}