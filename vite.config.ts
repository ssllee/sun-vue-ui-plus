import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite' // 自动导入
import viteCompression from 'vite-plugin-compression' // 静态资源压缩
// import {visualizer} from 'rollup-plugin-visualizer' // 打包后的视图文件
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    define: {
      // 启用生产环境构建下激活不匹配的详细警告
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
    },
    plugins: [
      vue(),
      dts(),
      vueJsx(),
      viteCompression({
        verbose: true,
        disable: false, // 不禁用压缩
        deleteOriginFile: false, // 压缩后是否删除原文件
        threshold: 10240, // 压缩前最小文件大小
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 文件类型
      }),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: 'types/auto-imports.d.ts', // 生成文件位置
        eslintrc: {
          enabled: false, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json', // 生成json文件
          globalsPropValue: true
        }
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'packages/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        customDomId: '__svg__icons__dom__',
        svgoOptions: command === 'build'
      })
      // visualizer({
      //   open:true,  //注意这里要设置为true，否则无效
      //   gzipSize:true,
      //   brotliSize:true
      // })
    ],
    resolve: {
      // 配置别名
      alias: {
        // '@': resolve(__dirname, 'examples'),
        '@': resolve(__dirname, 'packages')
      },
      // 类型： string[] 导入时想要省略的扩展名列表。
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
    },
    build: {
      outDir: 'lib',
      // cssCodeSplit: true, // 强制内联CSS
      rollupOptions: {
        // 请确保外部化那些你的库中不需要的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      },
      lib: {
        // entry: resolve(__dirname, 'packages/index.ts'),
        entry: './packages/index.ts',
        name: 'sun-vue-ui-plus',
        // formats: ['es', 'cjs'],
        // formats: ['es', 'umd', 'cjs'],
        fileName: 'sun-vue-ui-plus'
      }
    }
  }
})
