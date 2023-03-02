<template>
  <TimeLineBar :fill="posFill" />
  <div class="flex justify-between relative -top-4">
    <TimeLineDot v-for="(value, index) in steps" :key="index" :number="getValue(index + 1)" :checked="index < pos">
      {{ value }}
    </TimeLineDot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  pos: {
    type: Number,
    default: 1
  },
  steps: {
    type: Array,
    required: true
  },
  mode: {
    default: 'number',
    validator(value: string) {
      // The value must match one of these strings
      return ['number', 'alphabet', 'roman'].includes(value)
    }
  }
})

const getValue = (value: number): string => {
  switch(props.mode) {
    case 'alphabet':
      return int2alphabet(value)
    case 'roman':
      return int2roman(value)
    default:
      return String(value);
  }
}

const int2roman = (original: number): string => {
  if (original < 1 || original > 3999) {
    throw new Error('Error: Input integer limited to 1 through 3,999');
  }

  const numerals = [
    ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
    ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
    ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
    ['M', 'MM', 'MMM'], // 1000-3000
  ];

  // TODO: Could expand to support fractions, simply rounding for now
  const digits = Math.round(original).toString().split('');
  let position = (digits.length - 1);

  return digits.reduce((roman, digit) => {
    if (digit !== '0') {
      roman += numerals[position][parseInt(digit) - 1];
    }

    position -= 1;

    return roman;
  }, '');
}

function int2alphabet(num) {
  let columnLetter = "",
      t;

  while (num > 0) {
    t = (num - 1) % 26;
    columnLetter = String.fromCharCode(65 + t) + columnLetter;
    num = (num - t) / 26 | 0;
  }
  return columnLetter || undefined;
}

const posFill = computed(() => {
  if (props.pos <= 0) {
    return 0;
  } else if (props.pos >= props.steps.length) {
    return 100;
  } else {
    return ((props.pos - 1) / (props.steps.length - 1)) * 100
  }
})
</script>
