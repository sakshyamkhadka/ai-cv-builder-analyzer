import {
  isMeaningfulText
} from './meaningfulText'

const testValues = [
  'abc',
  'cba',
  'abcedef',
  'asasa',
  'sasas',
  'asdfgh',
  'qwerty',
  'aaaaaa',
  'ababab',
  'TU',
  'BCA',
  'BSc',
  'MIT',
  'IT',
  'Computer Science',
  'Tribhuvan University',
  'Bachelor of Computer Application',
  'Software Engineering',
  'Pokhara University'
]

for (const value of testValues) {
  console.log(
    `${value} => ${
      isMeaningfulText(value)
        ? 'ACCEPT'
        : 'REJECT'
    }`
  )
}