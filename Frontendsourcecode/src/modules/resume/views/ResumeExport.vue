<template>
	<div style="color: red">调试：导出组件已渲染</div>
	<div
		id="pdf-resume"
		style="
			width: 800px;
			margin: 0 auto;
			background: #fff;
			color: #222;
			font-family: 'Microsoft YaHei', Arial, sans-serif;
			padding: 40px 48px;
			border-radius: 12px;
			box-shadow: 0 2px 12px #aaa;
		"
	>
		<div
			style="
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 32px;
			"
		>
			<div style="display: flex; align-items: center">
				<img
					v-if="data.avatar"
					:src="data.avatar"
					style="
						width: 96px;
						height: 96px;
						border-radius: 50%;
						object-fit: cover;
						margin-right: 24px;
						border: 2px solid #6366f1;
					"
				/>
				<div>
					<h1 style="color: #6366f1; font-size: 2.2rem; margin: 0">
						{{ data.name || '未填写姓名' }} 的简历
					</h1>
					<div style="font-size: 1.1rem; color: #888; margin-top: 6px">
						{{ data.position || '' }}
					</div>
				</div>
			</div>
			<img src="/logo.png" style="height: 56px" />
		</div>
		<table style="width: 100%; font-size: 1.1rem; margin-bottom: 24px">
			<tr>
				<td style="font-weight: bold; width: 100px">性别</td>
				<td>{{ data.gender }}</td>
				<td style="font-weight: bold; width: 100px">出生日期</td>
				<td>{{ data.birthday }}</td>
			</tr>
			<tr>
				<td style="font-weight: bold">联系方式</td>
				<td>{{ data.contact }}</td>
				<td style="font-weight: bold">邮箱</td>
				<td>{{ data.email }}</td>
			</tr>
			<tr>
				<td style="font-weight: bold">地址</td>
				<td colspan="3">{{ data.address }}</td>
			</tr>
		</table>
		<div style="margin-bottom: 18px">
			<div style="font-weight: bold; color: #6366f1; margin-bottom: 6px">自我介绍</div>
			<div style="background: #f4f8ff; border-radius: 6px; padding: 10px 16px">
				{{ data.intro }}
			</div>
		</div>
		<div style="margin-bottom: 18px">
			<div style="font-weight: bold; color: #6366f1; margin-bottom: 6px">教育经历</div>
			<ul style="margin: 0; padding-left: 18px">
				<li v-for="(edu, idx) in data.education" :key="idx" style="margin-bottom: 8px">
					<span style="font-weight: bold">{{ edu.school }}</span
					>（{{ edu.major }}，{{ edu.degree }}，{{ edu.period }}）
					<div style="color: #666; font-size: 0.98rem">{{ edu.desc }}</div>
				</li>
			</ul>
		</div>
		<div style="margin-bottom: 18px">
			<div style="font-weight: bold; color: #6366f1; margin-bottom: 6px">工作经历</div>
			<ul style="margin: 0; padding-left: 18px">
				<li v-for="(work, idx) in data.work" :key="idx" style="margin-bottom: 8px">
					<span style="font-weight: bold">{{ work.company }}</span
					>（{{ work.position }}，{{ work.period }}）
					<div style="color: #666; font-size: 0.98rem">{{ work.desc }}</div>
					<div
						v-if="work.skills && work.skills.length"
						style="color: #888; font-size: 0.95rem"
					>
						技能：{{ work.skills.join('、') }}
					</div>
				</li>
			</ul>
		</div>
		<div style="margin-bottom: 18px">
			<div style="font-weight: bold; color: #6366f1; margin-bottom: 6px">技能特长</div>
			<div>
				<span
					v-for="(skill, idx) in data.skills"
					:key="idx"
					style="
						display: inline-block;
						background: #e0e7ff;
						color: #6366f1;
						border-radius: 4px;
						padding: 2px 10px;
						margin: 0 8px 6px 0;
					"
				>
					{{ skill.name }}
				</span>
			</div>
		</div>
		<div>
			<div style="font-weight: bold; color: #6366f1; margin-bottom: 6px">项目/作品集</div>
			<ul style="margin: 0; padding-left: 18px">
				<li v-for="(project, idx) in data.projects" :key="idx" style="margin-bottom: 8px">
					<span style="font-weight: bold">{{ project.name }}</span
					>：{{ project.desc }}
					<div v-if="project.link" style="color: #409eff; font-size: 0.98rem">
						链接：{{ project.link }}
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ data: any }>();
</script>
