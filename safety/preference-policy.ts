/**
 * WP-05 persists nothing yet. Future storage adapters must use this explicit
 * allowlist; clinical, profile, exploration, and safety state are never valid.
 */
export const persistablePreferenceKeys = ['preferredLocale'] as const
export type PersistablePreferenceKey = (typeof persistablePreferenceKeys)[number]

export class PreferencePolicyError extends Error {
  override readonly name = 'PreferencePolicyError'
}

export function assertPersistablePreferenceKey(key: string): asserts key is PersistablePreferenceKey {
  if (!persistablePreferenceKeys.some((allowed) => allowed === key)) {
    throw new PreferencePolicyError(`Preference is not approved for persistence: ${key}`)
  }
}
