// 页面导航栏
import "../pages/index_style.css"
import Image from "next/image"
import {useRouter} from 'next/router';

function NavigationBar() {
  const router = useRouter();

  return (
    <div className="navigation_bar">
      <ul>
        <li>
          <Image src="/figures/logo.png" alt="logo" width={120} height={130} />
          <span>求是英</span>
        </li>
        <li>
          <div style={{height:"15px"}}>

          </div>
        </li>
        <li>
          <div className="link_button" onClick={() => {router.push('/')}}>
            <Image src="figures/icon/home.svg" alt="home.svg" width={35} height={35}/>
            <p style={{color: "black"}}>主页</p>
          </div>
        </li>
        <li>
          <div className="link_button" onClick={() => {router.push('/ranking')}}>
            <Image src="figures/icon/ranking.svg" alt="ranking.svg" width={35} height={35}/>
            <p style={{color: "black"}}>答题排行</p>
          </div>
        </li>
        <li>
          <div className="link_button" onClick={() => {router.push('/errors')}}>
            <Image src="figures/icon/wrong_problem_set.svg" alt="wrong_problem_set.svg" width={35} height={35}/>
            <p style={{color: "black"}}>错题集</p>
          </div>
        </li>
        <li>
          <div style={{height:"100px"}}>

          </div>
        </li>
        <li>
          <div className="link_button" >
            <Image src="figures/icon/help.svg" alt="help.svg" width={35} height={35}/>
            <p style={{color: "black"}}>帮助</p>
          </div>
        </li>
        <li>
          <div className="link_button">
            <Image src="figures/icon/log_out.svg" alt="log_out.svg" width={35} height={35}/>
            <p style={{color: "black"}}>登出</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar