// 主页
import "./style.css"

// 题目集
function ProblemSet() {
  return (
    <div className="problem_set">

    </div>
  )
}

// 题目集栏
function ProblemSetBar() {
  return (
    <div className="problem_set_bar">
    </div>
  )
}

// 页面导航栏
function NavigationBar() {
  return (
    <div className="navigation_bar">
      <img src='../figures/logo.png' />
      <p>求是英</p>
    </div>
  )
}

// 页面通知栏
function NotificationBar() {
  return (
    <div className="notification_bar">

    </div>
  )
}

// 用户信息栏
function InformationBar() {
  return (

  )
}

// 搜索栏
function SearchBar() {
  return (

  )
}

function HomePage() {
  return(
    <div>
      <NavigationBar />
      <ProblemSetBar />
      <SearchBar />
      <ProblemSetBar />
      <InformationBar />
      <NotificationBar />
    </div>
  )
}

export default HomePage