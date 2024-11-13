// 页面导航栏
import "../pages/index_style.css"
import Image from "next/image"
import {useRouter} from 'next/router';
import config from "../config"

function NavigationBar() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const response = await fetch(config.apiUrl + '/api/logout', {
        method: "POST",
        credentials: "include"
      })
      const res = response.json();
      console.log(res);
      router.push('/');
    } catch (error) {
      console.error("Failed to log out.", error);
    };
    
  }

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
          <div className="link_button" onClick={() => {router.push('/problem_set?set=misses')}}>
            <Image src="figures/icon/wrong_problem_set.svg" alt="wrong_problem_set.svg" width={35} height={35}/>
            <p style={{color: "black"}}>错题集</p>
          </div>
        </li>
        <li>
          <div style={{height:"100px"}}>

          </div>
        </li>
        <li>
          <div className="link_button" onClick={() => {router.push('https://www.figma.com/design/lGttqyByDwUU9Mq7s9XySg/%E7%AD%94%E9%A2%98%E7%BD%91%E9%A1%B5%EF%BC%88%E4%BA%A7%E5%93%81%E4%BD%9C%E4%B8%9A%EF%BC%89?node-id=96-108&node-type=frame&t=iO1vxyGelywb4KGt-0')}}>
            <Image src="figures/icon/help.svg" alt="help.svg" width={35} height={35}/>
            <p style={{color: "black"}}>帮助</p>
          </div>
        </li>
        <li>
          <div className="link_button" onClick={handleLogOut}>
            <Image src="figures/icon/log_out.svg" alt="log_out.svg" width={35} height={35}/>
            <p style={{color: "black"}}>登出</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default NavigationBar