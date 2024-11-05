// 用户信息栏
import Image from 'next/image'
import "../pages/index_style.css"

function InformationBar() {
  return (
    <div className="information_bar">
      <Image className="avatar" src="/figures/avatar.jpg" alt="avatar" width={50} height={50}/>
      <div>
        <p style={{color: "black"}}>DakiMoon</p>
        <p style={{color: "black"}}>3230100025@zju.edu.cn</p>
      </div>
    </div>
  )
}

export default InformationBar