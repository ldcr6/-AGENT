<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">编辑个人资料</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="name">昵称</label>
          <input type="text" id="name" v-model="editableName" />
        </div>
        <div class="form-group">
          <label for="signature">个性签名</label>
          <textarea id="signature" v-model="editableSignature" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" @click="$emit('close')">取消</button>
        <button class="save-btn" @click="saveProfile">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  name: String,
  signature: String,
});

const emit = defineEmits(['save', 'close']);

const editableName = ref(props.name);
const editableSignature = ref(props.signature);

const saveProfile = () => {
  emit('save', {
    name: editableName.value,
    signature: editableSignature.value,
  });
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  overflow: hidden;
}
.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #888;
}
.modal-body {
  padding: 24px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box; /* Important */
}
.form-group textarea {
  resize: vertical;
}
.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
.cancel-btn, .save-btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}
.cancel-btn {
  background: #f1f1f1;
  color: #555;
}
.cancel-btn:hover {
  background: #e0e0e0;
}
.save-btn {
  background: #6366f1;
  color: white;
}
.save-btn:hover {
  background: #4f46e5;
}
</style> 