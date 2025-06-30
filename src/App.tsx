import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthPage, Course, Courses, Homeworks, Resume, Students } from './pages'
import { Sidebar } from './components'
import { useEffect, useRef, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import KanbanBoard from './pages/Kanban'
import { Phone } from 'lucide-react'

const teachers = [
  {
    name: '田中 一郎',
    title: 'AI 講師 / PhD',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    achievements: [
      'TensorFlow 認定トレーナー',
      'AI 国際カンファレンス登壇',
      'Google AI リサーチ参加',
    ],
  },
  {
    name: '川上先生',
    title: 'Web 開発 / フロントエンド講師',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    achievements: ['React カンファレンス登壇', 'JavaScript 専門家', '複数の企業向けWebアプリ開発'],
  },
  {
    name: '中村 拓海',
    title: 'データサイエンス / Python講師',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    achievements: ['Kaggle コンペ優勝経験', 'Python 公式教材翻訳', '統計解析とBI導入支援'],
  },
  {
    name: '山田 純',
    title: 'クラウドエンジニア / AWS 認定講師',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    achievements: [
      'AWS 認定ソリューションアーキテクト – プロフェッショナル',
      'クラウドインフラ設計経験 10 年',
      'DevOps ハンズオンセミナー講師',
    ],
  },
  {
    name: '高橋 彩香',
    title: 'UI/UX デザイン講師',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    achievements: [
      'Figma & Adobe XD 認定インストラクター',
      'UX東京2023 ゲストスピーカー',
      '100以上のモバイルアプリデザイン監修',
    ],
  },
  {
    name: '小林 拓哉',
    title: '起業・ビジネス戦略講師',
    avatar: 'https://randomuser.me/api/portraits/men/88.jpg',
    achievements: [
      'スタートアップ支援歴 12 年',
      'MBA（経営学修士）取得',
      '経済産業省主催のビジネスコンテスト審査員',
    ],
  },
]

const chats = [
  { id: 1, name: '💬 JavaScriptクラス' },
  { id: 2, name: '🤖 AIプロジェクト' },
  { id: 3, name: '🎨 デザインチーム' },
  { id: 4, name: '📢 お知らせ' },
]

const allUsers = [
  { id: 1, name: 'Taro', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Taro' },
  { id: 2, name: 'You', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=You' },
  { id: 3, name: 'Hanako', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hanako' },
  { id: 4, name: 'Alex', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex' },
]

const dummyMessages = [
  { id: 1, sender: '川上先生', text: '今日の授業は14:00から開始です。' },
  { id: 2, sender: '佐藤さん', text: '了解しました！' },
  { id: 3, sender: '川上先生', text: '課題の提出は今週金曜日までです。' },
]

function TopStudentsPage() {
  const initialStudents = [
    { name: '佐藤 花子', class: 'Web開発A', rating: 95 },
    { name: '山田 太郎', class: 'AI基礎', rating: 87 },
    { name: '鈴木 美咲', class: 'デザインB', rating: 91 },
    { name: '高橋 拓海', class: 'ゲーム制作', rating: 89 },
    { name: '中村 直樹', class: 'ビジネスC', rating: 93 },
    { name: '小林 彩香', class: 'Web開発B', rating: 88 },
  ]

  const colors = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

  const [filterText, setFilterText] = useState('')
  const [sortAsc, setSortAsc] = useState(false)

  const filtered = initialStudents
    .filter((s) => s.name.includes(filterText))
    .sort((a, b) => (sortAsc ? a.rating - b.rating : b.rating - a.rating))

  return (
    <div className="min-h-full w-full overflow-y-auto rounded-lg bg-white p-5">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">トップ学生ランキング</h1>

      {/* Filter & Sort */}
      <div className="mx-auto mb-6 flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="名前で検索..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm"
        />
        <button
          onClick={() => setSortAsc((prev) => !prev)}
          className="w-full min-w-[150px] truncate rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 sm:w-auto"
        >
          {sortAsc ? '▼ ランキング順' : '▲ ランキング順'}
        </button>
      </div>

      {/* Table */}
      <div className="mx-auto max-w-4xl overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="px-6 py-3">名前</th>
              <th className="px-6 py-3">クラス</th>
              <th className="px-6 py-3">評価スコア</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, index) => (
              <tr key={index} className="transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                <td className="px-6 py-4 text-gray-700">{student.class}</td>
                <td className="px-6 py-4 font-semibold text-blue-600">{student.rating}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-6 py-4 text-gray-500" colSpan={3}>
                  該当する学生が見つかりませんでした。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-800">学生評価スコアの比較</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={filtered}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="rating">
              {filtered.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function ClassesPage() {
  const classList = [
    {
      name: 'Web開発クラスA',
      teacher: '田中 美咲',
      students: 28,
      type: 'Web',
    },
    {
      name: 'AIエキスパートクラス',
      teacher: '山本 拓也',
      students: 22,
      type: 'AI',
    },
    {
      name: 'ゲーム制作クラスB',
      teacher: '佐藤 一郎',
      students: 25,
      type: 'Game',
    },
    {
      name: 'UI/UXデザインクラス',
      teacher: '高橋 彩香',
      students: 19,
      type: 'Design',
    },
    {
      name: 'ビジネス戦略クラス',
      teacher: '小林 拓海',
      students: 30,
      type: 'Business',
    },
  ]

  const typeColor: { [key: string]: string } = {
    Web: 'bg-blue-100 text-blue-800',
    AI: 'bg-purple-100 text-purple-800',
    Game: 'bg-green-100 text-green-800',
    Design: 'bg-pink-100 text-pink-800',
    Business: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <div className="min-h-full w-full rounded-lg bg-white p-5">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">クラス一覧</h1>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">クラス名</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">担任講師</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">学生数</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">タイプ</th>
            </tr>
          </thead>
          <tbody>
            {classList.map((cls, index) => (
              <tr key={index} className="transition-colors duration-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{cls.name}</td>
                <td className="px-6 py-4 text-gray-700">{cls.teacher}</td>
                <td className="px-6 py-4 text-gray-700">{cls.students}人</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${typeColor[cls.type]}`}
                  >
                    {cls.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type User = {
  id: number
  name: string
  avatar: string
}

export const CallModal: React.FC<{
  open: boolean
  onEnd: () => void
  videoRef: React.RefObject<HTMLVideoElement | null>
  participants: User[]
  stream?: MediaStream | null
  setParticipants: React.Dispatch<React.SetStateAction<User[]>>
  remoteStreams: { [key: string]: MediaStream }
}> = ({ open, onEnd, videoRef, participants, setParticipants, stream, remoteStreams }) => {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [volume, setVolume] = useState(0)

  const availableUsers = allUsers.filter((u) => !participants.some((p) => p.id === u.id))

  const handleInvite = (user: User) => {
    setParticipants((prev) => [...prev, user])
    setInviteOpen(false)
  }

  useEffect(() => {
    if (!stream) return
    const audioCtx = new window.AudioContext()
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 256

    const source = audioCtx.createMediaStreamSource(stream)
    source.connect(analyser)

    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    let running = true
    function tick() {
      if (!running) return
      analyser.getByteTimeDomainData(dataArray)
      let sum = 0
      for (let i = 0; i < dataArray.length; i++) {
        const val = (dataArray[i] - 128) / 128
        sum += val * val
      }
      setVolume(Math.min(Math.sqrt(sum / dataArray.length) * 2, 1))
      requestAnimationFrame(tick)
    }
    tick()

    return () => {
      running = false
      audioCtx.close()
    }
  }, [stream])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex w-[90vw] max-w-[1200px] flex-col items-center rounded-2xl border border-neutral-700 bg-neutral-800 p-0 shadow-2xl"
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.97 }}
          >
            <div className="z-30 flex w-full items-center justify-between rounded-t-2xl border-b border-neutral-700 bg-neutral-800 px-7 pt-5 pb-2">
              <div className="flex items-center gap-5">
                {participants.map((user) => (
                  <div key={user.id} className="flex flex-col items-center">
                    <span className="group relative">
                      <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-60 transition duration-200 group-hover:opacity-90"></span>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="relative z-10 h-12 w-12 rounded-full border-2 border-neutral-700 object-cover shadow-lg transition group-hover:border-blue-400"
                      />
                    </span>
                    <span className="mt-1 text-xs font-medium text-neutral-200">{user.name}</span>
                  </div>
                ))}
              </div>
              <div className="relative">
                <button
                  className="cursor-pointer rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 p-2 shadow-xl transition hover:scale-105"
                  title="参加者を招待"
                  onClick={() => setInviteOpen((o) => !o)}
                >
                  <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
                  </svg>
                </button>
                {inviteOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-44 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 shadow-xl">
                    {availableUsers.length === 0 ? (
                      <div className="p-3 text-sm text-neutral-400">
                        招待できるユーザーがいません
                      </div>
                    ) : (
                      availableUsers.map((u) => (
                        <button
                          key={u.id}
                          onClick={() => handleInvite(u)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-neutral-100 transition hover:bg-neutral-700"
                        >
                          <img
                            src={u.avatar}
                            className="h-7 w-7 rounded-full border border-neutral-700"
                          />
                          {u.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Local video */}
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full rounded-xl border border-blue-700 bg-black shadow-xl"
                  style={{
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                  }}
                />
                <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                  You
                </div>
              </div>

              {/* Remote videos */}
              {Object.entries(remoteStreams).map(([userId, remoteStream]) => {
                const participant = participants.find(p => p.id.toString() === userId)
                const videoRef = useRef<HTMLVideoElement>(null)

                useEffect(() => {
                  if (videoRef.current && remoteStream) {
                    videoRef.current.srcObject = remoteStream
                  }
                }, [remoteStream])

                return (
                  <div key={userId} className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-xl border border-blue-700 bg-black shadow-xl"
                      style={{
                        aspectRatio: '16/9',
                        objectFit: 'cover',
                      }}
                    />
                    <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                      {participant?.name || 'Unknown'}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              className="mb-8 cursor-pointer rounded-xl bg-gradient-to-tr from-red-600 to-rose-400 px-10 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-105"
              onClick={onEnd}
            >
              通話終了
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type Chat = {
  id: number
  name: string
}

const ChatsPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<Chat>(chats[0])
  const [callOpen, setCallOpen] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnection = useRef<RTCPeerConnection | null>(null)
  const [isCaller, setIsCaller] = useState(false)

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const setupPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    })

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // В реальном приложении здесь мы бы отправляли кандидата другому пиру через сервер
        console.log('New ICE candidate:', event.candidate)
      }
    }

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0])
    }

    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream)
      })
    }

    peerConnection.current = pc
    return pc
  }

  const handleStartCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setLocalStream(stream)
      setCallOpen(true)
      setIsCaller(true)

      const pc = setupPeerConnection()
      
      // Создаем оффер (для демонстрации)
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      
      // В реальном приложении здесь мы бы отправляли оффер другому пиру через сервер
      console.log('Created offer:', offer)
      
    } catch (err) {
      console.error('Error accessing media devices:', err)
      alert('カメラまたはマイクにアクセスできません！')
    }
  }

  const handleJoinCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setLocalStream(stream)
      setCallOpen(true)
      setIsCaller(false)

      const pc = setupPeerConnection()
      
      // В реальном приложении здесь мы бы получали оффер от другого пира и создавали ответ
      // Для демонстрации просто показываем, что второй участник присоединился
      console.log('Second participant joined')
      
    } catch (err) {
      console.error('Error accessing media devices:', err)
      alert('カメラまたはマイクにアクセスできません！')
    }
  }

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
      setLocalStream(null)
    }
    if (peerConnection.current) {
      peerConnection.current.close()
      peerConnection.current = null
    }
    setRemoteStream(null)
    setCallOpen(false)
    setIsCaller(false)
  }

  return (
    <div className="flex min-h-full w-full overflow-y-auto rounded-lg bg-white text-gray-900">
      <aside className="w-64 space-y-2 border-r border-gray-200 bg-white p-4 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">チャットルーム</h2>
        {chats.map((chat) => (
          <motion.button
            key={chat.id}
            whileHover={{ scale: 1.02 }}
            className={`w-full rounded-lg px-4 py-2 text-left transition ${
              activeChat.id === chat.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-800 hover:bg-gray-100'
            }`}
            onClick={() => setActiveChat(chat)}
          >
            {chat.name}
          </motion.button>
        ))}
      </aside>

      <main className="flex flex-1 flex-col bg-white shadow-inner">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-xl font-bold">{activeChat.name}</h1>
          <div className="flex gap-2">
            <button
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              onClick={handleStartCall}
              disabled={callOpen}
            >
              <Phone width={20} /> 通話を開始
            </button>
            <button
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              onClick={handleJoinCall}
              disabled={callOpen}
            >
              <Phone width={20} /> 通話に参加
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {dummyMessages.map((msg) => (
            <div key={msg.id} className="max-w-lg rounded-lg bg-gray-100 p-3">
              <p className="mb-1 text-sm font-semibold text-gray-700">{msg.sender}</p>
              <p className="text-gray-900">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="メッセージを入力..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
              送信
            </button>
          </div>
        </div>
      </main>

      {/* Video Call Modal */}
      <AnimatePresence>
        {callOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative flex w-[90vw] max-w-[1200px] flex-col items-center rounded-2xl border border-neutral-700 bg-neutral-800 p-6 shadow-2xl"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.97 }}
            >
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Local video */}
                <div className="relative">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-xl border border-blue-700 bg-black shadow-xl"
                    style={{
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                    You ({isCaller ? 'Caller' : 'Participant'})
                  </div>
                </div>

                {/* Remote video */}
                <div className="relative">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-xl border border-blue-700 bg-black shadow-xl"
                    style={{
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                    Remote User
                  </div>
                </div>
              </div>

              <button
                className="mt-6 cursor-pointer rounded-xl bg-gradient-to-tr from-red-600 to-rose-400 px-10 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-105"
                onClick={handleEndCall}
              >
                通話終了
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TeachersPage() {
  return (
    <div className="min-h-screen overflow-y-auto bg-white px-4 py-16 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center text-3xl font-bold">講師一覧</h1>

        <div className="grid gap-10 md:grid-cols-3">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl bg-gray-100 p-6 shadow-lg transition duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="mb-4 h-24 w-24 rounded-full border-4 border-blue-500 shadow"
                />
                <h2 className="text-xl font-semibold">{teacher.name}</h2>
                <p className="mb-4 text-sm text-gray-600">{teacher.title}</p>
              </div>
              <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-gray-800">
                {teacher.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Home() {
  const features = [
    { title: 'AI 開発', description: '機械学習・深層学習などの応用力を習得。' },
    { title: 'Web 技術', description: 'React / TypeScript / API 連携など最新スキル。' },
    { title: '国際環境', description: '留学生歓迎、多文化・多言語に対応。' },
  ]

  return (
    <div className="flex w-full flex-col gap-5 overflow-y-auto rounded-lg bg-white p-5">
      <div className="min-h-screen bg-black font-sans text-white">
        <div
          className="relative h-[80vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1573164574396-9d4f3f1f7c88?auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent p-10">
            <h1 className="mb-2 text-5xl font-bold tracking-widest">東京マルチAI専門学校</h1>
            <p className="text-lg text-gray-300">未来を創る、次世代テクノロジーの学び舎</p>
          </div>
        </div>

        {/* Features Section */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center text-3xl font-semibold">私たちの特徴</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-white p-6 text-black shadow-lg transition duration-300"
              >
                <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
                <p className="text-gray-700">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission section */}
        <section className="bg-gradient-to-b from-gray-900 to-black px-6 py-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold"
          >
            ミッション
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-lg leading-8 text-gray-300"
          >
            東京マルチAI専門学校は、テクノロジーと創造性を融合し、次世代のイノベーターを育てることを使命としています。AI、データサイエンス、Web開発などの最先端分野で、実践力と国際感覚を兼ね備えた人材を育成します。
          </motion.p>
        </section>
      </div>
    </div>
  )
}

function TimetablePage() {
  const schedule = [
    { time: '09:00 - 10:30', subject: 'JavaScript', teacher: '川上先生', room: '204' },
    { time: '10:45 - 12:15', subject: 'Web デザイン基礎', teacher: '佐藤先生', room: '206' },
    { time: '13:15 - 14:45', subject: 'JavaScript', teacher: '川上先生', room: '204' },
    { time: '15:00 - 16:30', subject: 'データベース入門', teacher: '中村先生', room: '202' },
    { time: '16:45 - 18:15', subject: 'JavaScript', teacher: '川上先生', room: '204' },
  ]

  return (
    <div className="flex w-full flex-col gap-5 overflow-y-auto rounded-lg bg-white p-5">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">授業スケジュール</h1>

        <div className="flex flex-wrap gap-3">
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">時間</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">科目</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">講師</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">教室</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index} className="transition-colors duration-200 hover:bg-blue-50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.teacher}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">時間</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">科目</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">講師</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">教室</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index} className="transition-colors duration-200 hover:bg-blue-50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.teacher}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">時間</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">科目</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">講師</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">教室</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index} className="transition-colors duration-200 hover:bg-blue-50">
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.time}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      {item.subject}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.teacher}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                      {item.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          ※ スケジュールは週ごとに変更される場合があります。
        </p>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="flex w-full flex-col gap-5 overflow-y-auto rounded-lg bg-white p-5">
      <div className="bg-gray-50 font-sans text-gray-900">
        <div
          className="relative h-72 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://tmc.tsuzuki.ac.jp/wp-content/uploads/2021/12/%E6%9D%B1%E4%BA%AC%E3%83%9E%E3%83%AB%E3%83%81%E3%83%BB%EF%BC%A1%EF%BC%A9%E5%B0%82%E9%96%80%E5%AD%A6%E6%A0%A1%E6%A0%A1%E8%88%8E.jpg')",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <h1 className="mb-2 text-4xl font-bold md:text-5xl">東京マルチAI専門学校</h1>
              <p className="text-lg md:text-xl">未来をつくる、AIの学び舎</p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="mb-4 text-2xl font-semibold">学校について</h2>
          <p className="mb-6 text-lg leading-8">
            東京マルチAI専門学校は、最先端のAI技術と実践的なプログラミング教育を提供する教育機関です。AI、機械学習、データサイエンス、Web開発など多様な分野を学ぶことができ、グローバルな人材育成を目指しています。
            <br />
            <br />
            本校は新宿の中心に位置し、アクセスも便利。国内外の学生が共に学び、国際的な視野を広げることができます。経験豊かな講師陣による指導と実践的なプロジェクトを通じて、学生一人ひとりの可能性を最大限に引き出します。
          </p>

          <div className="mb-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 text-xl font-bold">AI専攻</h3>
              <p>機械学習・深層学習などの実践的スキルを習得。</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 text-xl font-bold">国際対応</h3>
              <p>留学生支援と多文化交流が充実。</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="mb-2 text-xl font-bold">キャリアサポート</h3>
              <p>就職活動や企業連携で卒業後も安心。</p>
            </div>
          </div>

          <h2 className="mb-4 text-2xl font-semibold">所在地</h2>
          <p className="mb-4">〒160-0023 東京都新宿区西新宿1丁目1−1</p>
          <div className="h-96 w-full overflow-hidden rounded-lg shadow">
            <iframe
              title="東京マルチAI専門学校 Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.8417268611986!2d139.69614617619907!3d35.68963447258626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188cd0b67d2cdb%3A0x5c3dd7b42c93f2a9!2z5p2x5Lqs44GM44Gq44KL44GX44Gm44GE44Gm44KL44CC!5e0!3m2!1sja!2sjp!4v1712463601533!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="flex h-full gap-3 p-2">
        <Sidebar />
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/students" element={<Students />} />
          <Route path="/schedule" element={<TimetablePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/top-students" element={<TopStudentsPage />} />
          <Route path="/homeworks" element={<Homeworks />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/courses/:id" element={<Course />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
