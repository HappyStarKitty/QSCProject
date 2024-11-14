// 主页
import "./index_style.css";
import Image from 'next/image';
import NavigationBar from "../components/NavigationBar";
import InformationBar from "../components/InformationBar";
import config from "../config";
import {useRouter} from "next/router";
import {useState, useEffect} from "react";

// 题目集有四种类型：所有、个人词库、收藏词库、错题词库
interface ProblemSet {
  title: string,
  description: string,
  set: "all" | "libraries" | "favorites" | "misses" 
}

interface Word {
  id: number,
  word: string,
  meaning: string,
  detail: string
}

interface ErrorResponse {
  error?: string,
  message?: string
}

// 题目集
function ProblemSetBar(problemSet: ProblemSet) {
  const router = useRouter();
  const handleFavorites = () => {
    router.push('/answer?pool=favorites');
  }
  const handleMiss = () => {
    router.push('/answer?pool=misses');
  }
  const handleLibrary = () => {
    router.push('/answer?pool=libraries');
  }

  if (problemSet.set === "favorites") {
    return (
      <div className="problem_set" onClick={handleFavorites}>
        <div style={{width: "100%", height:"50%"}}>

        </div>
        <div style={{width:"100%", height:"2px", backgroundColor:"black"}}>

        </div>
        <div>
          <p style={{fontSize:"14px", color:"black"}}>{problemSet.title}</p>
          <p style={{fontSize:"10px", color:"black"}}>{problemSet.description}</p>
        </div>
      </div>
      )
    }
   
    else if (problemSet.set === "misses") {
      return (
        <div className="problem_set" onClick={handleMiss}>
          <div style={{width: "100%", height:"50%"}}>
  
          </div>
          <div style={{width:"100%", height:"2px", backgroundColor:"black"}}>
  
          </div>
          <div>
            <p style={{fontSize:"14px", color:"black"}}>{problemSet.title}</p>
            <p style={{fontSize:"10px", color:"black"}}>{problemSet.description}</p>
          </div>
        </div>
        )
      }

    else if (problemSet.set === "libraries") {
      return (
        <div className="problem_set" onClick={handleLibrary}>            
          <div style={{width: "100%", height:"50%"}}>
    
          </div>
          <div style={{width:"100%", height:"2px", backgroundColor:"black"}}>
    
          </div>
          <div>
            <p style={{fontSize:"14px", color:"black"}}>{problemSet.title}</p>
            <p style={{fontSize:"10px", color:"black"}}>{problemSet.description}</p>            </div>
          </div>
          )
        }
}

// 题目集栏
function TotalProblemSetBar() {
  //const router = useRouter();
  const [favorites, setFavorites] = useState<Word[] | ErrorResponse | null>(null);
  const [library, setLibrary] = useState<Word[] | ErrorResponse | null>(null);
  const [miss, setMiss] = useState<Word[] | ErrorResponse | null>(null);
  //const [wordID, setWordID] = useState(0);

  // 判断题目集是否进行
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [favoritesResponse, missResponse, libraryResponse] = await Promise.all([
          fetch(config.apiUrl + '/api/get_favorites', { method: "GET", credentials: "include" }),
          fetch(config.apiUrl + '/api/get_misses', { method: "GET", credentials: "include" }),
          fetch(config.apiUrl + '/api/get_libraries', { method: "GET", credentials: "include" })
        ]);
        
        const favoritesData = await favoritesResponse.json();
        const missData = await missResponse.json();
        const libraryData = await libraryResponse.json();
  
        setFavorites(favoritesData);
        setMiss(missData);
        setLibrary(libraryData);
      } catch (error) {
        console.error("Failed to fetch sets", error);
      }
    };
  
    fetchData();
  }, []);  // 只在组件挂载时执行一次
  

  return (
    <div className="problem_set_bar">
      <p style={{color: "black"}}>进行中的题目集</p>
      <div style={{display: "flex", flexWrap: "wrap", margin: "-10px", overflow:"auto", height:"180px"}}>
        { favorites ? (
          Array.isArray(favorites) ? (
            <ProblemSetBar title="收藏集" description="收藏单词集" set="favorites" />
          ) : (<></>)
          ) : (<></>) 
        }
        { miss ? (
          Array.isArray(miss) ? (
            <ProblemSetBar title="错题集" description="答错单词集" set="misses" />
          ) : (<></>)
          ) : (<></>) 
        }
        { library ? (
          Array.isArray(library) ? (
            <ProblemSetBar title="自定义" description="自定义单词集" set="libraries" />
          ) : (<></>)
          ) : (<></>) 
        }
      </div>
      <p style={{color: "black"}}>全部题目集</p>
      <div style={{display: "flex", flexWrap: "wrap", margin: "-10px", overflow:"auto"}}>
        <ProblemSetBar title="收藏集" description="收藏单词集" set="favorites"/>
        <ProblemSetBar title="错题集" description="错题单词集" set="misses"/>
        <ProblemSetBar title="自定义" description="自定义单词集" set="libraries"/>
      </div>
    </div>
  )
}

// 页面通知栏
function NotificationBar() {
  return (
    <div className="notification_bar">
      <div style={{display:"flex", justifyContent:"flex-start", gap:"10px"}}>
        <Image src="/figures/icon/bell.svg" alt="bell.svg" height={20} width={20} />
        <p style={{color: "black", width:"50px", height:"20px"}}>通知</p>
      </div>
    </div>
  )
}

// 搜索栏
function SearchBar() {
  return (
    <input type="text" className="search_bar" placeholder="搜索"/>
  )
}

function HomePage() {
  return(
    <div className="body">
      <NavigationBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{display:"flex", padding:"20px", marginTop:"20px", alignItems:"center", marginRight:"20px"}}>
          <SearchBar />
          <InformationBar />
        </div>
        <div style={{display:"flex", gap:"40px",marginRight:"20px", marginTop:"20px"}}>
         <TotalProblemSetBar />
         <NotificationBar />
        </div>
      </div>
    </div>
  )
}

export default HomePage