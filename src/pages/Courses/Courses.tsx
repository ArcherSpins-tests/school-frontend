import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface Course {
  id: number
  title: string
  category: string
  image: string
}

const coursesData: Course[] = [
  {
    id: 1,
    title: '初心者向けReact',
    category: 'フロントエンド',
    image:
      'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN',
  },
  {
    id: 2,
    title: 'TypeScriptマスター講座',
    category: 'フロントエンド',
    image:
      'https://file-uploads.teachablecdn.com/4c16c4adca0d401bb4295cfbda05ecf1/e1c0e6c521414dbfae2fe1ca931c2f8f',
  },
  {
    id: 3,
    title: 'UI/UXデザイン',
    category: 'デザイン',
    image:
      'https://www.classcentral.com/report/wp-content/uploads/2022/09/Graphic-Design-BCG-Banner.png',
  },
  {
    id: 4,
    title: 'Framer Motionでアニメーション',
    category: 'フロントエンド',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQESj67ynEiVye0JqHMRKF39SAksv9_C_tSjw&s',
  },
  {
    id: 5,
    title: 'ビジネス基礎',
    category: 'ビジネス',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4gh9B0XjSz5PLlHf9UxaQbD5laGYg0Y3Vcw&s',
  },
]

const categories = ['すべて', 'フロントエンド', 'デザイン', 'ビジネス']

export function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('すべて')
  const navigate = useNavigate()

  const filteredCourses =
    selectedCategory === 'すべて'
      ? coursesData
      : coursesData.filter((course) => course.category === selectedCategory)

  return (
    <div className="w-full rounded-lg bg-gray-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center text-4xl font-bold"
      >
        コース
      </motion.h1>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/courses/${course.id}`)}
            className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <img src={course.image} alt={course.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-bold">{course.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{course.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
