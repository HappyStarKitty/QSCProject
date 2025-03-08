
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
3. 进行中的习题集和所有习题集没有区分
4. api不够规范

## 现有BUG

1. 页面跳转时布局有变化（未发现原因）

## TODO

1. 历史记录功能
6. 要求在无法连接到后端时显示加载中画面
3. 部分组件可以复用

## 更新历史

### v0.1 vercel部署测试

- 修复ts类型检查未通过问题

### v0.2 新功能测试

#### polish UI

- 对部分组件进行美化

#### add function

- 新增选择答题数量功能
- 新增单词集CET4、CET6、College3、College4
- 新增显示答题进度功能

#### fix error

- 修复答题只能答一道的bug
- 修复收藏图标无法重置bug

### v0.3 产品测试

#### add function

- 新增点击单词功能

#### fix error

- 修复答题数量不合法bug
- 修复大英三、大英四无法打开bug
- 修复主页点击登出无反应bug
- 修复答题报告点击登出显示弹窗bug
- 修复收藏集初始星星未点亮bug

### v0.4 产品测试2.0

#### fix error

- 修复收藏发送取消收藏bug
- 修复手快多选bug

### v0.5 产品测试3.0

#### add function

- 增加答题历史报告页面
- 增加同步答题数量功能
- 增加题库单词删除功能



