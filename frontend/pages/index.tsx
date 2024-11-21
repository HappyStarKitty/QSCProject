// 主页
import "./index_style.css";
import Image from 'next/image';
import NavigationBar from "../components/NavigationBar";
import InformationBar from "../components/InformationBar";
import config from "../config";
//import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import AnswerModal from "../components/AnswerModal";
import {ModalProvider, useModal} from "../components/ModalContext";

// 题目集有四种类型：所有、个人词库、收藏词库、错题词库
interface ProblemSet {
  title: string,
  description: string,
  set: string //"all" | "libraries" | "favorites" | "misses" 
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
  //const router = useRouter();
  const { openModal } = useModal();
  const openAnswerModal = () => {
    //isOpen = true;
    openModal(AnswerModal, {pool: problemSet.set});
  }

  return (
    <ModalProvider>
      <div className="problem_set" onClick={openAnswerModal}>
        <div style={{width: "100%", height:"50%"}}>

        </div>
        <div style={{width:"100%", height:"2px", backgroundColor:"black"}}>

        </div>
        <div>
          <p style={{fontSize:"14px", color:"black"}}>{problemSet.title}</p>
          <p style={{fontSize:"10px", color:"black"}}>{problemSet.description}</p>
        </div>
      </div>
    </ModalProvider>
  )
}


// 题目集栏
function TotalProblemSetBar() {
  //const router = useRouter();
  const [favorites, setFavorites] = useState<Word[] | ErrorResponse | null>(null);
  const [library, setLibrary] = useState<Word[] | ErrorResponse | null>(null);
  const [miss, setMiss] = useState<Word[] | ErrorResponse | null>(null);
  const [CET4, setCET4] = useState<Word[] | ErrorResponse | null>(null);
  const [CET6, setCET6] = useState<Word[] | ErrorResponse | null>(null);
  const [wordsCollege3, setWordsCollege3] = useState<Word[] | ErrorResponse | null>(null)
  const [wordsCollege4, setWordsCollege4] = useState<Word[] | ErrorResponse | null>(null);
  //const [wordID, setWordID] = useState(0);

  // 判断题目集是否进行
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [favoritesResponse, missResponse, libraryResponse, CET4Response, CET6Response, college3Response, college4Response] = await Promise.all([
          fetch(config.apiUrl + '/api/get_favorites', { method: "GET", credentials: "include" }),
          fetch(config.apiUrl + '/api/get_misses', { method: "GET", credentials: "include" }),
          fetch(config.apiUrl + '/api/get_libraries', { method: "GET", credentials: "include" }),
          fetch(config.apiUrl + '/api/get_CET4', { method: "GET", credentials: "include"}),
          fetch(config.apiUrl + '/api/get_CET6', { method: "GET", credentials: "include"}),
          fetch(config.apiUrl + '/api/get_college3', { method: "GET", credentials: "include"}),
          fetch(config.apiUrl + '/api/get_college4', { method: "GET", credentials: "include"})
        ]);
        
        const favoritesData = await favoritesResponse.json();
        const missData = await missResponse.json();
        const libraryData = await libraryResponse.json();
        const CET4Data = await CET4Response.json();
        const CET6Data = await CET6Response.json();
        const college3Data = await college3Response.json();
        const college4Data = await college4Response.json();
  
        setFavorites(favoritesData);
        setMiss(missData);
        setLibrary(libraryData);
        setCET4(CET4Data);
        setCET6(CET6Data);
        setWordsCollege3(college3Data);
        setWordsCollege4(college4Data);
      } catch (error) {
        console.error("Failed to fetch sets", error);
      }
    };
  
    fetchData();
  }, []);  // 只在组件挂载时执行一次
  

  return (
    <div className="problem_set_bar">
      <p style={{color: "black"}}>进行中的题目集</p>
      <div style={{display: "flex", flexWrap: "wrap", margin: "-10px", overflow:"auto", height:"160px"}}>
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
        { CET4 ? (
          Array.isArray(CET4) ? (
            <ProblemSetBar title="CET4" description="四级单词集" set="CET4" />
          ) : (<></>)
          ) : (<></>) 
        }{ CET6 ? (
          Array.isArray(CET6) ? (
            <ProblemSetBar title="CET6" description="六级单词集" set="CET6" />
          ) : (<></>)
          ) : (<></>) 
        }{ wordsCollege3 ? (
          Array.isArray(wordsCollege3) ? (
            <ProblemSetBar title="大英三" description="大英三单词集" set="words_college3" />
          ) : (<></>)
          ) : (<></>) 
        }{ wordsCollege4 ? (
          Array.isArray(wordsCollege4) ? (
            <ProblemSetBar title="大英四" description="大英四单词集" set="words_college4" />
          ) : (<></>)
          ) : (<></>) 
        }
      </div>

      <div style={{background:"black", height:"1px", marginTop:"20px"}}></div>

      <p style={{color: "black"}}>全部题目集</p>
      <div style={{display: "flex", flexWrap: "wrap", margin: "-10px", overflow:"auto"}}>
        <ProblemSetBar title="收藏集" description="收藏单词集" set="favorites"/>
        <ProblemSetBar title="错题集" description="错题单词集" set="misses"/>
        <ProblemSetBar title="自定义" description="自定义单词集" set="libraries"/>
        <ProblemSetBar title="CET4" description="四级单词集" set="CET4" />
        <ProblemSetBar title="CET6" description="六级单词集" set="CET6" />
        <ProblemSetBar title="大英三" description="大英三单词集" set="words_college3" />
        <ProblemSetBar title="大英四" description="大英四单词集" set="words_college4" />
      </div>
    </div>
  )
}

// 页面通知栏
function NotificationBar() {
  return (
    <div className="notification_bar">
      <div style={{display:"flex", justifyContent:"flex-start", gap:"10px", alignItems:"center", height:"20px"}}>
        <Image src="/figures/icon/bell.svg" alt="bell.svg" height={20} width={20} />
        <p style={{color: "black", width:"40px", height:"20px"}}>通知</p>
      </div>
    </div>
  )
}

// 搜索栏
function SearchBar() {
  return (
    <div className="search_bar">
      <input type="text" placeholder="搜索" style={{backgroundColor:"transparent", border:"none", outline:"none", width:"260px"}}/>
      <Image src="/figures/icon/search.svg" alt="search.svg" width={20} height={20} />
    </div>
  )
}

function HomePage() {
  //const {isOpen, openModal, closeModal} = useModal();

  return(
    <ModalProvider>
      <div className="body">
        <NavigationBar />
        <div style={{display:"flex", flexDirection:"column"}}>
          <div style={{display:"flex", padding:"20px", marginTop:"20px", alignItems:"center", marginRight:"20px"}}>
          <SearchBar />
          <InformationBar />
          </div>
          <div style={{display:"flex", gap:"40px",marginRight:"20px", marginTop:"10px"}}>
          <TotalProblemSetBar />
          <NotificationBar />
          </div>
        </div>
      </div>
    </ModalProvider>
  )
}

export default HomePage;