import { useTranslation } from 'react-i18next'

export default function SecurityWarning ({ show, onClose }) {
  const { t } = useTranslation()

  if (!show) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <div className='bg-[#1e1e1e] border border-yellow-600/30 rounded-lg p-6 max-w-2xl mx-4 shadow-xl'>
        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0 text-yellow-500'>
            <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' />
              <path d='M12 9v4' />
              <path d='M12 17h.01' />
            </svg>
          </div>
          <div className='flex-1'>
            <h2 className='text-2xl font-bold text-yellow-400 mb-2'>
              {t('security.title')}
            </h2>
            <div className='text-gray-300 space-y-2 text-sm'>
              <p className=''>
                {t('security.intro')}
              </p>
              <ul className='list-disc list-inside space-y-1'>
                <li>{t('security.bulletUntrusted')}</li>
                <li>{t('security.bulletStorage')}</li>
                <li>{t('security.bulletUnderstand')}</li>
                <li>{t('security.bulletSensitive')}</li>
                <li>{t('security.bulletImports')}</li>
              </ul>
              <p className='text-yellow-400/90 mt-3'>
                {t('security.note')}
              </p>
            </div>
            <button
              onClick={onClose}
              className='mt-4 w-full bg-yellow-600/80 hover:bg-yellow-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors'
            >
              {t('security.ack')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
