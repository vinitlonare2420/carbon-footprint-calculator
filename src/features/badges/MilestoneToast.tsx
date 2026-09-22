import { useEffect } from 'react'
import { Badge } from './badges'

interface MilestoneToastProps {
  badge: Badge
  onClose: () => void
}

export function MilestoneToast({ badge, onClose }: MilestoneToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="milestone-toast" role="status" aria-live="polite">
      <div className="milestone-toast-icon" aria-hidden="true">
        {badge.icon}
      </div>
      <div className="milestone-toast-body">
        <h4>New Milestone Unlocked!</h4>
        <p><strong>{badge.title}</strong> — {badge.description}</p>
      </div>
      <button
        type="button"
        className="milestone-toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  )
}
