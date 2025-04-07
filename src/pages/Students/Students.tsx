import { useState } from 'react'

export function Students() {
  const initialStudents = [
    {
      name: '佐藤 花子',
      group: 'Web開発A',
      teacher: '田中 美咲',
      dob: '2002-03-15',
      country: '日本',
      year: 2,
      rank: 1,
    },
    {
      name: '山田 太郎',
      group: 'AIエキスパート',
      teacher: '山本 拓也',
      dob: '2001-07-28',
      country: '日本',
      year: 3,
      rank: 4,
    },
    {
      name: 'チャン・ミンジュ',
      group: 'ゲーム制作B',
      teacher: '佐藤 一郎',
      dob: '2000-11-02',
      country: '韓国',
      year: 2,
      rank: 2,
    },
    {
      name: 'アリ・ハサン',
      group: 'ビジネスC',
      teacher: '小林 拓海',
      dob: '2001-01-09',
      country: 'エジプト',
      year: 1,
      rank: 5,
    },
    {
      name: 'グエン・ティ・リン',
      group: 'UI/UXデザイン',
      teacher: '高橋 彩香',
      dob: '2003-05-22',
      country: 'ベトナム',
      year: 1,
      rank: 3,
    },
  ]

  const [filters, setFilters] = useState({
    year: '全て',
    country: '全て',
    name: '',
  })

  const years = ['全て', ...Array.from(new Set(initialStudents.map((s) => `${s.year}年`)))]
  const countries = ['全て', ...Array.from(new Set(initialStudents.map((s) => s.country)))]

  const filtered = initialStudents.filter((s) => {
    const matchYear = filters.year === '全て' || `${s.year}年` === filters.year
    const matchCountry = filters.country === '全て' || s.country === filters.country
    const matchName = s.name.includes(filters.name)
    return matchYear && matchCountry && matchName
  })

  return (
    <div className="min-h-full w-full rounded-lg bg-white p-5">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">学生リスト</h1>

      {/* Фильтры */}
      <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="名前で検索"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm"
        />
        <select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm"
        >
          {years.map((year, i) => (
            <option key={i}>{year}</option>
          ))}
        </select>
        <select
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm"
        >
          {countries.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>
      </div>

      {/* Таблица */}
      <div className="mx-auto max-w-6xl overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">名前</th>
              <th className="px-4 py-3">グループ</th>
              <th className="px-4 py-3">担任講師</th>
              <th className="px-4 py-3">生年月日</th>
              <th className="px-4 py-3">出身国</th>
              <th className="px-4 py-3">学年</th>
              <th className="px-4 py-3">ランキング</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, index) => (
              <tr key={index} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                <td className="px-4 py-3 text-gray-700">{s.group}</td>
                <td className="px-4 py-3 text-gray-700">{s.teacher}</td>
                <td className="px-4 py-3 text-gray-700">{s.dob}</td>
                <td className="px-4 py-3 text-gray-700">{s.country}</td>
                <td className="px-4 py-3 text-gray-700">{s.year}年</td>
                <td className="px-4 py-3 font-bold text-blue-600">{s.rank}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  該当する学生が見つかりませんでした。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
