<template>
  <div>dynamic programming</div>
</template>
<script setup lang="ts">
/* 动态规划
1、背包问题：一个背包能装W千克，能装N个物品，现在有M个物品，第i个物品的重量是W[i],他的价值是V[i]，现在怎么装，让背包中物品的价值和最大？
一个简单的例子，例如 W = 3，N = 2
三个物品重量为 [1,2,3],三个物品的价值分别为[3,2,1]
那么现在装前两个物品重量为3，价值最大为5；
2、复杂的应该怎么解决？ */
// int[][] dp[N+1][W+1]
// dp[0][..] = 0
// dp[..][0] = 0

// for i in [1..N]:
//     for w in [1..W]:
//         dp[i][w] = max(
//             把物品 i 装进背包,
//             不把物品 i 装进背包
//         )
// return dp[N][W]

// const knapsack = (W: number, N: number, wt: number[], val: number[]): number => {
//   //   if (N != wt.length) return 0;
//   const dp: number[][] = [];
//   // int[][] dp = new int[N + 1][W + 1];
//   // 能装N个物品
//   for (let i = 1; i <= N; i++) {
//     // 能装重量为W
//     for (let w = 1; w <= W; w++) {
//       // wt[i-1]是第i-1个物品的重量
//       if (w - wt[i - 1] < 0) {
//         // 如果单个物品的重量就已经大于背包容纳的重量了，只能不装
//         dp[i][w] = dp[i - 1][w];
//       } else {
//         // dp[i - 1][w - wt[i - 1]]
//         dp[i][w] = Math.max(dp[i - 1][w - wt[i - 1]] + val[i - 1], dp[i - 1][w]);
//       }
//     }
//   }

//   return dp[N][W];
// };

// console.log(knapsack(3, 2, [1, 2, 3], [3, 2, 1]));

function knapsack(weights: number[], values: number[], w: number) {
  const n = weights.length - 1; // 获取盒子个数i  从盒子0开始
  const f: number[][] = [[]]; //定义f的矩阵
  for (let j = 0; j <= w; j++) {
    // 背包的重量j从0开始，一直到我们输入的w
    if (j < weights[0]) {
      // 背包的重量小于盒子0的重量，价值为0
      f[0][j] = 0;
    } else {
      f[0][j] = values[0]; // 否则容量为物品0的价值
    }
  }
  console.log('f1', f);
  // 上述for循环实现了方程式的前两条
  for (let j = 0; j <= w; j++) {
    // 当盒子数不是1个时
    for (let i = 1; i <= n; i++) {
      if (!f[i]) {
        // 创建新的一行
        f[i] = [];
      }
      if (j < weights[i]) {
        // 等于之前的最优值
        f[i][j] = f[i - 1][j];
      } else {
        f[i][j] = Math.max(f[i - 1][j], f[i - 1][j - weights[i]] + values[i]);
      }
    }
  }
  console.log('f2', f);
  //   return f[n][w];
}
const a = knapsack([2, 2, 6, 5, 4], [6, 3, 5, 4, 6], 10);
console.log(a);
</script>
