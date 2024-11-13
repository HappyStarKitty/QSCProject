// 错题集
import InformationBar from "../components/InformationBar";
import NavigationBar from "../components/NavigationBar";
import "./errors_style.css"
//import config from "../config"

// 错题复习检验
function Exercise() {
  return(
  <div className="exercise">
    <p>每日一练</p>
    <p>从错题中随机抽取5道题，检验复习效果</p>
  </div>
  )
}

// 单日错题集
function DailyErrors() {
  return(
    <div className="daily_erros">
      <p>2024年10月24日</p>
      <div style={{backgroundColor:"#e1e1e1", borderRadius:"20px", padding:"20px"}}>
        <p>新编大学英语</p>
        <div className="words_list">
          <p className="word">abandon</p>
          <p className="word">git</p>
          <p className="word">mkdocs</p>
          <p className="word">hexo</p>
          <p className="word">markdown</p>
          <p className="word">vscode</p>
        </div>
      </div>
    </div>
  )
}

// 总错题集
function TotalErrors() {
  return (
    <div className="total_errors">
      <DailyErrors />
      <DailyErrors />
      <DailyErrors />
    </div>
  )
}

function ErrorsPage() {
  return(
    <div className="body">
      <NavigationBar />
      <div>
        <div style={{display:"flex", flexDirection:"column", width:"1000px"}}>
          <div style={{display:"flex", marginTop:"20px"}}>
            <InformationBar />
          </div>
          <Exercise />
          <TotalErrors />
        </div>
      </div>
    </div>
  )
}

export default ErrorsPage