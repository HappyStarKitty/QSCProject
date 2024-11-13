// 用户信息栏
import Image from 'next/image'
import "../pages/index_style.css"
import { useEffect , useState} from 'react';
import config from "../config";
import {useRouter} from 'next/router';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  message?: string;
  username?: string;
  error?: string;
}
interface CheckLoginResponse {
  username?: string;
  email?: string;
  avatarUrl?: string;
  logged_in: boolean;
  login_days: number;
}

// 下拉菜单
function DropdownMenu () {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    router.push('/login');
  }

  return (
    <div className="dropdown_container">
      <Image src="/figures/icon/toggle.svg" alt="toggle.svg" onClick={toggleMenu} width={30} height={30} />

      {isOpen && (
        <div className="dropdown_menu">
          <button onClick={handleLogin}>登陆</button>
        </div>
      )}
    </div>
  )
}

function InformationBar () {
  const defaultAvatar = "/figures/avatar.jpg"; // 默认头像路径
  const [userInfo, setUserInfo] = useState<CheckLoginResponse | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(config.apiUrl + '/api/check_login', {
          method: 'GET',
          credentials: 'include',
        });
        const res: CheckLoginResponse = await response.json();
        setUserInfo(res);
        console.log("Success to fetch user information.")
        console.log(res);
      } catch (error) {
        console.error("Failed to fetch user information.", error)
      }
    }

    //console.log(config.apiUrl + "/api/check_login")
    fetchUserInfo();
  }, []);

  return (
    <div className="information_bar">
      <Image className="avatar" src={userInfo?.avatarUrl || defaultAvatar} alt="avatar" width={60} height={60}/>
      <div>
        <p style={{color: "black"}}>{userInfo?.username || "username"}</p>
        <p style={{color: "black"}}>{userInfo?.email || "email"}</p>
      </div>
      <DropdownMenu />
    </div>
  )
}

export default InformationBar