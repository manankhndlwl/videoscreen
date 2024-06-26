import ErrorFallbackComponent from 'app/components/common/errorFallback'
import { useContext } from 'react'
import Sentry from 'buyer/sentry'
import { UXContext } from '../../../context/common/uxContext'

const SentryErrorBoundary = ({ children, location }) => {
  const { hapticsFeedback } = useContext(UXContext)

  return (
    <Sentry.ErrorBoundary
      fallback={({ error, componentStack, resetError }) => (
        <ErrorFallbackComponent
          error={error}
          componentStack={componentStack}
          resetError={() => {
            hapticsFeedback.impact('medium')
            resetError()
          }}
        />
      )}
      beforeCapture={(scope) => {
        hapticsFeedback.notif('error')
        scope.setTag('location', location)
        scope.setExtra('context', {
          location,
        })

        return
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}

export default SentryErrorBoundary
