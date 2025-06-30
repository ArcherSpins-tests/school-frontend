import React, { useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from 'html2pdf.js'

const validationSchema = Yup.object({
  name: Yup.string().required('名前を入力してください'),
  furigana: Yup.string().required('フリガナを入力してください'),
  birthdate: Yup.string().required('生年月日を入力してください'),
  address: Yup.string().required('住所を入力してください'),
  phone: Yup.string().required('電話番号を入力してください'),
  email: Yup.string().email('有効なメールを入力してください').required('メールを入力してください'),
  education: Yup.string().required('学歴を入力してください'),
  experience: Yup.string().required('職歴を入力してください'),
  motivation: Yup.string().required('志望動機を入力してください'),
  license: Yup.string().required('資格・免許を入力してください'),
})

export function Resume() {
  const formRef = useRef<HTMLDivElement>(null)
  const [avatar, setAvatar] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      name: '',
      furigana: '',
      birthdate: '',
      address: '',
      phone: '',
      email: '',
      education: '',
      experience: '',
      motivation: '',
      license: '',
    },
    validationSchema,
    onSubmit: async () => {
      if (!formRef.current) return

      const hiddenStyles = formRef.current.style.cssText
      formRef.current.style.position = 'static'
      formRef.current.style.top = 'auto'
      formRef.current.style.left = 'auto'
      formRef.current.style.width = 'auto'
      formRef.current.style.opacity = '1'
      formRef.current.style.visibility = 'visible'
      formRef.current.style.zIndex = '10'
      formRef.current.style.display = 'block'

      await new Promise((resolve) => setTimeout(resolve, 500))

      await html2pdf()
        .set({
          filename: '履歴書.pdf',
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(formRef.current)
        .save()

      formRef.current.style.cssText = hiddenStyles
    },
  })

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="h-full w-full overflow-y-auto rounded-lg bg-gray-100 p-8">
      <form onSubmit={formik.handleSubmit} className="w-full rounded bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">履歴書フォーム（JIS風）</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label>名前</label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full border p-2"
            />
            <div className="text-sm text-red-500">{formik.errors.name}</div>
          </div>
          <div>
            <label>フリガナ</label>
            <input
              name="furigana"
              value={formik.values.furigana}
              onChange={formik.handleChange}
              className="w-full border p-2"
            />
            <div className="text-sm text-red-500">{formik.errors.furigana}</div>
          </div>
          <div>
            <label>生年月日</label>
            <input
              type="date"
              name="birthdate"
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              className="w-full border p-2"
            />
            <div className="text-sm text-red-500">{formik.errors.birthdate}</div>
          </div>
          <div>
            <label>住所</label>
            <input
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="w-full border p-2"
            />
            <div className="text-sm text-red-500">{formik.errors.address}</div>
          </div>
          <div>
            <label>電話番号</label>
            <input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full border p-2"
            />
            <div className="text-sm text-red-500">{formik.errors.phone}</div>
          </div>
          <div>
            <label>メール</label>
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full border p-2"
            />
            <div className="text-sm text-red-500">{formik.errors.email}</div>
          </div>
        </div>

        <div className="mt-4">
          <label>顔写真</label>
          <input type="file" accept="image/*" onChange={handleAvatarUpload} />
          {avatar && (
            <img src={avatar} className="mt-2 h-24 w-24 border object-cover" alt="顔写真" />
          )}
        </div>

        <div className="mt-4">
          <label>学歴</label>
          <textarea
            name="education"
            value={formik.values.education}
            onChange={formik.handleChange}
            className="h-24 w-full border p-2"
          />
          <div className="text-sm text-red-500">{formik.errors.education}</div>
        </div>

        <div className="mt-4">
          <label>職歴</label>
          <textarea
            name="experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            className="h-24 w-full border p-2"
          />
          <div className="text-sm text-red-500">{formik.errors.experience}</div>
        </div>

        <div className="mt-4">
          <label>資格・免許</label>
          <textarea
            name="license"
            value={formik.values.license}
            onChange={formik.handleChange}
            className="h-20 w-full border p-2"
          />
          <div className="text-sm text-red-500">{formik.errors.license}</div>
        </div>

        <div className="mt-4">
          <label>志望動機</label>
          <textarea
            name="motivation"
            value={formik.values.motivation}
            onChange={formik.handleChange}
            className="h-20 w-full border p-2"
          />
          <div className="text-sm text-red-500">{formik.errors.motivation}</div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          PDFをダウンロード
        </button>
      </form>

      {/* Hidden JIS-style resume for PDF export */}
      <div
        ref={formRef}
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          width: '210mm',
          padding: '20mm',
          backgroundColor: 'white',
        }}
      >
        <h2 style={{ fontSize: '20pt', fontWeight: 'bold', marginBottom: '20px' }}>履歴書</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12pt' }}>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px', width: '20%' }}>名前</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{formik.values.name}</td>
              <td
                rowSpan={3}
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'center',
                  width: '120px',
                }}
              >
                {avatar && (
                  <img
                    src={avatar}
                    alt="写真"
                    style={{
                      width: '100px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>フリガナ</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {formik.values.furigana}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>生年月日</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {formik.values.birthdate}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>住所</td>
              <td colSpan={2} style={{ border: '1px solid black', padding: '8px' }}>
                {formik.values.address}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>電話番号</td>
              <td colSpan={2} style={{ border: '1px solid black', padding: '8px' }}>
                {formik.values.phone}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>メール</td>
              <td colSpan={2} style={{ border: '1px solid black', padding: '8px' }}>
                {formik.values.email}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>学歴</td>
              <td
                colSpan={2}
                style={{ border: '1px solid black', padding: '8px', whiteSpace: 'pre-wrap' }}
              >
                {formik.values.education}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>職歴</td>
              <td
                colSpan={2}
                style={{ border: '1px solid black', padding: '8px', whiteSpace: 'pre-wrap' }}
              >
                {formik.values.experience}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>資格・免許</td>
              <td
                colSpan={2}
                style={{ border: '1px solid black', padding: '8px', whiteSpace: 'pre-wrap' }}
              >
                {formik.values.license}
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>志望動機</td>
              <td
                colSpan={2}
                style={{ border: '1px solid black', padding: '8px', whiteSpace: 'pre-wrap' }}
              >
                {formik.values.motivation}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
