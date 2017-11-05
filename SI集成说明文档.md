SI项目集成过程说明

# 系统环境
* 统一使用Node V8.x.x
* 统一使用Yarn包管理工具
* 统一使用npm官方镜像：`npm config set registry "http://registry.npmjs.org/"`
* 统一使用TortoiseGit做源代码管理工具
* 统一使用webstorm作为项目开发IDE

# 分支系统
* master分支是项目发布分支，所有人不要动
* develop分支是测试和集成环境分支，所有人不要动，合并代码请找我
* 所有人开发要建立自己的项目分支，如b2b,tms.wms
* 所有人开发要建立自己的工作分支，如b2b_cj,b2b_zqh 

# 代码结构
## 静态资源
* 所有的静态资源都放在/src/asserts下
* 外层的都是全局的文件夹，自己系统的在系统目录下

## 图片使用
* scss中使用图片要以@/asserts/B2B/a.jpg引入
* html中使用图片要以/asserts/b2b/a.jpg

# 注释规范
* js中重要的以/**/做注释
* js中单行注释是//加一个空格做注释
* html中也以<!--注释-->注释，写清楚代码块

# 样式命名冲突
* 自己模块公用的，要覆盖ElementUI的样式放在/src/asserts/styles下，在main.js中引入
* 自己模块公用的，要覆盖ElementUI的样式，在最外层加项目组命名空间词缀提升优先级，如：.tms{里面写样式}
* 自己的模块的样式写在模块中，外面加scoped

# 命名冲突
* 只要怕冲突全加自己的命名空间

# 特别注意
## el组件的名称


## 组件实现tab


# 待完成
## Header组件


# 路由

## 首次路由

## 动态push路由


# 定期升级


# 全局使用的localStorage说明
* localStorage['userAuthor']：登录的用户信息都在这里
* localStorage['funcMenuList']：三级菜单的数据都在这里面
* localStorage['xxxxxxPermission']：各功能模块按钮和tab权限的存储地址（xxxxx是功能模块的名称）

# 系统功能实现
## 权限


# 其他
* 写全扩展文件名
* 代码review
* 所有人合并代码到develop都叫我




























