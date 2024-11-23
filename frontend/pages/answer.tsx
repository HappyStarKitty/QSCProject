// 答题页
import Image from 'next/image'
import "./answer_style.css"
import InformationBar from "../components/InformationBar"
import LinkButton from '@/components/LinkButton'
import config from "../config"
import React, {useState, useEffect, useContext, createContext} from "react";
import { useRouter } from 'next/router';
import { ModalProvider, useModal } from '@/components/ModalContext';
import AlertModal from "../components/AlertModal";
import NavigationBar from '@/components/NavigationBar'
//import {GetServerSideProps} from "next";

// 记录当前答题进度
const ProblemIndexContext = createContext<{ problemIndex: number; setProblemIndex: React.Dispatch<React.SetStateAction<number>>} | undefined>(undefined);

const ProblemIndexContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [problemIndex, setProblemIndex] = useState(0);

  return (
    <ProblemIndexContext.Provider value={{problemIndex, setProblemIndex}}>
      {children}
    </ProblemIndexContext.Provider>
  );
};

// 单词
interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  detail: string;
}

/*
interface OptionsResponse {
  options: string[];
}
*/

interface Question {
  word: WordResponse;
  correctAnswer: string;
  options: string[];
}

interface ReportProps {
  correct: Question[];
  wrong: Question[];
}

interface StarButtonProps {
  wordID: number;
  poolName: string;
  initial: boolean;
}

// 收藏功能
function StarButton ( props: StarButtonProps ) {
  const [isStarred, setIsStarred] = useState(props.initial);
  //console.log(isStarred);

  const handleStarClick = async () => {
    const newIsStarred = !isStarred;
    setIsStarred(!isStarred);
    console.log(isStarred);
    try {
      let response;
      if (newIsStarred) {
        response = await fetch(config.apiUrl + `/api/favorite`, {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({word_id: props.wordID})
        })
      } else {
        response = await fetch(config.apiUrl + `/api/unfavorite`, {
          method: "POST",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({word_id: props.wordID})
        })
      }

      const data = response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to favorite the word.", error);
    }
  }

  return (
    <div style={{display:"flex", flexDirection:"row-reverse", alignItems:"flex-end"}} onClick={handleStarClick}>
      <Image src={isStarred ? '/figures/icon/star_light.svg' : '/figures/icon/star_dark.svg'}
        alt="star.svg" width={40} height={40} style={{float:"right"}} />
    </div>
  )
}

// 答题栏
function AnswerBar() {
  const [questions, setQuestions] = useState<Question[]>([]); // 存放本次答题题目
  // const [correctCount, setCorrectCount] = useState(0); // 统计回答正确数量
  const [correctQuestions, setCorrectQuestions] = useState<Question[]>([]); // 存放回答正确题目
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]); // 存放回答错误题目
  const [showResult, setShowResult] = useState(false); // 控制答案显示状态
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // 记录选择选项
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // 记录答题进度
  const [loading, setLoading] = useState(true); // 显示题目加载中
  const [isClick, setIsClick] = useState(false); // 判断是否做出选择
  const [starKey, setStarKey] = useState(0); // 记录收藏题目ID
  const context = useContext(ProblemIndexContext); // 记录答题进度
  
  //const [wordId, setWordId] = useState<number | null>(null);
  //const [pool, setPool] = useState(null);

  if (!context) {
    throw new Error("Failed to use problem index context.")
  }
  const { setProblemIndex} = context;

  const router = useRouter();
  const { pool, number } = router.query;

  const optionsLabels = ["A", "B", "C", "D"];
  const words_total = Number(number); // 每日一练题目数量

  useEffect(() => {
    if (!pool) return;
    const fetchQuestion = async () => {
      //const { pull } = context.params;

      try {
        // 发送请求
        const [wordResponse, optionsResponse] = await Promise.all([
          fetch(config.apiUrl + `/api/get_word?pool=${pool}`, {
            method: "GET",
            credentials: "include"
          })
          .then((res) => res.json()),
          fetch(config.apiUrl + '/api/get_options', {
            method: "GET",
            credentials: "include"
          })
          .then((res) => res.json())
        ]);

        console.log("Success to fetch word and options.");

        const options = [...optionsResponse, wordResponse.meaning];
        const shuffledOptions = options.sort(() => Math.random() - 0.5); // 选项随机排序

        // 构造question
        const newQuestion: Question = {
          word: wordResponse,
          correctAnswer: wordResponse.meaning,
          options: shuffledOptions
        }

        setQuestions((prev) => [...prev, newQuestion]);
        setStarKey((prev) => prev + 1);
        //setWordId(newQuestion.word.id);
        //setCurrentQuestionIndex(questions.length - 1);
      } catch (error) {
        console.log("Failed to fetch question.", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [pool, isClick]);

  if (loading) {
    return (
      <p>少女祈祷中</p>
    )
  }

  // 选择选项后显示答案正误
  const handleOptionClick = (option: string) => {
    setShowResult(true);
    setSelectedOption(option);
    setIsClick(!isClick);
    console.log("show result");

    const judgeResponse = fetch(config.apiUrl + "/api/check_answer", {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({word_id: questions[currentQuestionIndex].word.id, user_answer: option,correct_answer: questions[currentQuestionIndex].word.meaning})
    });

    console.log(judgeResponse);

    if (option === questions[currentQuestionIndex].correctAnswer) {
      // setCorrectCount((prev) => prev + 1);
      setCorrectQuestions((prev) => [...prev, questions[currentQuestionIndex]]);
      console.log("Your answer is true");
    }

    else {
      setWrongQuestions((prev) => [...prev, questions[currentQuestionIndex]]);
      const res = fetch(config.apiUrl + "/api/miss", {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({word_id: questions[currentQuestionIndex].word.id})
      })
      .then((res) => res.json());
      console.log(res);
      console.log("Your answer is wrong.");

    }

    console.log(currentQuestionIndex);
    console.log("next question");

    setTimeout(() => {
      setSelectedOption(null);
      setShowResult(false);
      setCurrentQuestionIndex((prev) => (prev + 1));
      setProblemIndex((prev) => prev + 1);
    }, 2000);
  }

    // 完成所有题目后显示答案报告
    if (currentQuestionIndex >= words_total) {
      /*
      const reportResponse = fetch(config.apiUrl + "/api/save_report", {
        method  
      })
       */
      return <ReportBar correct={correctQuestions} wrong={wrongQuestions}/>
    }

    const currentQuestion: Question = questions[currentQuestionIndex!];

    return (
      <div className="answer_bar">
        <div style={{display:"flex", justifyContent:"flex-end", width:"700px", marginBottom:"-40px"}}>
          <StarButton wordID={questions[currentQuestionIndex].word.id} poolName={typeof pool === "string" ? pool : "all"} initial={pool === "favorites"} key={starKey}/>
        </div>
        <>
          <p style={{fontSize:"30px", fontWeight:"bold"}}>{currentQuestion.word.word}</p>
          <p style={{fontSize:"16px", fontWeight:"bold", marginTop:"-20px"}}>{currentQuestion.word.detail}</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleOptionClick(option)} style={{
                  flex: "display",
                  border: "1px solid black",
                  borderRadius: "10px",
                  boxShadow: "2px 2px 5px rgb(0,0,0,0.4)",
                  width: "700px",
                  marginBottom: "10px",
                  marginTop: "20px",
                  padding: "4px",
                  textAlign: "center",
                  backgroundColor:
                    showResult && option === currentQuestion.correctAnswer
                      ? '#8CEF84'
                      : showResult && option === selectedOption
                      ? '#F97070'
                      : 'white' 
                }} disabled={selectedOption !==null && selectedOption !== option}>
                  <p>{optionsLabels[index]}. {option}</p>
                </button>
              </li>
            ))}
          </ul> 
          </>
      </div>
    )
  }

// 左栏
function LeftBar() {
  const router = useRouter();
  const {openModal} = useModal();
  const {number} = router.query;
  const total = Number(number);
  const context = useContext(ProblemIndexContext);

  if (!context) {
    throw new Error("Failed to use problem index.");
  }

  const {problemIndex} = context;

  const openAlertModal = () => {
    openModal(AlertModal, {});
  }

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"220px"}}>
      <ul style={{justifyContent:"center"}}>
        <li>
          <p style={{textAlign:"center"}}>题目集名称</p>
        </li>
        <li>
          <Image src="/figures/logo.png" alt="logo.png" width={120} height={130} style={{marginLeft:"20px"}} />
        </li>
        <li style={{}}>
          <div style={{height:"1px", backgroundColor:"black", marginBottom:"-10px"}}></div>
          <p style={{textAlign:"center", fontSize:"20px", marginBottom:"-20px"}}>还需学习</p>
          <p style={{textAlign:"center", fontSize:"60px"}}>{total - problemIndex}</p>
          <div style={{height:"140px"}}>

          </div>
        </li>
        <li onClick={openAlertModal}>
          <LinkButton imageUrl='figures/icon/history.svg' text="历史记录"  />
        </li>
        <li onClick={() => {
          if (total - problemIndex <= 0) {
            router.push("/");
          }
          else {
            openAlertModal();
          }
        }}>
          <LinkButton imageUrl='figures/icon/log_out.svg' text="退出" />
        </li>
      </ul>
    </div>
  )
}

// 报告栏
function ReportBar({correct, wrong}: ReportProps) {
    return (
      <div className="report_bar">
        <h1 style={{textAlign:"center"}}>学习报告</h1>
        <p style={{fontSize:"20px"}}>你已经掌握了：</p>
        <ul className="words_list">
          {correct.map((correctQuestion) => (
            <li key={correctQuestion.word.word}>
              <p className="word">
                {correctQuestion.word.word}  
              </p> 
            </li>
          ))}
        </ul>

        <p style={{fontSize:"20px"}}>你还没完全掌握：</p>
        <div className="words_list">
          {wrong.map((wrongQuestion) => (
              <p className="word" key={wrongQuestion.word.word}>
                {wrongQuestion.word.word}
              </p>
          ))}
        </div>

        {!wrong.length ? (
          <p>你都掌握了！Good！</p>) : (
            <p>下次再努力吧！</p>
          )
        }
        <h3>记得多多复习，将知识掌握扎实！</h3>

      </div>
    )
}

/*
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
  */

function AnswerInnerPage() {
  const router = useRouter();
  const {number} = router.query;
  const num = Number(number);
  const context = useContext(ProblemIndexContext);

  if (!context) {
    throw new Error("Failed to use problem index context.");
  }
  const {problemIndex} = context;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("Problem index changed.");
    setCurrentIndex(problemIndex);
  }, [currentIndex, problemIndex])
  
  return(
    <ModalProvider>
      <ProblemIndexContextProvider>
        <div style={{display:"flex", position:"fixed"}} >
          <div >
          {
            (currentIndex >= (num - 1)) ? <NavigationBar /> : <LeftBar />
          }
          </div>
          <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{marginTop:"40px"}}>
              <InformationBar />
            </div>
            <div style={{backgroundColor:"#e1e1e1", padding:"20px", marginTop:"30px", height:"600px"}}>
              <AnswerBar />
            </div>
          </div>
        </div>
      </ProblemIndexContextProvider>
    </ModalProvider>
  )
}

function AnswerPage() {
  return (
    <ProblemIndexContextProvider>
      <AnswerInnerPage />
    </ProblemIndexContextProvider>
  )
}

export default  AnswerPage;