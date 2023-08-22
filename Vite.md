# vite创建vue项目

- 执行指令；`npm create vite@latest vue-basic`创建项目
  - 框架选`Vue`,语言选`TypeScript`
- 使用vscode单独打开项目目录
  - 执行`npm install`初始化项目（仅需要执行一次）
  - 执行`npm run dev`启动项目开发服务（每次启动开发都需要执行）
  - 执行`npm run build`打包项目（只有部署项目时需要）
- 需要的vscode插件
  - `Vue Language Features (Volar)`
  - `TypeScript Vue Plugin (Volar)`
  - 需要禁用vue2的插件`Vetur`
- 代码格式化
  - 安装vscode插件`Prettier - Code formatter`
  - 安装prettier代码格式化模块：`npm install --save-dev --save-exact prettier`
  - 统一vscode工作区和项目的格式化配置-参考[模板项目](/my-vue-app/)
