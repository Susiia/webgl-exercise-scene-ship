/*
 * @Descripttion: 
 * @version: 
 * @Author: 刘译蓬
 * @Date: 2022-11-25 16:29:19
 * @LastEditors: 刘译蓬
 * @LastEditTime: 2022-11-29 11:34:45
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),basicSsl()],
  server: {
    host: true,
    port: 8080,
  }
})
