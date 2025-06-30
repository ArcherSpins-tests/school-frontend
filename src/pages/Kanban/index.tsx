import { useEffect, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { v4 as uuidv4 } from 'uuid'
import Confetti from 'react-confetti'

const COLUMN_TITLES: Record<string, string> = {
  todo: 'やること',
  inProgress: '進行中',
  testing: '先生のテスト中',
  approved: '先生に承認された',
  production: '本番環境',
}

const ItemTypes = {
  CARD: 'card',
}

interface CardType {
  id: string
  title: string
  description: string
  image: string
  column: string
}

interface DragItem {
  id: string
  index: number
  type: string
  column: string
}

interface CardProps {
  card: CardType
  index: number
  cards: CardType[]
  moveCard: (fromIndex: number, toIndex: number, columnId: string) => void
  setCardColumn: (cardId: string, newColumn: string) => void
}

function Card({ card, index, moveCard, setCardColumn }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop<DragItem>({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current || item.column !== card.column) return

      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (!clientOffset) return

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveCard(dragIndex, hoverIndex, card.column)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: card.id, index, type: ItemTypes.CARD, column: card.column },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult() as { name: string } | undefined
      if (dropResult && dropResult.name !== item.column) {
        setCardColumn(item.id, dropResult.name)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`mb-4 transform cursor-move rounded-xl bg-white p-4 shadow-md transition-transform hover:scale-105 ${isDragging ? 'opacity-50' : ''}`}
    >
      <img src={card.image} alt="card-img" className="mb-2 h-32 w-full rounded-md object-cover" />
      <h4 className="font-semibold">{card.title}</h4>
      <p className="text-sm text-gray-600">{card.description}</p>
    </div>
  )
}

interface ColumnProps {
  id: string
  title: string
  cards: CardType[]
  moveCard: (fromIndex: number, toIndex: number, columnId: string) => void
  setCardColumn: (cardId: string, newColumn: string) => void
}

function Column({ id, title, cards, moveCard, setCardColumn }: ColumnProps) {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: id }),
  })

  return (
    <div className="flex h-full w-72 min-w-[200px] flex-col rounded-xl bg-gray-100 p-4" ref={drop}>
      <h2 className="mb-4 text-center text-xl font-bold">{title}</h2>
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          card={card}
          index={idx}
          cards={cards}
          moveCard={moveCard}
          setCardColumn={setCardColumn}
        />
      ))}
    </div>
  )
}

export default function KanbanBoard() {
  const [cards, setCards] = useState<CardType[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('kanban-cards')
    if (saved) {
      setCards(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kanban-cards', JSON.stringify(cards))
  }, [cards])

  const addCard = () => {
    const newCard: CardType = {
      id: uuidv4(),
      title: newTitle,
      description: newDescription,
      image:
        newImage ||
        'https://static.vecteezy.com/system/resources/thumbnails/000/963/090/small/cartoon-man-with-to-do-list-on-clipboard.jpg',
      column: 'todo',
    }
    setCards((prev) => [...prev, newCard])
    setNewTitle('')
    setNewDescription('')
    setNewImage('')
    setModalOpen(false)
  }

  const moveCard = (fromIndex: number, toIndex: number, columnId: string) => {
    setCards((prev) => {
      const columnCards = prev.filter((c) => c.column === columnId)
      const otherCards = prev.filter((c) => c.column !== columnId)
      const updatedColumn = [...columnCards]
      const [movedCard] = updatedColumn.splice(fromIndex, 1)
      updatedColumn.splice(toIndex, 0, movedCard)
      return [...otherCards, ...updatedColumn]
    })
  }

  const setCardColumn = (cardId: string, newColumn: string) => {
    setCards((prev) =>
      prev.map((card) => (card.id === cardId ? { ...card, column: newColumn } : card))
    )
    if (newColumn === 'production') {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3500)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full w-[calc(100%-255px)] flex-col rounded-lg bg-gray-50 p-6">
        {showConfetti && <Confetti height={500} />}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">タスクボード</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
          >
            タスクを追加
          </button>
        </div>
        <div className="flex flex-1 gap-4 overflow-auto">
          {Object.keys(COLUMN_TITLES).map((key) => (
            <Column
              key={key}
              id={key}
              title={COLUMN_TITLES[key]}
              cards={cards.filter((c) => c.column === key)}
              moveCard={moveCard}
              setCardColumn={setCardColumn}
            />
          ))}
        </div>

        {modalOpen && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-96 rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-lg font-semibold">新しいタスクを作成</h2>
              <input
                type="text"
                placeholder="タイトル"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="mb-3 w-full rounded border p-2"
              />
              <textarea
                placeholder="詳細"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="mb-3 w-full rounded border p-2"
              />
              <input
                type="text"
                placeholder="画像のURL（オプション）"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="mb-3 w-full rounded border p-2"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                >
                  キャンセル
                </button>
                <button
                  onClick={addCard}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  )
}
