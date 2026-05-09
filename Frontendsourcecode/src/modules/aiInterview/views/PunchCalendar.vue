<template>
  <div class="punch-calendar-card">
    <div class="calendar-header-row">
      <div class="calendar-date-select">
        <button class="month-btn" @click="prevMonth">‹</button>
        <select v-model="selectedYear" class="year-select">
          <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
        </select>
        <select v-model="selectedMonth" class="month-select">
          <option v-for="(m, idx) in monthOptions" :key="idx" :value="idx">{{ m }}</option>
        </select>
        <button class="month-btn" @click="nextMonth">›</button>
      </div>
      <h3 class="calendar-title">打卡日历</h3>
      <button
        v-if="selectedYear === currentYear && selectedMonth === currentMonth"
        class="punch-btn"
        @click="onPunchBtnClick"
        style="margin-left:1em;"
      >
        {{ punchedDaysLocal.includes(today) ? '取消打卡' : '打卡' }}
      </button>
    </div>
    <div class="calendar-grid">
      <div class="calendar-header" v-for="w in weekDays" :key="w">{{ w }}</div>
      <div
        v-for="(d, idx) in calendarDays"
        :key="idx"
        class="calendar-day"
        :class="{
          'is-today': d.isToday,
          'is-punched': d.isPunched,
          'is-other-month': !d.isCurrentMonth
        }"
        @click="onDayClick(d)"
        :style="{ cursor: d.isCurrentMonth && typeof d.day === 'number' && punchedDaysLocal.includes(d.day) ? 'pointer' : 'default' }"
      >
        {{ d.day || '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';

interface CalendarDay {
  day: number | string;
  isCurrentMonth: boolean;
  isPunched?: boolean;
  isToday?: boolean;
}

const props = defineProps({
  punchedDays: {
    type: Array,
    default: () => []
  }
});

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth(); // 0-based
const today = now.getDate();

const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
const monthOptions = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

const selectedYear = ref(currentYear);
const selectedMonth = ref(currentMonth);

function getStorageKey(year: number, month: number) {
  return `punchDays-${year}-${month + 1}`;
}

function getLocalPunchedDays(year: number, month: number): number[] {
  const data = localStorage.getItem(getStorageKey(year, month));
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}

const punchedDaysLocal = ref<number[]>(getLocalPunchedDays(selectedYear.value, selectedMonth.value).length ? getLocalPunchedDays(selectedYear.value, selectedMonth.value) : [...props.punchedDays as number[]]);

watch([selectedYear, selectedMonth], ([y, m]) => {
  punchedDaysLocal.value = getLocalPunchedDays(y, m).length ? getLocalPunchedDays(y, m) : [...props.punchedDays as number[]];
});

function handlePunch(day: number) {
  if (!punchedDaysLocal.value.includes(day)) {
    punchedDaysLocal.value.push(day);
    localStorage.setItem(getStorageKey(selectedYear.value, selectedMonth.value), JSON.stringify(punchedDaysLocal.value));
  }
}

function prevMonth() {
  if (selectedMonth.value === 0) {
    selectedMonth.value = 11;
    selectedYear.value--;
  } else {
    selectedMonth.value--;
  }
}
function nextMonth() {
  if (selectedMonth.value === 11) {
    selectedMonth.value = 0;
    selectedYear.value++;
  } else {
    selectedMonth.value++;
  }
}

function onDayClick(d: CalendarDay) {
  // 只允许点击已打卡的日期进行取消
  if (
    d.isCurrentMonth &&
    typeof d.day === 'number' &&
    punchedDaysLocal.value.includes(d.day)
  ) {
    if (window.confirm(`确定要取消${selectedYear.value}年${selectedMonth.value + 1}月${d.day}日的打卡吗？`)) {
      punchedDaysLocal.value = punchedDaysLocal.value.filter(day => day !== d.day);
      localStorage.setItem(getStorageKey(selectedYear.value, selectedMonth.value), JSON.stringify(punchedDaysLocal.value));
    }
  }
}

function onPunchBtnClick() {
  if (punchedDaysLocal.value.includes(today)) {
    // 取消打卡
    punchedDaysLocal.value = punchedDaysLocal.value.filter(d => d !== today);
    localStorage.setItem(getStorageKey(selectedYear.value, selectedMonth.value), JSON.stringify(punchedDaysLocal.value));
  } else {
    // 打卡
    punchedDaysLocal.value.push(today);
    localStorage.setItem(getStorageKey(selectedYear.value, selectedMonth.value), JSON.stringify(punchedDaysLocal.value));
    window.alert('今日已打卡');
  }
}

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

const calendarDays = computed<CalendarDay[]>(() => {
  const year = selectedYear.value;
  const month = selectedMonth.value;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeek = firstDay.getDay();
  const days: CalendarDay[] = [];
  for (let i = 0; i < startWeek; i++) {
    days.push({ day: '', isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      day: d,
      isCurrentMonth: true,
      isPunched: punchedDaysLocal.value.includes(d),
      isToday: year === currentYear && month === currentMonth && d === today
    });
  }
  while (days.length < 42) {
    days.push({ day: '', isCurrentMonth: false });
  }
  return days;
});

onMounted(() => {
  punchedDaysLocal.value = getLocalPunchedDays(selectedYear.value, selectedMonth.value).length ? getLocalPunchedDays(selectedYear.value, selectedMonth.value) : [...props.punchedDays as number[]];
});
</script>

<style scoped>
.punch-calendar-card {
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(99,102,241,0.06);
  padding: 1.5rem 1.2rem 1.2rem 1.2rem;
  margin-bottom: 1.5rem;
  max-width: 620px;
  width: 70%;
}
.calendar-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.calendar-date-select {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.month-btn {
  background: #e0e7ff;
  border: none;
  border-radius: 6px;
  font-size: 1.2em;
  padding: 0.2em 0.7em;
  color: #6366f1;
  cursor: pointer;
  transition: background 0.2s;
}
.month-btn:hover {
  background: #a5b4fc;
}
.year-select, .month-select {
  padding: 0.2em 0.7em;
  border-radius: 6px;
  border: 1px solid #e0e7ff;
  font-size: 1em;
  color: #6366f1;
  background: #fff;
}
.calendar-title {
  font-size: 1.15rem;
  color: #6366f1;
  font-weight: bold;
  margin-bottom: 0;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2em;
}
.calendar-header {
  color: #a5b4fc;
  font-weight: 600;
  text-align: center;
  padding: 0.2em 0;
}
.calendar-day {
  height: 2.1em;
  text-align: center;
  line-height: 2.1em;
  border-radius: 6px;
  font-size: 1.08em;
  color: #6366f1;
  background: #fff;
  border: 1px solid #e0e7ff;
  transition: background 0.2s, color 0.2s;
}
.calendar-day.is-other-month {
  background: #f3f4f6;
  color: #cbd5e1;
  border: none;
}
.calendar-day.is-punched {
  background: linear-gradient(90deg, #6366f1 0%, #a7f3d0 100%);
  color: #fff;
  font-weight: bold;
  border: 1.5px solid #6366f1;
}
.calendar-day.is-today {
  border: 2px solid #a21caf;
  box-shadow: 0 0 0 2px #f3e8ff;
}
.punch-btn {
  margin: 0;
  padding: 0.4em 1.2em;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.punch-btn:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}
</style> 