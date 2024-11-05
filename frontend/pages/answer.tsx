// 答题页
import Image from 'next/image'
import "./answer_style.css"
import InformationBar from "../components/InformationBar"
import LinkButton from '@/components/LinkButton'

// 答题栏
function AnswerBar() {
  return (
    <div className="answer_bar">
      <h3>abandon</h3>
      <p>Abandoning is actually easy, anyway.</p>
      <div className="choice">
        <p>adv.求是潮地,产研地</p>
      </div>
      <div className="choice">
        <p>n.求是潮</p>
      </div>
      <div className="choice">
        <p>adj.水产研发中心的</p>
      </div>
      <div className="choice">
        <p>v.放弃</p>
      </div>
    </div>
  )
}

// 左栏
function LeftBar() {
  return (
    <div>
      <p style={{textAlign:"center"}}>题目集名称</p>
      <Image src="/figures/logo.png" alt="logo.png" width={100} height={100} />
      <p style={{textAlign:"center"}}>还需学习</p>
      <h1 style={{textAlign:"center"}}>10</h1>
      <LinkButton imageUrl="/figures/icon/answer.svg" text="历史记录" />
      <LinkButton imageUrl="/figures/icon/log_out.svg" text="退出" />
    </div>
  )
}

// 报告栏
function ReportBar() {
  return(
    <div className="report_bar">
      <h1 style={{textAlign:"center"}}>学习报告</h1>
      <h4>你已经掌握了:</h4>
      <div className="words_list">
        <p className="word">abandon</p>
        <p className="word">abandon</p>
        <p className="word">abandon</p>
        <p className="word">abandon</p>
        <p className="word">abandon</p>
      </div>
      <h4>你还没完全掌握:</h4>
      <div className="words_list">
        <p className="word">abandon</p>
      </div>
      <p>记得多多复习，把知识掌握扎实</p>
    </div>
  )
}

// 历史记录栏
// TODO:点击 history icon 展开，同时其他部分颜色加深，点击其他地方收回
function HistoryBar() {
  return(
    <div className="left_bar">
      <p style={{color:"black"}}>历史记录</p>
      <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
        <p style={{color:"black"}}>application</p>
        <p style={{color:"black"}}>application</p>
        <p style={{color:"black"}}>application</p>
      </div>
    </div>
  )
}

// TODO:错题收藏功能

function AnswerPage() {
  return(
    <div style={{display:"flex"}}>
      <HistoryBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{marginTop:"20px"}}>
          <InformationBar />
        </div>
        <div style={{backgroundColor:"#e1e1e1", padding:"20px"}}>
          <ReportBar />
        </div>
      </div>
    </div>
  )
}

export default  AnswerPage