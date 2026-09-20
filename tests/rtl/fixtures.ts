export const mixedDirectionSamples = Object.freeze([
  { kind: 'canonical-term', text: 'این متن درباره ADHD است.', isolated: 'ADHD' },
  { kind: 'identifier', text: 'شناسه این مفهوم BEH1 است.', isolated: 'BEH1' },
  { kind: 'canonical-term', text: 'اصطلاح Executive Function در متن فارسی آمده است.', isolated: 'Executive Function' },
  { kind: 'doi', text: 'شناسه مقاله 10.1000/example است.', isolated: '10.1000/example' },
  { kind: 'url', text: 'نشانی منبع https://example.org/source است.', isolated: 'https://example.org/source' },
  { kind: 'natural-text', text: 'English UI with عنوان فارسی', isolated: 'عنوان فارسی' },
] as const)
