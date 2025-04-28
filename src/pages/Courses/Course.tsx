import { useState } from 'react'
import { motion } from 'framer-motion'

interface Video {
  id: number
  title: string
  thumbnail: string
  videoUrl: string
}

interface Comment {
  id: number
  user: string
  avatar: string
  text: string
}

const videos: Video[] = [
  {
    id: 1,
    title: 'コース紹介',
    thumbnail:
      'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN',
    videoUrl: 'https://www.youtube.com/embed/dCLhUialKPQ',
  },
  {
    id: 2,
    title: 'React基礎',
    thumbnail:
      'https://www.classcentral.com/report/wp-content/uploads/2022/09/Graphic-Design-BCG-Banner.png',
    videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0',
  },
  {
    id: 3,
    title: 'TypeScriptとReact',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQESj67ynEiVye0JqHMRKF39SAksv9_C_tSjw&s',
    videoUrl: 'https://www.youtube.com/embed/3qBXWUpoPHo',
  },
  {
    id: 4,
    title: 'コンポーネント作成',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4gh9B0XjSz5PLlHf9UxaQbD5laGYg0Y3Vcw&s',
    videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
  },
  {
    id: 5,
    title: '状態管理とは',
    thumbnail:
      'https://file-uploads.teachablecdn.com/4c16c4adca0d401bb4295cfbda05ecf1/e1c0e6c521414dbfae2fe1ca931c2f8f',
    videoUrl: 'https://www.youtube.com/embed/BK6nrX8wDHE',
  },
  {
    id: 6,
    title: 'React Hooks完全理解',
    thumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQESj67ynEiVye0JqHMRKF39SAksv9_C_tSjw&s',
    videoUrl: 'https://www.youtube.com/embed/f687hBjwFcM',
  },
]

const initialComments: Comment[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  user: `ユーザー${i + 1}`,
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKJ-pUQBPxMxIodoZooM42lGP8wfJvKCk2Q&s',
  text: `このビデオに関するコメント ${i + 1}`,
}))

const COMMENTS_PER_PAGE = 5

export function Course() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0])
  const [comments, setComments] = useState(initialComments)
  const [currentPage, setCurrentPage] = useState(1)
  const [newComment, setNewComment] = useState('')

  const pageCount = Math.ceil(comments.length / COMMENTS_PER_PAGE)
  const visibleComments = comments.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  )

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      setComments((prev) => [
        {
          id: prev.length + 1,
          user: 'あなた',
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLjtzUmGGjTntlkZlyy-Vx8-tMt2OEEklxfA&s',
          text: newComment,
        },
        ...prev,
      ])
      setNewComment('')
    }
  }

  return (
    <div className="w-full overflow-y-auto rounded-lg bg-white p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-4xl font-bold"
      >
        初心者向けReact
      </motion.h1>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {/* メインビデオ */}
        <div className="space-y-6 lg:col-span-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full overflow-hidden rounded-2xl shadow-md"
          >
            <div className="relative h-[400px] w-full">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-2xl"
              />
            </div>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{selectedVideo.title}</h1>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>👁️ 1,234 回視聴</span>
              <span>👍 256 いいね</span>
            </div>
          </div>

          {/* コメント送信 */}
          <div className="mt-6 flex gap-4">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 rounded-full border p-3 focus:border-blue-400 focus:ring focus:outline-none"
              placeholder="コメントを入力..."
            />
            <button
              onClick={handleCommentSubmit}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              送信
            </button>
          </div>

          {/* コメントリスト */}
          <div className="mt-6 space-y-6">
            {visibleComments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{comment.user}</p>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ページネーション */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-9 w-9 rounded-full text-sm font-medium ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'
                } transition`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 他のビデオリスト */}
        <div className="min-w-[300px] space-y-4">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">ビデオリスト</h2>
          <div className="grid grid-cols-1 gap-4">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedVideo(video)}
                className={`flex cursor-pointer gap-4 rounded-xl p-3 ${
                  selectedVideo.id === video.id ? 'bg-blue-100' : 'bg-white'
                } shadow-sm hover:bg-blue-50`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-16 w-24 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-gray-800">{video.title}</p>
                  <span className="mt-1 text-xs text-gray-400">5分動画</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
