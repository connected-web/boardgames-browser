<template>
  <div class="row c3 calendar-container">
    <input type="text" v-model.lazy.trim="date" :placeholder="dateToday" class="option" v-on:focus="showcalendarPicker" />
    <div :class="dateClass(dateToday)" v-on:click="selectDate(dateToday)">
      <label for="date-today">Today ({{ dayOfMonth(dateToday) }})</label>
    </div>
    <div :class="dateClass(dateYesterday)" v-on:click="selectDate(dateYesterday)">
      <label for="date-yesterday">Yesterday ({{ dayOfMonth(dateYesterday) }})</label>
    </div>
    <div :class="dateClass(dateTwoDaysAgo)" v-on:click="selectDate(dateTwoDaysAgo)">
      <label for="date-yesterday">{{ twoDaysAgo }} ({{ dayOfMonth(dateTwoDaysAgo) }})</label>
    </div>

    <div v-if="displaycalendarPicker" class="calendar-picker">
      <div class="buttons left">
        <div class="button close-picker" v-on:click="hidecalendarPicker">
          <Icon icon="angle-double-up" />
          <label>Close calendar picker</label>
        </div>
      </div>

      <div class="calendar options row c4">
        <div v-for="year in years" :key="`ym_${year.code}`" :class="yearClass(year.code)" v-on:click="selectYear(year.code)">
          <label :for="`date-${year.label}`">{{ year.label }}</label>
        </div>
      </div>

      <hr>

      <div class="calendar options row c4">
        <div v-for="month in months" :key="`km_${month.code}`" :class="monthClass(month.code)" v-on:click="selectMonth(month.code)">
          <label :for="`date-${month.label}`">{{ month.label }}</label>
        </div>
      </div>

      <hr>

      <div v-if="displaycalendarPicker" class="calendar options row c7">
        <div v-for="day in daysInMonth" :key="`dm_${day.code}`" :class="dayClass(day.code)" v-on:click="selectDay(day.code)">
          <label :for="`date-${day.label}`">{{ day.label }}</label>
        </div>
        <div v-for="day in hiddenDaysInMonth" :key="`dm_${day.code}`" class="option small day hidden-day">
          <label>{{ day.label }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

const months = [{
  label: 'Jan',
  code: '01'
}, {
  label: 'Feb',
  code: '02'
}, {
  label: 'Mar',
  code: '03'
}, {
  label: 'Apr',
  code: '04'
}, {
  label: 'May',
  code: '05'
}, {
  label: 'June',
  code: '06'
}, {
  label: 'July',
  code: '07'
}, {
  label: 'Aug',
  code: '08'
}, {
  label: 'Sept',
  code: '09'
}, {
  label: 'Oct',
  code: '10'
}, {
  label: 'Nov',
  code: '11'
}, {
  label: 'Dec',
  code: '12'
}]

const now = new Date()
const currentYear = dayjs(now).year()
const years = []
while (years.length < 4) {
  const code = (currentYear - years.length) + ''
  years.push({ label: code, code })
}

function dateToday() {
  const now = new Date()
  return dayjs(now).format('DD/MM/YYYY')
}

export default {
  props: {
    modelValue: {
      type: String,
      default: dateToday()
    }
  },
  emits: ['input'],
  data () {
    return {
      date: dateToday(),
      displaycalendarPicker: false,
      months,
      years
    }
  },
  mounted () {
    this.date = this.value
  },
  computed: {
    value() {
      return this.modelValue
    },
    dateToday,
    dateYesterday() {
      const yesterday = dayjs().add(-1, 'day')
      return dayjs(yesterday).format('DD/MM/YYYY')
    },
    dateTwoDaysAgo() {
      const pastDate = dayjs().add(-2, 'day')
      return dayjs(pastDate).format('DD/MM/YYYY')
    },
    twoDaysAgo() {
      const pastDate = dayjs().add(-2, 'day')
      return dayjs(pastDate).format('dddd')
    },
    daysInMonth() {
      const date = this.date || this.dateToday
      const [dd, mm, yyyy] = date.split('/')
      const count = dayjs([yyyy, mm, dd].join('-')).daysInMonth()
      const result = []
      while (result.length < count) {
        const n = result.length + 1
        const code = n < 10 ? '0' + n : '' + n
        result.push({ label: n, code })
      }
      return result
    },
    hiddenDaysInMonth() {
      const { daysInMonth } = this
      const result = []
      const count = (7 - (daysInMonth.length % 7)) % 7
      while (result.length < count) {
        const n = result.length + 1
        const code = n < 10 ? '0' + n : '' + n
        result.push({ label: n, code })
      }
      return result
    }
  },
  methods: {
    dayOfMonth(input) {
      const dateParts = input.split('/')
      const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
      return dayjs(dateObject).format('Do')
    },
    selectDate(value) {
      this.date = value
    },
    selectDay(value) {
      const date = this.date || this.dateToday
      const [dd, mm, yyyy] = date.split('/')
      this.date = [value, mm, yyyy].join('/')
    },
    selectMonth(value) {
      const date = this.date || this.dateToday
      const [dd, mm, yyyy] = date.split('/')
      this.date = [dd, value, yyyy].join('/')
    },
    selectYear(value) {
      const date = this.date || this.dateToday
      const [dd, mm, yyyy] = date.split('/')
      this.date = [dd, mm, value].join('/')
    },
    dateClass(value) {
      const selected = value === this.date
      const className = selected ? 'selected' : 'deselected'
      return ['option', className].join(' ')
    },
    dayClass(value) {
      const monthCode = (this.date || this.dateToday).split('/')[0]
      const selected = value === monthCode
      const className = selected ? 'selected' : 'deselected'
      return ['option small day', className].join(' ')
    },
    monthClass(value) {
      const monthCode = (this.date || this.dateToday).split('/')[1]
      const selected = value === monthCode
      const className = selected ? 'selected' : 'deselected'
      return ['option small', className].join(' ')
    },
    yearClass(value) {
      const yearCode = (this.date || this.dateToday).split('/')[2]
      const selected = value === yearCode
      const className = selected ? 'selected' : 'deselected'
      return ['option small', className].join(' ')
    },
    showcalendarPicker() {
      this.displaycalendarPicker = true
    },
    hidecalendarPicker() {
      this.displaycalendarPicker = false
    }
  },
  watch: {
    date (newVal, oldVal) {
      this.$emit('update:modelValue', newVal)
    }
  }
}
</script>

<style scoped>
div.row.calendar-container {
  position: relative;
  overflow: visible;
}
pre {
  color: white
}
input {
  padding: 0.5em;
  font-size: 1em;
}
.buttons {
  text-align: right;
}
.buttons.left {
  text-align: left;
}
.buttons.left > .button:first-of-type {
  margin-left: 0;
}
.default.info {
  color: #99A;
}
div.row {
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  overflow: hidden;
}
div.row > * {
  text-align: center;
  margin: 0.5em 0.5em 0 0;
  flex: 5 5;
}
div.row > input.option {
  font-weight: bold;
  color: #333;
  background: white;
}
.option {
  display: flex;
  place-content: center;
  place-items: center;
  background: #ddd;
  color: #333;
  border-radius: 0.2em;
  font-weight: bold;
  padding: 0.5em;
  text-align: center;
  transition: background 0.1s ease-out, border 0.1s ease-out;
  white-space: nowrap;
  min-width: 20%;
  max-width: 50%;
  overflow: hidden;
  cursor: pointer;
}
.option > * {
  cursor: pointer;
}
div.option:hover {
  background: rgb(187, 229, 255);
}
div.option.selected {
  background: lightskyblue;
}
label > .icon {
  width: inherit;
}
.calendar-picker {
  position: absolute;
  top: 36px;
  z-index: 40;
  border: 2px solid #aaa;
  padding: 0.5em 0 0.5em 0.5em;
  margin: 0;
  border-radius: 0 0.5em 0.5em 0.5em;
  background: white;
  font-size: 0.8em;
}
.close-picker, .close-picker:hover, .close-picker:active {
  border: none;
}
.option.day {
  min-width: 10%;
}
.hidden-day {
  visibility: hidden;
}
hr {
  margin: 0.4em 0.5em 0 0;
  border: 1px solid #ddd;
}
@media (max-width: 719px) {
  div.row {
    flex-wrap: wrap;
  }
  div.row > * {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    flex: 5 5;
  }
  .c4 > .option {
    min-width: 45%;
    max-width: 30%;
  }
  .c3 > .option {
    max-width: 30%;
  }
}
@media (max-width: 959px) {
  .c4 > .option {
    min-width: 40%;
    max-width: 50%;
  }
  .c3 > .option {
    max-width: 50%;
  }
}
</style>