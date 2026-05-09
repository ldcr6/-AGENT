<template>
  <div class="loading-overlay">
    <!-- 初始提示界面 -->
    <div v-if="!isWarping && !showVideo" class="prompt-container">
      <h1 class="glow">你——</h1>
      <h2 class="subtitle glow">准 备 好 面 试 了 吗？</h2>
      <p class="en-subtitle glow-subtle">Are you ready for the interview?</p>
      <button @click="startWarp" class="start-button">
        继续 →
      </button>
    </div>

    <!-- 时空穿梭动画 -->
    <div v-if="isWarping && !showVideo" class="tunnel-container" :class="{ 'warp-active': isWarping }">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="star"
        :style="star.style"
      ></div>
    </div>

    <!-- 视频播放区 -->
    <div v-if="showVideo" class="video-fullscreen">
      <video
        ref="introVideo"
        :src="videoSrc"
        autoplay
        @ended="onVideoEnded"
        class="video-player"
        muted
        playsinline
      ></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingAnimation",
  data() {
    return {
      stars: [],
      numStars: 1600, // 增加星星数量以获得更密集的效果
      isWarping: false,
      showVideo: false,
      videoSrc: '/video/posui.mp4',
    };
  },
  mounted() {
    this.createStars();
  },
  methods: {
    createStars() {
      const newStars = [];
      for (let i = 0; i < this.numStars; i++) {
        newStars.push({
          style: this.getRandomStarStyle(),
        });
      }
      this.stars = newStars;
    },
    getRandomStarStyle() {
      const size = Math.random() * 2 + 1;
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;

      return {
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(${x}px, ${y}px)`,
        // 初始动画是暂停的
        animation: `fly 2.5s ease-in forwards`,
        animationDelay: `${Math.random() * 1}s`, // 延迟，创造层次感
      };
    },
    startWarp() {
      this.isWarping = true;
      setTimeout(() => {
        this.showVideo = true;
      }, ); // 动画结束后显示视频
    },
    onVideoEnded() {
      this.$emit('loading-finished');
    }
  },
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><circle cx="10" cy="10" r="1" fill="white"/><circle cx="50" cy="150" r="1" fill="white"/><circle cx="350" cy="50" r="1" fill="white"/><circle cx="200" cy="200" r="1" fill="white"/><circle cx="100" cy="300" r="1" fill="white"/><circle cx="300" cy="380" r="1" fill="white"/></svg>');
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* 提示界面样式 */
.prompt-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 20;
  text-align: center;
}

.glow {
  /* 更强烈的霓虹辉光效果 */
  text-shadow:
    0 0 42px rgb(102, 204, 255),
    0 0 82px rgb(102, 204, 255),
    0 0 92px rgb(102, 204, 255);
}
.glow-subtle {
  text-shadow: 0 0 8px rgba(102, 204, 255, 0.8);
}

.prompt-container h1 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: 500;
  color: #66ccff; /* 设置为按钮的亮蓝色 */
  letter-spacing: 0.1em; /* 增加一点字间距 */
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 0.2s forwards;
}

.prompt-container .subtitle {
  font-size: 3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 400;
  color: #cce7ff;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 0.5s forwards;
}

.en-subtitle {
  font-size: 1rem;
  color: #a3c9e8;
  font-weight: 300;
  margin-bottom: 3rem;
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 1.2s forwards;
}

.start-button {
  padding: 12px 28px;
  font-size: 1.1rem;
  color: #fff;
  background: linear-gradient(45deg, #33b5ff, #66ccff);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  box-shadow: 0 0 15px rgba(102, 204, 255, 0.5), 0 0 25px rgba(102, 204, 255, 0.3);
  opacity: 0;
  animation: fadeInUp 0.6s ease-out 1.5s forwards;
}

.start-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(102, 204, 255, 0.8), 0 0 40px rgba(102, 204, 255, 0.5);
}

/* 动画容器 */
.tunnel-container {
  position: absolute;
  width: 100%;
  height: 100%;
  perspective: 400px;
  transform-style: preserve-3d;
}

.tunnel-container.warp-active .star {
  /* 激活时播放动画 */
  animation-play-state: running;
}

.star {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  border-radius: 50%;
  will-change: transform;
  animation-play-state: paused; /* 默认暂停动画 */
}

/* 动画关键帧：从远到近，最终消失 */
@keyframes fly {
  from {
    transform: translateZ(-300px);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  to {
    transform: translateZ(500px);
    opacity: 0;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.video-fullscreen {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: #000;
  display: flex; align-items: center; justify-content: center;
  z-index: 10000;
}
.video-player {
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  background: #000;
}
</style>
