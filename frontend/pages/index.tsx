// 主页
import "./index_style.css"
import Image from 'next/image'
import NavigationBar from "../components/NavigationBar"
import InformationBar from "../components/InformationBar"

// 题目集
function ProblemSet() {
  return (
    <div className="problem_set">
      <Image src="/figures/banner.jpg" alt="banner.jpg" width={180} height={120} />
        <p style={{color: "black"}}>题目集标题</p>
        <p style={{color: "black"}}>题目集描述</p>
    </div>
  )
}

// 题目集栏
function ProblemSetBar() {
  return (
    <div className="problem_set_bar">
      <p style={{color: "black"}}>进行中的题目集</p>
      <div style={{display: "flex", flexWrap: "wrap", margin: "-10px"}}>
        <ProblemSet />
        <ProblemSet />
        <ProblemSet />
      </div>
      <p style={{color: "black"}}>全部题目集</p>
      <div style={{display: "flex", flexWrap: "wrap", margin: "-10px"}}>
        <ProblemSet />
        <ProblemSet />
        <ProblemSet />
        <ProblemSet />
        <ProblemSet />
      </div>
    </div>
  )
}

// 页面通知栏
function NotificationBar() {
  return (
    <div className="notification_bar">
      <p style={{color: "black"}}>通知</p>
    </div>
  )
}



// 搜索栏
function SearchBar() {
  return (
    <div className="search_bar">
      <input type="text" placeholder="搜索"/>
    </div>
  )
}

function HomePage() {
  return(
    <div className="body">
      <NavigationBar />
      <div style={{display: "flex", flexDirection:"column", marginTop: "20px"}}>
        <SearchBar />
        <ProblemSetBar />
      </div>
      <div style={{display: "flex", flexDirection: "column", marginTop:"20px", marginRight: "20px"}}>
        <InformationBar />
        <NotificationBar />
      </div>
    </div>
  )
}

export default HomePage