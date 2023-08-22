# nodejs配置

- 查看nodejs版本：`node -v`
- 查看npm版本：`npm -v`
- 在终端中执行`npm config set registry "https://registry.npmmirror.com"`设置npm安装源为阿里的镜像地址
- 执行`npm config get registry`查看npm安装源
- 多用户修改全局安装和缓存配置（多用户才需要配置）
  - 修改npm全局安装位置：`npm config set prefix "全局安装路径"`
  - 修改npm全局缓存位置：`npm config set cache "全局缓存路径"`
  - 查看配置信息：`npm config ls`
  - 最后添加npm全局安装路径到PATH环境变量
