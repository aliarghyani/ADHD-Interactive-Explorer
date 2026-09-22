<script setup lang="ts">
import type { HomeNavigationItem } from '../../features/home/home-content'

const props = defineProps<{
  locale: 'en' | 'fa'
  direction: 'ltr' | 'rtl'
  productName: string
  navigationLabel: string
  comingSoonLabel: string
  liveLabel: string
  skipLabel: string
  switchHref: string
  switchLabel: string
  currentPath: string
  navigation: readonly HomeNavigationItem[]
}>()
const hydrated = ref(false)

onMounted(() => {
  hydrated.value = true
})

function isCurrent(item: HomeNavigationItem): boolean {
  if (!item.href) return false
  if (item.id === 'home') return item.href === props.currentPath
  return props.currentPath === item.href || props.currentPath.startsWith(`${item.href}/`)
}
</script>

<template>
  <div class="app-shell" :dir="direction" :data-locale="locale" :data-hydrated="hydrated">
    <a class="app-shell__skip-link" href="#main-content">{{ skipLabel }}</a>

    <header class="app-shell__header">
      <NuxtLink class="app-shell__brand" :to="`/${locale}`" :prefetch="false">
        <span class="app-shell__mark" aria-hidden="true">A</span>
        <span><BidiIsolation direction="ltr">ADHD</BidiIsolation> {{ productName }}</span>
      </NuxtLink>

      <div class="app-shell__utilities">
        <nav class="app-shell__nav" :aria-label="navigationLabel">
          <ul>
            <li v-for="item in navigation" :key="item.id">
              <NuxtLink
                v-if="item.available && item.href"
                class="app-shell__nav-link"
                :class="{ 'app-shell__nav-link--current': isCurrent(item) }"
                :to="item.href"
                :prefetch="false"
                :aria-current="isCurrent(item) ? 'page' : undefined"
              >
                {{ item.label }}
                <span v-if="item.id === 'behaviours' || item.id === 'context' || item.id === 'presentations'" class="app-shell__status app-shell__status--live">{{ liveLabel }}</span>
              </NuxtLink>
              <span v-else class="app-shell__nav-link app-shell__nav-link--disabled" aria-disabled="true">
                {{ item.label }}
                <span class="app-shell__status">{{ comingSoonLabel }}</span>
              </span>
            </li>
          </ul>
        </nav>

        <NuxtLink
          class="app-shell__locale-link"
          :to="switchHref"
          :prefetch="false"
          :hreflang="locale === 'en' ? 'fa' : 'en'"
          :aria-label="locale === 'en' ? 'FA' : 'EN'"
        >
          {{ switchLabel }}
        </NuxtLink>
      </div>
    </header>

    <div id="main-content" class="app-shell__main" tabindex="-1">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.app-shell__skip-link {
  position: fixed;
  z-index: 50;
  inset-block-start: var(--app-space-3);
  inset-inline-start: var(--app-space-3);
  padding: var(--app-space-2) var(--app-space-4);
  border-radius: var(--app-radius-sm);
  background: var(--app-text);
  color: white;
  transform: translateY(-180%);
}

.app-shell__skip-link:focus {
  transform: translateY(0);
}

.app-shell__header {
  display: flex;
  width: min(90rem, calc(100% - 2rem));
  align-items: center;
  justify-content: space-between;
  gap: var(--app-space-5);
  margin-inline: auto;
  padding-block: var(--app-space-4);
}

.app-shell__brand {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--app-space-3);
  color: var(--app-text);
  font-weight: 820;
  text-decoration: none;
}

.app-shell__mark {
  display: grid;
  width: 2rem;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid var(--app-accent);
  border-radius: 50%;
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
  font-family: var(--app-font-mono);
}

.app-shell__utilities,
.app-shell__nav ul {
  display: flex;
  align-items: center;
  gap: var(--app-space-2);
}

.app-shell__nav ul {
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-shell__nav-link,
.app-shell__locale-link {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  gap: var(--app-space-2);
  padding: 0.45rem 0.7rem;
  border-radius: var(--app-radius-sm);
  color: var(--app-text-secondary);
  font-size: 0.88rem;
  font-weight: 720;
  text-decoration: none;
}

.app-shell__nav-link:hover,
.app-shell__nav-link--current {
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
}

.app-shell__nav-link--disabled {
  color: var(--app-text-muted);
  cursor: not-allowed;
}

.app-shell__status {
  padding: 0.05rem 0.35rem;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 800;
  white-space: nowrap;
}

.app-shell__status--live {
  border-color: var(--app-accent);
  background: var(--app-accent-soft);
  color: var(--app-accent-strong);
}

.app-shell__locale-link {
  flex: 0 0 auto;
  border: 1px solid var(--app-border-strong);
  color: var(--app-accent-strong);
}

.app-shell__main {
  width: min(90rem, calc(100% - 2rem));
  margin-inline: auto;
  padding-block: var(--app-space-4) var(--app-space-7);
}

@media (max-width: 74rem) {
  .app-shell__header {
    align-items: flex-start;
  }

  .app-shell__utilities {
    align-items: flex-end;
    flex-direction: column-reverse;
  }
}

@media (max-width: 52rem) {
  .app-shell__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .app-shell__utilities {
    align-items: stretch;
    min-width: 0;
  }

  .app-shell__nav {
    width: 100%;
    min-width: 0;
    overflow-x: auto;
    padding-block-end: var(--app-space-2);
    scrollbar-width: thin;
  }

  .app-shell__nav ul {
    width: max-content;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

  .app-shell__locale-link {
    width: max-content;
  }
}
</style>
