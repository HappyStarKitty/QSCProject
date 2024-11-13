// 登陆页面
import "./login_style.css"
import {useState} from 'react';
import config from "../config";
import {useRouter} from "next/router";
import NavigationBar from "@/components/NavigationBar";

// 登陆弹框
function LoginModal ()
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("用户名和密码不能为空");
      console.log(error);
      return ;
    }

    setIsSubmitting(true);

    // console.log(JSON.stringify({"username": username, "password": password}));
    console.log(config.apiUrl + "/api/login");

    try {
      const response = await fetch(config.apiUrl + "/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;Charset=UTF-8',
        },
        body: JSON.stringify({"username": username, "password": password}),
        credentials: 'include'
      })
      
      const data = await response.json();
      console.log(data);

      // 自动跳转主页
      setTimeout(() => {router.push('/');}, 1000);

    } catch (error) {
      console.error("Failed to login.", error);
    }
  };

  return (
  <div className="form">
    <form onSubmit={handleSubmit}>
      <div style={{margin:"50px"}}>
        <label htmlFor="username">用户名：</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange}
          placeholder='请输入用户名' required></input>
      </div>
      <div style={{margin:"50px"}}>
        <label htmlFor="password">密码：</label>
        <input type="text" id="password" value={password} onChange={handlePasswordChange}
          placeholder="请输入密码" required></input>
      </div>
      <button style={{marginLeft:"260px"}} onClick={handleSubmit}>提交</button>
    </form>
  </div>)
  
}

function LoginPage() {
  return (
    <div className="body">
      <NavigationBar />
      <LoginModal />
    </div>
  )
}

export default LoginPage;