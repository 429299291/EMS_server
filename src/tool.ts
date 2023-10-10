//获取随机数
export const mathRand = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
  }