import { useMemo, useState } from 'react'
import { Paperclip, X } from 'lucide-react'
import clsx from 'classnames'
import Editor, { loader } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import { Input, Select } from '../../components'

import tokyoNightTheme from '../../editor-themes/tokyo-night.json'
import slackDarkTheme from '../../editor-themes/slack-dark.json'

loader.init().then((monaco) => {
  return monaco.editor.defineTheme('tokyo-night', tokyoNightTheme as editor.IStandaloneThemeData)
})

loader.init().then((monaco) => {
  return monaco.editor.defineTheme('slack-dark', slackDarkTheme as editor.IStandaloneThemeData)
})

interface Homework {
  id: string
  title: string
  teacher: string
  description: string
  status: 'new' | 'pending' | 'completed'
  solutionFile?: string
  deadline: string
  tags: string[]
}

const dummyHomework: Homework[] = [
  {
    id: '1',
    title: 'JavaScript基礎 #1',
    teacher: '田中先生',
    description:
      '以下の課題を実施してください：\n\n1. 変数の宣言（let, const）\n2. if文とswitch文の使い方\n3. for文とwhile文の違いを学びましょう\n\n例: 年齢に応じてメッセージを出力する関数を作成してください。',
    status: 'completed',
    deadline: '2025-04-20',
    tags: ['基礎', 'if文', 'ループ'],
  },
  {
    id: '2',
    title: '配列とオブジェクトの操作',
    teacher: '山本先生',
    description:
      '配列やオブジェクトを使った基本的な操作を学びましょう。\n\n- 配列に要素を追加・削除\n- map, filter, reduceの使い方\n- オブジェクトのプロパティへのアクセス\n\n例: 学生の成績リストから平均点を求めるプログラムを書いてください。',
    status: 'pending',
    solutionFile: 'array_task.pdf',
    deadline: '2025-04-22',
    tags: ['配列', 'オブジェクト', 'map'],
  },
  {
    id: '3',
    title: '関数とスコープ',
    teacher: '鈴木先生',
    description:
      '関数宣言、関数式、アロー関数の違いを学びましょう。\n\nまた、クロージャやスコープチェーンについても学びます。\n\n例: 関数内で定義された変数が外部から見えるか確認するコードを書いてみましょう。',
    status: 'new',
    deadline: '2025-04-25',
    tags: ['関数', 'スコープ', 'クロージャ'],
  },
  {
    id: '4',
    title: '非同期処理とPromise',
    teacher: '佐藤先生',
    description:
      'JavaScriptにおける非同期処理の基本を学びましょう。\n\n- setTimeout, setInterval\n- Promiseの基本\n- async/await構文\n\n例: APIからデータを取得し、結果を画面に表示する関数を作成してください。',
    status: 'new',
    deadline: '2025-04-28',
    tags: ['Promise', 'async', '非同期'],
  },
  {
    id: '5',
    title: 'DOM操作入門',
    teacher: '高橋先生',
    description:
      'HTML要素をJavaScriptで動的に操作する方法を学びます。\n\n- document.querySelector\n- イベントハンドラの登録\n- クラスの追加・削除\n\n例: ボタンをクリックするとテキストが変わるページを作成してください。',
    status: 'pending',
    deadline: '2025-05-01',
    tags: ['DOM', 'イベント', '操作'],
  },
  {
    id: '6',
    title: 'フォームとバリデーション',
    teacher: '中村先生',
    description:
      'ユーザーからの入力を受け取り、正しいかどうかを検証する方法を学びます。\n\n- input要素の取得\n- バリデーションチェック\n- エラーメッセージの表示\n\n例: メールアドレスとパスワードの入力欄を含むログインフォームを作成してください。',
    status: 'new',
    deadline: '2025-05-03',
    tags: ['フォーム', 'バリデーション', 'UI'],
  },
  {
    id: '7',
    title: 'DOM操作入門',
    teacher: '高橋先生',
    description:
      'HTML要素をJavaScriptで動的に操作する方法を学びます。\n\n- document.querySelector\n- イベントハンドラの登録\n- クラスの追加・削除\n\n例: ボタンをクリックするとテキストが変わるページを作成してください。',
    status: 'pending',
    deadline: '2025-05-01',
    tags: ['DOM', 'イベント', '操作'],
  },
  {
    id: '8',
    title: 'フォームとバリデーション',
    teacher: '中村先生',
    description:
      'ユーザーからの入力を受け取り、正しいかどうかを検証する方法を学びます。\n\n- input要素の取得\n- バリデーションチェック\n- エラーメッセージの表示\n\n例: メールアドレスとパスワードの入力欄を含むログインフォームを作成してください。',
    status: 'new',
    deadline: '2025-05-03',
    tags: ['フォーム', 'バリデーション', 'UI'],
  },
]

export const Homeworks = () => {
  const [selected, setSelected] = useState<Homework | null>(null)
  const [code, setCode] = useState('// ここにJavaScriptコードを書いてください\n')
  const [file, setFile] = useState<File | null>(null)

  const [search, setSearch] = useState('')
  const [statusFilter] = useState('')
  const [teacherFilter] = useState('')
  const [tagFilter] = useState('')
  const [dateFrom] = useState('')
  const [dateTo] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFile(file)

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result
      if (typeof text === 'string') {
        setCode(text)
      }
    }
    reader.readAsText(file)
  }

  const handleSubmit = () => {
    alert(`提出完了：${selected?.title}`)
    setSelected(null)
    setCode('')
    setFile(null)
  }

  const filteredHomework = useMemo(() => {
    return dummyHomework.filter((hw) => {
      const matchSearch = hw.title.includes(search) || hw.description.includes(search)
      const matchStatus = statusFilter ? hw.status === statusFilter : true
      const matchTeacher = teacherFilter ? hw.teacher === teacherFilter : true
      const matchTag = tagFilter ? hw.tags.includes(tagFilter) : true
      const matchDateFrom = dateFrom ? hw.deadline >= dateFrom : true
      const matchDateTo = dateTo ? hw.deadline <= dateTo : true
      return matchSearch && matchStatus && matchTeacher && matchTag && matchDateFrom && matchDateTo
    })
  }, [search, statusFilter, teacherFilter, tagFilter, dateFrom, dateTo])

  const statuses = {
    new: { cls: 'bg-cyan-100 text-cyan-800', label: '新規', bg: 'border-cyan-400' },
    pending: { cls: 'bg-yellow-100 text-yellow-800', label: '確認中', bg: 'border-amber-500' },
    completed: { cls: 'bg-green-100 text-green-800', label: '完了', bg: 'border-emerald-500' },
  }

  return (
    <div className="flex w-full flex-col gap-5 overflow-y-auto rounded-lg bg-white p-5">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">宿題</h1>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Input
          value={search}
          className="w-full"
          fieldClassName="w-full"
          name="search"
          onChange={setSearch}
          lefftAddons={<span className="px-2 text-base text-gray-400">🔍</span>}
        />

        <Select />

        <Select />

        <Input
          value={dateFrom}
          className="w-full"
          fieldClassName="w-full"
          name="dateFrom"
          lefftAddons={<span className="px-2 text-sm text-gray-400">🗓️</span>}
        />

        <Input
          value={dateTo}
          className="w-full"
          fieldClassName="w-full"
          name="dateTo"
          lefftAddons={<span className="px-2 text-sm text-gray-400">🗓️</span>}
        />
      </div>
      <div className="columns-1 gap-6 space-y-6 sm:columns-2 xl:columns-3">
        {filteredHomework.map((hw) => (
          <div
            key={hw.id}
            onClick={() => setSelected(hw)}
            className={clsx(
              'mb-6 break-inside-avoid rounded-xl border border-l-[6px] bg-gradient-to-br from-white to-gray-50 p-5 transition-all hover:shadow-xl',
              statuses[hw.status].bg
            )}
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="pr-2 text-lg font-semibold">{hw.title}</h2>
              <span className={`rounded-full px-2 py-1 text-xs ${statuses[hw.status].cls}`}>
                {statuses[hw.status].label}
              </span>
            </div>
            <p className="text-sm text-gray-600">教師: {hw.teacher}</p>
            <p className="mt-1 text-xs text-gray-500">締切: {hw.deadline}</p>
            <p className="mt-2 line-clamp-4 text-sm text-gray-700">{hw.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {hw.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl transition-all duration-300">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="mb-1 text-2xl font-bold">{selected.title}</h2>
              <p className="mb-2 text-sm text-gray-600">教師: {selected.teacher}</p>
              <p className="mb-4 text-sm whitespace-pre-wrap text-gray-800">
                {selected.description}
              </p>
              <p className="mb-3 text-xs text-gray-500">締切日: {selected.deadline}</p>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                コード編集エリア
              </label>
              <div className="mb-4 overflow-hidden rounded-xl border border-gray-300 bg-white shadow">
                <Editor
                  height="300px"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  theme="tokyo-night"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-sm text-blue-600 hover:underline">
                <Paperclip className="h-4 w-4" />
                <span>{file ? file.name : 'ファイルを添付'}</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>

              <div className="text-right">
                <button
                  onClick={handleSubmit}
                  className="rounded bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                >
                  提出する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
