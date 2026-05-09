const STORAGE_KEY = 'practiceRecord';

export function getPracticeRecords() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export function addPracticeRecord(record) {
  const records = getPracticeRecords();
  // 避免重复（同题目同来源只保留最新）
  const idx = records.findIndex(
    r => r.id === record.id && r.source === record.source
  );
  if (idx !== -1) records.splice(idx, 1);
  records.unshift({ ...record, time: new Date().toISOString() });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
} 