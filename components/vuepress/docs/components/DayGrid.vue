<template>
  <div class="day-grid">
    <div class="buttons">
      <button @click="monthView" :class="selectedOption(viewState, 'month')"><Icon icon="calendar" /><label>Month view</label></button>
      <button @click="weekView" :class="selectedOption(viewState, 'week')"><Icon icon="calendar-week" /><label>Week view</label></button>
      <button @click="dayView" :class="selectedOption(viewState, 'day')"><Icon icon="calendar-day" /><label>Date view</label></button>
    </div>

    <div v-if="viewState === 'day'" class="day-items">
      <div v-for="(dayItem, dayIndex) in days" :key="`day-${dayIndex}`" class="day-item">
        <Day :class="`val-${dayItem.count} ${dayItem.weekend ? 'weekend' : 'weekday'}`"
          :offset="Number.parseInt(dayIndex)"
          :date="dayItem.startDate"
          @selected="selectDay(dayItem)">{{ Number.isInteger(dayItem.count) ? dayItem.count : '-' }}</Day>
        <label class="day-of-week">{{ dayItem.date }}</label>
      </div>
    </div>

    <div v-if="viewState === 'week'" class="week-items">
      <div class="week-item headers">
        <label>#</label>
        <Day>M</Day>
        <Day>T</Day>
        <Day>W</Day>
        <Day>T</Day>
        <Day>F</Day>
        <Day class="weekend">S</Day>
        <Day class="weekend">S</Day>
      </div>
      <div v-for="(weekItem, weekIndex) in weeks" :key="`week-${weekIndex}`" class="week-item">
        <label>Week {{ weekIndex }}</label>
        <Day v-for="(dayItem, dayIndex) in weekItem.days" :key="`day-${dayIndex}`"
          :class="`val-${dayItem.count} ${dayItem.weekend ? 'weekend' : 'weekday'}`"
          :offset="Number.parseInt(dayIndex)"
          :date="dayItem.startDate"
          @selected="selectDay(dayItem)">{{ Number.isInteger(dayItem.count) ? dayItem.count : '-' }}</Day>
      </div>
    </div>

    <div v-if="viewState === 'month'" class="month-items">
      <div v-for="(monthItem, monthIndex) in months" :key="`month-${monthIndex}`" class="month-item">
        <label>{{ monthItem.label }}</label>
        <div class="week-items">
          <div class="week-item headers">
            <Day>M</Day>
            <Day>T</Day>
            <Day>W</Day>
            <Day>T</Day>
            <Day>F</Day>
            <Day class="weekend">S</Day>
            <Day class="weekend">S</Day>
          </div>
          <div v-for="(weekItem, weekIndex) in monthItem.weeks" :key="`week-${weekIndex}`" class="week-item">
            <Day v-for="(dayItem, dayIndex) in weekItem.days" :key="`day-${dayIndex}`"
              :class="`val-${dayItem.count} ${dayItem.weekend ? 'weekend' : 'weekday'}`"
              :offset="Number.parseInt(dayIndex)"
              :date="dayItem.startDate"
              @selected="selectDay(dayItem)">{{ Number.isInteger(dayItem.count) ? dayItem.count : '-' }}</Day>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

function weeksFor(days, sequenceStartDate) {
    const weeks = []
    let week
    days.forEach((day, offset) => {
      if (!week) {
        const startDate =  dayjs(sequenceStartDate).add(offset, 'days')
        week = { days: [], startDate }
        weeks.push(week)
      }
      week.days.push(day)
      if (day.dayOfWeek === 0) {
        while (week.days.length < 7) {
          week.days.unshift({})
        }
        week = null
      }
    })
    if (week) {
      while (week.days.length < 7) {
        week.days.push({})
      }
    }
    return weeks
}

export default {
  props: {
    items: {
      type: null,
      default: []
    },
    sequenceStartDate: {
      type: Date,
      default() {
        return new Date()
      }
    }
  },
  data() {
    return {
      viewState: 'month'
    }
  },
  computed: {
    days() {
      const { items, sequenceStartDate } = this
      return Object.values(items).map((count, offset) => {
        const date = dayjs(sequenceStartDate).add(offset, 'days')
        const dayOfWeek = date.day()
        return {
          dayOfWeek,
          weekend: dayOfWeek === 0 || dayOfWeek === 6,
          startDate: date,
          date: date.format('dddd, Do MMM, YYYY'),
          count
        }
      })
    },
    weeks() {
      const { days, sequenceStartDate } = this
      return weeksFor(days, sequenceStartDate)
    },
    months() {
      const { days, sequenceStartDate } = this
      const months = [] 
      let month
      days.forEach((day, offset) => {
        if (!month) {
          const startDate = dayjs(sequenceStartDate).add(months.length, 'months')
          month = { days: [], startDate, label: dayjs(startDate).format('MMM YYYY') }
          months.push(month)
        }
        month.days.push(day)
        if (!dayjs(day.startDate).isSame(month.startDate, 'month')) {
          month = null
        }
      })
      months.forEach(month => {
        month.weeks = weeksFor(month.days, sequenceStartDate)
      })
      return months
    }
  },
  methods: {
    monthView () {
      this.viewState = 'month'
    },
    weekView() {
      this.viewState = 'week'
    },
    dayView() {
      this.viewState = 'day'
    },
    selectedOption(a, b) {
      return JSON.stringify(a) === JSON.stringify(b) ? 'selected' : ''
    },
    selectDay(day) {
      this.$emit('selected', day)
    }
  }
}
</script>

<style>
.buttons {
  display: flex;
  flex-direction: horizontal;
  justify-content: center;
}

.day-items {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
}
.day-item {
  justify-self: center;
}
.day-item label {
  display: inline-block;
  width: 250px;
}

.week-items {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
}
.week-item {
  justify-self: center;
  display: grid;
  grid-template-columns: 2fr repeat(7, 1fr);
  grid-template-rows: auto;
}
.week-item label {
  background: #333;
  color: white;
  padding: 4px;
  font-weight: bold;
  font-size: 0.8em;
  margin: 2px;
  justify-content: flex-start;
  align-items: center;
}
.week-item.headers > div.day-box {
  background: #333;
  color: white;
  font-weight: bold;
}
.week-item.headers > div.day-box.weekend {
  background: #464;
}

.month-items {
  text-align: center;
}

.month-item {
  display: inline-grid;
  margin: 5px;
  border: 2px solid #ccc;
  font-size: 15px;
}
.month-item > label {
  display: block;
  text-align: center;
  background: #ccc;
  font-size: 0.8em;
  padding: 2px 0;
  font-weight: bold;
}
.month-item > .week-items {
  display: inline-grid;
}
.month-item > .week-items > .week-item {
  grid-template-columns: repeat(7, 1fr);
}
</style>