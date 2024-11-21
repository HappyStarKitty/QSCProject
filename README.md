# QSCProject

## 部署方式

```
git clone https://github.com/HappyStarKitty/QSCProject.git
cd frontend
npm install
npm run dev
```

## 开发进度
-  构建页面外观
-  设计页面行为
-  api测试
-  需求对接

## 问题反馈

1. 正在进行的题集和所有题集无法区分
需要一个返回题集的api(包括name,desc和set)
2. 产品未提供显示单词集的功能

## 现有BUG

1. 页面跳转时布局有变化（未发现原因）

## TODO

1. 历史记录功能
2. 剩余单词更新
4. 上传答题报告功能
5. 单词点击跳转功能
6. 要求在无法连接到后端时显示加载中画面

## 更新历史

### v0.1 vercel部署测试

- 修复ts类型检查未通过问题

### v0.2 新功能测试

#### polish UI

- 对部分组件进行美化

#### add function

- 增加选择答题数量功能
- 新增单词集CET4、CET6、College3、College4
- 新增显示答题进度功能

#### fix error
- 修复答题只能答一道的bug
- 修复收藏图标无法重置bug